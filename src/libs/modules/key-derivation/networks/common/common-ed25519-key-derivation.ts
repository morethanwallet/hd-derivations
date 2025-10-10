import type {
  CommonEd25519DerivationTypeUnion,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/index.js";
import { convertBytesToHex } from "@/libs/utils/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic";
import { type Ed25519Curve } from "@/libs/modules/curves/curves";

class CommonEd25519KeyDerivation
  implements AbstractKeyDerivation<CommonEd25519DerivationTypeUnion>
{
  private mnemonic: Mnemonic;
  private ed25519Curve: Ed25519Curve;

  public constructor(mnemonic: Mnemonic, ed25519Curve: Ed25519Curve) {
    this.mnemonic = mnemonic;
    this.ed25519Curve = ed25519Curve;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<CommonEd25519DerivationTypeUnion>): CommonKeyPair {
    return this.getKeyPair(derivationPath);
  }

  public importByPrivateKey({
    privateKey,
  }: PrivateKey<CommonEd25519DerivationTypeUnion>): CommonKeyPair {
    const rawPrivateKey = Buffer.from(privateKey, "hex");
    const publicKey = this.getPublicKey(rawPrivateKey);

    return { privateKey, publicKey };
  }

  private getKeyPair(derivationPath: string): CommonKeyPair {
    const rawPrivateKey = this.ed25519Curve.derivePath(
      derivationPath,
      this.mnemonic.getHexSeed(),
    ).key;

    const publicKey = this.getPublicKey(rawPrivateKey);
    const privateKey = convertBytesToHex(rawPrivateKey);

    return { privateKey, publicKey };
  }

  private getPublicKey(privateKeyBuffer: Buffer): CommonKeyPair["publicKey"] {
    return convertBytesToHex(this.ed25519Curve.getPublicKeyBuffer(privateKeyBuffer, false));
  }
}

export { CommonEd25519KeyDerivation };
