import bs58check from "bs58check";
import { toHexFromBytes } from "@/helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type BIP32Interface } from "bip32";
import { ecPair } from "@/ecc/index.js";
import { networks } from "bitcoinjs-lib";
import { Keys } from "@/keys/bip32/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import {
  type AbstractKeyDerivation,
  type CommonKeyPair,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
} from "@/keyDerivation/types/index.js";
import { KeyDerivationError } from "@/keyDerivation/exceptions/index.js";
import { ExceptionMessage } from "@/keyDerivation/exceptions/index.js";
import { getKeyPairFromEc } from "@/keyDerivation/helpers/index.js";

class TransparentKeyDerivation extends Keys implements AbstractKeyDerivation<"transparent"> {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
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
  }: ImportByPrivateKeyParameters<"transparent">): CommonKeyPair {
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

      if (decoded[networkPrefixIndex] !== this.keysConfig.wif) {
        throw new KeyDerivationError(ExceptionMessage.ZCASH_INVALID_WIF_PREFIX);
      }

      const privateKey = decoded.slice(privateKeyStartIndex, isCompressedByteStartIndex);
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

    return getKeyPairFromEc(this.keysConfig, source);
  }
}

export { TransparentKeyDerivation };
