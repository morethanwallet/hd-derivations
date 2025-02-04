import { addHexPrefix, bufferToHex } from "ethereumjs-util";
import { checkAndRemoveEvmPublicKeyHexPrefix, toUint8Array } from "@/libs/helpers/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { type PrefixConfig, Bip32Keys } from "@/libs/modules/keys/index.js";
import { getKeyPairFromEc } from "@/libs/modules/key-derivation/libs/helpers/index.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/index.js";


class EvmKeyDerivation extends Bip32Keys implements AbstractKeyDerivation<"evmBase"> {
  public constructor(prefixConfig: PrefixConfig, mnemonic: Mnemonic) {
    super(prefixConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"evmBase">): CommonKeyPair {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"evmBase">): CommonKeyPair {
    const rawPrivateKey = toUint8Array(
      Buffer.from(checkAndRemoveEvmPublicKeyHexPrefix(privateKey), "hex"),
    );

    const { publicKey } = this.getKeyPair(rawPrivateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): CommonKeyPair {
    const { privateKey, publicKey } = getKeyPairFromEc({
      prefixConfig: this.prefixConfig,
      source: rawPrivateKey,
      isPrivateKeyWifFormatted: false,
    });

    return {
      privateKey: bufferToHex(Buffer.from(privateKey, "hex")),
      publicKey: addHexPrefix(publicKey),
    };
  }
}

export { EvmKeyDerivation };
