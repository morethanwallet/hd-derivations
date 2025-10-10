import base58 from "bs58";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/index.js";
import { ThirtyTwoBytePrivateKeyIndex } from "@/libs/enums";
import { type Mnemonic } from "@/libs/modules/mnemonic";
import { type Ed25519Curve } from "@/libs/modules/curves/curves";

class SolKeyDerivation implements AbstractKeyDerivation<"solBase"> {
  private mnemonic: Mnemonic;
  private ed25519Curve: Ed25519Curve;

  public constructor(mnemonic: Mnemonic, ed25519Curve: Ed25519Curve) {
    this.mnemonic = mnemonic;
    this.ed25519Curve = ed25519Curve;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"solBase">): CommonKeyPair {
    const rawPrivateKey = this.ed25519Curve.derivePath(
      derivationPath,
      this.mnemonic.getHexSeed(),
    ).key;

    const publicKeyBuffer = this.ed25519Curve.getPublicKeyBuffer(rawPrivateKey, false);
    const privateKey = base58.encode(Buffer.concat([rawPrivateKey, publicKeyBuffer]));
    const publicKey = this.getBase58PublicKey(publicKeyBuffer);

    return { privateKey, publicKey };
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"solBase">): CommonKeyPair {
    const concatenatedRawPKeys = Buffer.from(base58.decode(privateKey));

    const rawPrivateKey = concatenatedRawPKeys.subarray(
      ThirtyTwoBytePrivateKeyIndex.START,
      ThirtyTwoBytePrivateKeyIndex.END,
    );

    const publicKeyBuffer = this.ed25519Curve.getPublicKeyBuffer(rawPrivateKey, false);
    const publicKey = this.getBase58PublicKey(publicKeyBuffer);

    return { privateKey, publicKey };
  }

  private getBase58PublicKey(rawPublicKey: Buffer): CommonKeyPair["publicKey"] {
    return base58.encode(rawPublicKey);
  }
}

export { SolKeyDerivation };
