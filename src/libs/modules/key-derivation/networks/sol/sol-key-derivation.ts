import base58 from "bs58";
import { Ed25519Keys } from "@/libs/modules/keys/index.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/index.js";
import { derivePath, getPublicKey } from "ed25519-hd-key";
import { ThirtyTwoBytePrivateKeyIndex } from "@/libs/enums";

class SolKeyDerivation extends Ed25519Keys implements AbstractKeyDerivation<"solBase"> {
  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"solBase">): CommonKeyPair {
    const rawPrivateKey = derivePath(derivationPath, this.mnemonic.getHexSeed()).key;
    const rawPublicKey = this.getRawPublicKey(rawPrivateKey);
    const privateKey = base58.encode(Buffer.concat([rawPrivateKey, rawPublicKey]));
    const publicKey = this.getBase58PublicKey(rawPublicKey);

    return { privateKey, publicKey };
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"solBase">): CommonKeyPair {
    const concatenatedRawPKeys = Buffer.from(base58.decode(privateKey));

    const rawPrivateKey = concatenatedRawPKeys.subarray(
      ThirtyTwoBytePrivateKeyIndex.START,
      ThirtyTwoBytePrivateKeyIndex.END,
    );

    const rawPublicKey = this.getRawPublicKey(rawPrivateKey);
    const publicKey = this.getBase58PublicKey(rawPublicKey);

    return { privateKey, publicKey };
  }

  private getRawPublicKey(rawPrivateKey: Buffer): Buffer {
    return getPublicKey(rawPrivateKey, false);
  }

  private getBase58PublicKey(rawPublicKey: Buffer): CommonKeyPair["publicKey"] {
    return base58.encode(rawPublicKey);
  }
}

export { SolKeyDerivation };
