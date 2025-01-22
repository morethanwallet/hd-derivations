import base58 from "bs58";
import { Keys } from "@/keys/ed25519/index.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
} from "@/keyDerivation/types/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import edHd from "ed25519-hd-key";

class SolanaKeyDerivation extends Keys implements AbstractKeyDerivation<"sol"> {
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
    const rawPrivateKeyStartIndex = 0;
    const rawPrivateKeyEndIndex = 32;
    const concatenatedRawPKeys = Buffer.from(base58.decode(privateKey));

    const rawPrivateKey = concatenatedRawPKeys.subarray(
      rawPrivateKeyStartIndex,
      rawPrivateKeyEndIndex
    );

    const rawPublicKey = this.getRawPublicKey(rawPrivateKey);
    const publicKey = this.getBase58PublicKey(rawPublicKey);

    return {
      privateKey,
      publicKey,
    };
  }

  private getKeyPair(derivationPath: string): CommonKeyPair {
    const rawPrivateKey = edHd.derivePath(derivationPath, this.getHexSeed()).key;
    const rawPublicKey = this.getRawPublicKey(rawPrivateKey);
    const privateKey = base58.encode(Buffer.concat([rawPrivateKey, rawPublicKey]));
    const publicKey = this.getBase58PublicKey(rawPublicKey);

    return { privateKey, publicKey };
  }

  private getRawPublicKey(rawPrivateKey: Buffer): Buffer {
    return edHd.getPublicKey(rawPrivateKey, false);
  }

  private getBase58PublicKey(rawPublicKey: Buffer): CommonKeyPair["publicKey"] {
    return base58.encode(rawPublicKey);
  }
}

export { SolanaKeyDerivation };
