import { getPublicKeyFromPrivateKey } from "@binance-chain/javascript-sdk/lib/crypto";
import { assert, toUint8Array } from "@/helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { Keys } from "@/keys/bip32/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/keyDerivation/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/types/keys/index.js";
import { convertEcBytesPrivateKeyToHexKeyPair } from "@/keyDerivation/helpers/index.js";
import { KeyDerivationError } from "@/keyDerivation/exceptions/index.js";
import { ExceptionMessage } from "@/keyDerivation/exceptions/index.js";

class BnbKeyDerivation extends Keys implements AbstractKeyDerivation<"bnb"> {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"bnb">): CommonKeyPair {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"bnb">): CommonKeyPair {
    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): CommonKeyPair {
    assert(rawPrivateKey, KeyDerivationError, ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);
    const { privateKey } = convertEcBytesPrivateKeyToHexKeyPair(rawPrivateKey, this.keysConfig);
    const publicKey = getPublicKeyFromPrivateKey(privateKey);

    return { privateKey, publicKey };
  }
}

export { BnbKeyDerivation };
