import { Keys } from "@/keys/ed25519/index.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
} from "@/keyDerivation/types/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import edHd from "ed25519-hd-key";
import { toHexFromBytes } from "@/helpers/index.js";

class TonKeyDerivation extends Keys implements AbstractKeyDerivation<"sol"> {
  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"sol">): CommonKeyPair {
    const { privateKey, publicKey } = this.getKeyPair(derivationPath);

    return {
      privateKey,
      publicKey,
    };
  }

  public importByPrivateKey({ privateKey }: ImportByPrivateKeyParameters<"sol">): CommonKeyPair {
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

export { TonKeyDerivation };
