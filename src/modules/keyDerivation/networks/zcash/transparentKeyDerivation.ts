import bs58check from "bs58check";
import { toHexFromBytes } from "@/libs/helpers/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { type BIP32Interface } from "bip32";
import { ecPair } from "@/libs/modules/ecc/index.js";
import { networks } from "bitcoinjs-lib";
import { type PrefixConfig, Bip32Keys } from "@/libs/modules/keys/index.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/modules/keyDerivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/index.js";
import { KeyDerivationError } from "@/libs/exceptions/index.js";
import { ExceptionMessage } from "@/modules/keyDerivation/libs/enums/index.js";
import { getKeyPairFromEc } from "@/modules/keyDerivation/libs/helpers/index.js";

class TransparentKeyDerivation
  extends Bip32Keys
  implements AbstractKeyDerivation<"transparent">
{
  public constructor(prefixConfig: PrefixConfig, mnemonic: Mnemonic) {
    super(prefixConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"transparent">): CommonKeyPair {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node);

    return {
      privateKey,
      publicKey,
    };
  }

  public importByPrivateKey({
    privateKey,
  }: PrivateKey<"transparent">): CommonKeyPair {
    const { publicKey } = this.getKeyPair(privateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  private getKeyPair(source: BIP32Interface | string): CommonKeyPair {
    if (typeof source === "string") {
      const decoded = bs58check.decode(source);
      const networkPrefixIndex = 0;
      const privateKeyStartIndex = 1;
      const isCompressedByteStartIndex = 33;
      const wifCompressedLength = 34;
      const wifCompressedByte = 0x01;

      if (decoded[networkPrefixIndex] !== this.prefixConfig.wif) {
        throw new KeyDerivationError(ExceptionMessage.ZCASH_INVALID_WIF_PREFIX);
      }

      const privateKey = decoded.slice(
        privateKeyStartIndex,
        isCompressedByteStartIndex,
      );
      const compressed =
        decoded.length === wifCompressedLength &&
        decoded[isCompressedByteStartIndex] === wifCompressedByte;

      const keyPair = ecPair.fromPrivateKey(privateKey, {
        compressed,
        network: networks.bitcoin,
      });

      return {
        privateKey: toHexFromBytes(keyPair.privateKey),
        publicKey: toHexFromBytes(keyPair.publicKey),
      };
    }

    return getKeyPairFromEc({ source, prefixConfig: this.prefixConfig });
  }
}

export { TransparentKeyDerivation };
