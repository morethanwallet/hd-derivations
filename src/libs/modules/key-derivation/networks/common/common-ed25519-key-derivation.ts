import { Ed25519Keys } from "@/libs/modules/keys/index.js";
import type {
  CommonEd25519DerivationTypeUnion,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/index.js";
import edHd from "ed25519-hd-key";
import { toHexFromBytes } from "@/libs/helpers/index.js";

class CommonEd25519KeyDerivation
  extends Ed25519Keys
  implements AbstractKeyDerivation<CommonEd25519DerivationTypeUnion>
{
  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<CommonEd25519DerivationTypeUnion>): CommonKeyPair {
    const { privateKey, publicKey } = this.getKeyPair(derivationPath);

    return {
      privateKey,
      publicKey,
    };
  }

  public importByPrivateKey({
    privateKey,
  }: PrivateKey<CommonEd25519DerivationTypeUnion>): CommonKeyPair {
    const rawPrivateKey = Buffer.from(privateKey, "hex");
    const publicKey = this.getPublicKey(rawPrivateKey);

    return { privateKey, publicKey };
  }

  private getKeyPair(derivationPath: string): CommonKeyPair {
    const rawPrivateKey = edHd.derivePath(derivationPath, this.getHexSeed()).key;
    const publicKey = this.getPublicKey(rawPrivateKey);
    const privateKey = toHexFromBytes(rawPrivateKey);

    return { privateKey, publicKey };
  }

  private getPublicKey(rawPrivateKey: Buffer): CommonKeyPair["publicKey"] {
    return toHexFromBytes(edHd.getPublicKey(rawPrivateKey, false));
  }
}

export { CommonEd25519KeyDerivation };
