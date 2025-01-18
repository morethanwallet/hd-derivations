import { addHexPrefix, bufferToHex } from "ethereumjs-util";
import { checkAndRemoveEvmPublicKeyHexPrefix, toUint8Array } from "@/helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { Keys } from "@/keys/bip32/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { getKeyPairFromEc } from "@/keyDerivation/helpers/index.js";
import {
  type ImportByPrivateKeyParameters,
  type AbstractKeyDerivation,
  type CommonKeyPair,
  type DeriveFromMnemonicParameters,
} from "@/keyDerivation/types/index.js";

class EvmKeyDerivation extends Keys implements AbstractKeyDerivation<"evm"> {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"evm">): CommonKeyPair {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  public importByPrivateKey({ privateKey }: ImportByPrivateKeyParameters<"evm">): CommonKeyPair {
    const rawPrivateKey = toUint8Array(
      Buffer.from(checkAndRemoveEvmPublicKeyHexPrefix(privateKey), "hex")
    );

    const { publicKey } = this.getKeyPair(rawPrivateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): CommonKeyPair {
    const { privateKey, publicKey } = getKeyPairFromEc(this.keysConfig, rawPrivateKey);

    return {
      privateKey: bufferToHex(Buffer.from(privateKey, "hex")),
      publicKey: addHexPrefix(publicKey),
    };
  }
}

export { EvmKeyDerivation };
