import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/types.js";
import { type Mnemonic } from "@/libs/modules/mnemonic";
import { type Ed25519Curve } from "@/libs/modules/curves/curves";
import { getBase58EncodedKeyPair, importByPrivateKey } from "./libs/helpers/helpers.js";

class SolBaseKeyDerivation implements AbstractKeyDerivation<"solBase"> {
  private mnemonic: Mnemonic;
  private ed25519Curve: Ed25519Curve;

  public constructor(mnemonic: Mnemonic, ed25519Curve: Ed25519Curve) {
    this.mnemonic = mnemonic;
    this.ed25519Curve = ed25519Curve;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"solBase">): CommonKeyPair {
    const seed = this.mnemonic.getHexSeed();
    const secretKeyBuffer = this.ed25519Curve.derivePath(derivationPath, seed).key;
    const publicKeyBuffer = this.ed25519Curve.getPublicKeyBuffer(secretKeyBuffer, false);

    return getBase58EncodedKeyPair(secretKeyBuffer, publicKeyBuffer);
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"solBase">): CommonKeyPair {
    return importByPrivateKey(privateKey, this.ed25519Curve);
  }
}

export { SolBaseKeyDerivation };
