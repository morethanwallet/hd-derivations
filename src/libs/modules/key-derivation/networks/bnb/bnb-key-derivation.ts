import {
  type DeriveFromMnemonicParameters,
  type AbstractKeyDerivation,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/index.js";
import { type PrefixConfig, Bip32Keys } from "@/libs/modules/keys/index.js";
import { type BIP32Interface } from "bip32";
import { getKeyPairFromEc } from "@/libs/modules/key-derivation/libs/helpers/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { getPublicKeyFromPrivateKey } from "@binance-chain/javascript-sdk/lib/crypto/index.js";
import { convertHexToBytes } from "@/libs/utils/index.js";

class BnbKeyDerivation extends Bip32Keys implements AbstractKeyDerivation<"bnbBase"> {
  constructor(prefixConfig: PrefixConfig, mnemonic: Mnemonic) {
    super(prefixConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"bnbBase">): CommonKeyPair {
    const node = this.rootKey.derivePath(derivationPath);

    return this.getKeyPair(node.privateKey);
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"bnbBase">): CommonKeyPair {
    const rawKey = convertHexToBytes(privateKey);
    const { publicKey } = this.getKeyPair(rawKey);

    return {
      privateKey,
      publicKey,
    };
  }

  public getKeyPair(source: BIP32Interface | Uint8Array | undefined): CommonKeyPair {
    const { privateKey } = getKeyPairFromEc({
      source,
      isPrivateKeyWifFormatted: false,
      prefixConfig: this.prefixConfig,
    });

    const publicKey = getPublicKeyFromPrivateKey(privateKey);

    return { privateKey, publicKey };
  }
}

export { BnbKeyDerivation };
