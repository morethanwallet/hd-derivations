import { toHexFromBytes, toUint8Array, toXOnlyPublicKey } from "@/libs/helpers/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { type BIP32Interface } from "bip32";
import { type PrefixConfig, Bip32Keys } from "@/libs/modules/keys/index.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/modules/keyDerivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/index.js";
import { getKeyPairFromEc } from "@/modules/keyDerivation/libs/helpers/index.js";

class TaprootKeyDerivation extends Bip32Keys implements AbstractKeyDerivation<"taproot"> {
  public constructor(prefixConfig: PrefixConfig, mnemonic: Mnemonic) {
    super(prefixConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
    base58RootKey,
  }: DeriveFromMnemonicParameters<"taproot">): CommonKeyPair {
    const rootKey = base58RootKey ? this.getRootKeyFromBase58(base58RootKey) : this.rootKey;
    const node = rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node);

    return {
      privateKey,
      publicKey,
    };
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"taproot">): CommonKeyPair {
    const { publicKey } = this.getKeyPair(privateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  private getKeyPair(source: BIP32Interface | string): CommonKeyPair {
    const keyPair = getKeyPairFromEc({ source, prefixConfig: this.prefixConfig });

    const publicKey = toHexFromBytes(
      toXOnlyPublicKey(toUint8Array(Buffer.from(keyPair.publicKey, "hex")))
    );

    return { privateKey: keyPair.privateKey, publicKey };
  }
}

export { TaprootKeyDerivation };
