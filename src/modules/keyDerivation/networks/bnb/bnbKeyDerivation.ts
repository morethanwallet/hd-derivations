import { getPublicKeyFromPrivateKey } from "@binance-chain/javascript-sdk/lib/crypto";
import { assert, toUint8Array } from "@/libs/helpers/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { type PrefixConfig, Bip32Keys } from "@/libs/modules/keys/index.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/modules/keyDerivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/index.js";
import { convertEcBytesPrivateKeyToHexKeyPair } from "@/modules/keyDerivation/libs/helpers/index.js";
import { KeyDerivationError } from "@/libs/exceptions/index.js";
import { ExceptionMessage } from "@/modules/keyDerivation/libs/enums/index.js";

class BnbKeyDerivation
  extends Bip32Keys
  implements AbstractKeyDerivation<"bnb">
{
  public constructor(prefixConfig: PrefixConfig, mnemonic: Mnemonic) {
    super(prefixConfig, mnemonic);
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
    assert(
      rawPrivateKey,
      KeyDerivationError,
      ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED,
    );
    const { privateKey } = convertEcBytesPrivateKeyToHexKeyPair(
      rawPrivateKey,
      this.prefixConfig,
    );
    const publicKey = getPublicKeyFromPrivateKey(privateKey);

    return { privateKey, publicKey };
  }
}

export { BnbKeyDerivation };
