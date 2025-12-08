import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/types.js";
import { type Mnemonic } from "@/libs/modules/mnemonic";
import { type Secp256k1Curve, type Ed25519Curve } from "@/libs/modules/curves/curves";
import { getEd25519KeyPairFromSecp256k1RootKey } from "../../libs/helpers/index.js";
import { convertBytesToHex } from "@/libs/utils/index.js";

class TonExodusKeyDerivation implements AbstractKeyDerivation<"tonExodus"> {
  private mnemonic: Mnemonic;
  private ed25519Curve: Ed25519Curve;
  private secp256k1Curve: Secp256k1Curve;

  public constructor(
    mnemonic: Mnemonic,
    ed25519Curve: Ed25519Curve,
    secp256k1Curve: Secp256k1Curve,
  ) {
    this.mnemonic = mnemonic;
    this.ed25519Curve = ed25519Curve;
    this.secp256k1Curve = secp256k1Curve;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"tonExodus">): CommonKeyPair {
    const { secretKey, publicKey } = getEd25519KeyPairFromSecp256k1RootKey({
      derivationPath,
      ed25519Curve: this.ed25519Curve,
      mnemonic: this.mnemonic,
      secp256k1Curve: this.secp256k1Curve,
    });

    return { privateKey: convertBytesToHex(secretKey), publicKey: convertBytesToHex(publicKey) };
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"tonExodus">): CommonKeyPair {
    const secretKeyBuffer = Buffer.from(privateKey, "hex");
    const publicKeyBuffer = this.ed25519Curve.getPublicKeyBuffer(secretKeyBuffer, false);

    return {
      privateKey: convertBytesToHex(secretKeyBuffer),
      publicKey: convertBytesToHex(publicKeyBuffer),
    };
  }
}

export { TonExodusKeyDerivation };
