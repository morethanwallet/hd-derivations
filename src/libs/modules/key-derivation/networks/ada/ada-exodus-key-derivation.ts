import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { GetDerivationTypeUnion, KeyPair } from "@/libs/types/types.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { type Secp256k1Curve } from "@/libs/modules/curves/curves.js";
import { KeyDerivationError } from "../../libs/exceptions/index.js";
import { Ed25519SecretKeyBytePosition, ExceptionMessage } from "../../libs/enums/index.js";
import { ExceptionMessage as AdaExceptionMessage } from "./libs/enums/enums.js";
import { createHmac, createHash } from "crypto";

const Ed25519ClampMask = {
  LOW: 0b11111000, // 248
  HIGH_CLEAR: 0b01111111, // 127
  HIGH_SET: 0b01000000, // 64
} as const;

const Ed25519SecretKeyByteIndex = {
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

  public constructor(mnemonic: Mnemonic, secp256k1Curve: Secp256k1Curve) {
    this.mnemonic = mnemonic;
    this.secp256k1Curve = secp256k1Curve;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<GetDerivationTypeUnion<"adaExodus">>): KeyPair<
    GetDerivationTypeUnion<"adaExodus">
  > {
    const seed = this.mnemonic.getSeed();
    const node = this.secp256k1Curve.deriveNodeFromSeed(seed, derivationPath);

    if (!node.privateKey) {
      throw new KeyDerivationError(ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);
    }

    const secretKey = this.deriveByronSecretKey(node.privateKey);
    const rawPrivateKey = PrivateKey.from_normal_bytes(Buffer.from(secretKey));
    const rawPublicKey = rawPrivateKey.to_public();

    return {
      privateKey: rawPrivateKey.to_hex(),
      publicKey: rawPublicKey.to_hex(),
    };
  }

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<GetDerivationTypeUnion<"adaExodus">>):
    | KeyPair<GetDerivationTypeUnion<"adaExodus">>
    | never {
    const rawPublicKey = PrivateKey.from_hex(privateKey).to_public();

    return {
      privateKey,
      publicKey: rawPublicKey.to_hex(),
    };
  }

  private clampEd25519SecretKey(secretKeyBuffer: Buffer): Buffer {
    const clampedSecretKey = Buffer.from(secretKeyBuffer);
    clampedSecretKey[Ed25519SecretKeyByteIndex.FIRST]! &= Ed25519ClampMask.LOW;
    clampedSecretKey[Ed25519SecretKeyByteIndex.LAST]! &= Ed25519ClampMask.HIGH_CLEAR;
    clampedSecretKey[Ed25519SecretKeyByteIndex.LAST]! |= Ed25519ClampMask.HIGH_SET;

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
  private deriveByronSecretKey(bip32Seed: Uint8Array): Buffer {
    const hmacKey = Buffer.from(bip32Seed);
    let counter = 1;

    while (true) {
      const message = Buffer.from(`${BYRON_HMAC_MESSAGE_PREFIX}${counter}`, "utf8");
      const I = createHmac(SHA512_ALGORITHM, hmacKey).update(message).digest();

      if (I.length !== HMAC512_LENGTH) {
        throw new KeyDerivationError(AdaExceptionMessage.FAILED_TO_CREATE_HMAC512_HASH);
      }

      const secretKey = I.subarray(
        Ed25519SecretKeyBytePosition.START,
        Ed25519SecretKeyBytePosition.END,
      );

      const hashed = createHash(SHA512_ALGORITHM)
        .update(secretKey)
        .digest()
        .subarray(Ed25519SecretKeyBytePosition.START, Ed25519SecretKeyBytePosition.END);

      const candidate = this.clampEd25519SecretKey(hashed);
      const lastByte = candidate.at(Ed25519SecretKeyByteIndex.LAST);

      if (lastByte && (lastByte & INVALID_SCALAR_BIT_MASK) === 0) {
        return Buffer.from(secretKey);
      }

      counter += 1;
    }
  }
}

export { AdaExodusKeyDerivation };
