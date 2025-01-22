import { Keys } from "@/keys/ed25519/index.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/keyDerivation/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/types/keys/index.js";
import edHd from "ed25519-hd-key";
import { toHexFromBytes } from "@/helpers/index.js";

class TonKeyDerivation extends Keys implements AbstractKeyDerivation<"tonBase"> {
  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"tonBase">): CommonKeyPair {
    const { privateKey, publicKey } = this.getKeyPair(derivationPath);

    return {
      privateKey,
      publicKey,
    };
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"tonBase">): CommonKeyPair {
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
