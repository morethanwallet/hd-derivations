import { createHmac, createHash } from "crypto";

import { KeyDerivationError } from "../../libs/exceptions/exceptions.js";
import { ExceptionMessage as AdaExceptionMessage } from "./libs/enums/enums.js";
import { getSecp256k1NodeFromMnemonic } from "../../libs/helpers/index.js";

import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { GetDerivationTypeUnion, KeyPair } from "@/libs/types/types.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { type Ed25519Curve, type Secp256k1Curve } from "@/libs/modules/curves/curves.js";
import { Ed25519PrivateKeyBytePosition } from "@/libs/modules/curves/curves.js";
import { convertBytesToHex } from "@/libs/utils/convert-bytes-to-hex.util.js";
import { convertHexToBytes } from "@/libs/utils/utils.js";

const Ed25519ClampMask = {
  LOW: 0b11111000, // 248
  HIGH_CLEAR: 0b01111111, // 127
  HIGH_SET: 0b01000000, // 64
} as const;

const Ed25519PrivateKeyByteIndex = {
  FIRST: 0,
  LAST: 31,
} as const;

const SHA512_ALGORITHM = "sha512";
const BYRON_HMAC_MESSAGE_PREFIX = "Root Seed Chain ";
const HMAC512_LENGTH = 64;
const INVALID_SCALAR_BIT_MASK = 0b00100000;

class AdaExodusKeyDerivation implements AbstractKeyDerivation<GetDerivationTypeUnion<"adaExodus">> {
  private readonly mnemonic: Mnemonic;
  private readonly secp256k1Curve: Secp256k1Curve;
  private readonly ed25519Curve: Ed25519Curve;

  public constructor(
    mnemonic: Mnemonic,
    secp256k1Curve: Secp256k1Curve,
    ed25519Curve: Ed25519Curve,
  ) {
    this.mnemonic = mnemonic;
    this.secp256k1Curve = secp256k1Curve;
    this.ed25519Curve = ed25519Curve;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<GetDerivationTypeUnion<"adaExodus">>): KeyPair<
    GetDerivationTypeUnion<"adaExodus">
  > {
    const node = getSecp256k1NodeFromMnemonic({
      derivationPath,
      mnemonic: this.mnemonic,
      secp256k1Curve: this.secp256k1Curve,
    });

    const privateKeyBuffer = this.deriveByronPrivateKey(node.privateKey);
    const privateKey = convertBytesToHex(privateKeyBuffer);
    const publicKey = this.getPublicKeyFromPrivateKeyBuffer(privateKeyBuffer);

    return { privateKey, publicKey };
  }

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<GetDerivationTypeUnion<"adaExodus">>): KeyPair<
    GetDerivationTypeUnion<"adaExodus">
  > {
    const privateKeyBuffer = Buffer.from(convertHexToBytes(privateKey));
    const publicKey = this.getPublicKeyFromPrivateKeyBuffer(privateKeyBuffer);

    return { privateKey, publicKey };
  }

  private clampEd25519PrivateKey(privateKeyBuffer: Buffer): Buffer {
    const clampedSecretKey = Buffer.from(privateKeyBuffer);
    clampedSecretKey[Ed25519PrivateKeyByteIndex.FIRST]! &= Ed25519ClampMask.LOW;
    clampedSecretKey[Ed25519PrivateKeyByteIndex.LAST]! &= Ed25519ClampMask.HIGH_CLEAR;
    clampedSecretKey[Ed25519PrivateKeyByteIndex.LAST]! |= Ed25519ClampMask.HIGH_SET;

    return clampedSecretKey;
  }

  /**
   * Byron legacy master seed (CIP-3 behavior).
   * HMAC-SHA512:
   *   key = 32-byte secp child
   *   msg = "Root Seed Chain " + counter (counter starts at 1)
   * Split: I = iL || iR
   * Validity check: clamp(SHA512(iL)[0..31]) and ensure bit 5 of last byte is 0.
   * If invalid → increment counter and retry.
   */
  private deriveByronPrivateKey(bip32Seed: Uint8Array): Buffer {
    const hmacKey = Buffer.from(bip32Seed);
    let counter = 1;

    while (true) {
      const message = Buffer.from(`${BYRON_HMAC_MESSAGE_PREFIX}${counter}`, "utf8");
      const I = createHmac(SHA512_ALGORITHM, hmacKey).update(message).digest();

      if (I.length !== HMAC512_LENGTH) {
        throw new KeyDerivationError(AdaExceptionMessage.FAILED_TO_CREATE_HMAC512_HASH);
      }

      const secretKey = I.subarray(
        Ed25519PrivateKeyBytePosition.START,
        Ed25519PrivateKeyBytePosition.END,
      );

      const hashed = createHash(SHA512_ALGORITHM)
        .update(secretKey)
        .digest()
        .subarray(Ed25519PrivateKeyBytePosition.START, Ed25519PrivateKeyBytePosition.END);

      const candidate = this.clampEd25519PrivateKey(hashed);
      const lastByte = candidate.at(Ed25519PrivateKeyByteIndex.LAST);

      if (lastByte && (lastByte & INVALID_SCALAR_BIT_MASK) === 0) {
        return Buffer.from(secretKey);
      }

      counter += 1;
    }
  }

  private getPublicKeyFromPrivateKeyBuffer(privateKeyBuffer: Buffer): string {
    const publicKeyBuffer = this.ed25519Curve.getPublicKeyBuffer(privateKeyBuffer, false);

    return convertBytesToHex(publicKeyBuffer);
  }
}

export { AdaExodusKeyDerivation };
