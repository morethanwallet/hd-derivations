import bs58check from "bs58check";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { networks } from "bitcoinjs-lib";
import { Secp256k1Curve, type PrefixConfig } from "@/libs/modules/curves/curves.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/types.js";
import { KeyDerivationError } from "../../libs/exceptions/index.js";
import { convertBytesToHex } from "@/libs/utils/index.js";
import { getKeyPairFromBip32Interface } from "../../libs/helpers/get-key-pair-from-bip32-interface.helper.js";
import { ExceptionMessage } from "@/libs/enums/enums.js";
import { getSecp256k1NodeFromMnemonic } from "../../libs/helpers/get-secp256k1-node-from-mnemonic.helper.js";

class TransparentKeyDerivation implements AbstractKeyDerivation<"zecTransparent"> {
  public readonly prefixConfig: PrefixConfig;
  private readonly mnemonic: Mnemonic;
  private readonly secp256k1Curve: Secp256k1Curve;

  public constructor(
    mnemonic: Mnemonic,
    prefixConfig: PrefixConfig,
    secp256k1Curve: Secp256k1Curve,
  ) {
    this.mnemonic = mnemonic;
    this.prefixConfig = prefixConfig;
    this.secp256k1Curve = secp256k1Curve;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"zecTransparent">): CommonKeyPair {
    const node = getSecp256k1NodeFromMnemonic({
      derivationPath,
      mnemonic: this.mnemonic,
      secp256k1Curve: this.secp256k1Curve,
      prefixConfig: this.prefixConfig,
    });

    return getKeyPairFromBip32Interface(node, true);
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"zecTransparent">): CommonKeyPair {
    const privateKeyBytes = bs58check.decode(privateKey);
    const networkPrefixIndex = 0;
    const privateKeyStartIndex = 1;
    const publicKeyCompressedByteStartIndex = 33;
    const wifCompressedLength = 34;
    const wifCompressedByte = 0x01;

    if (privateKeyBytes[networkPrefixIndex] !== this.prefixConfig.wif) {
      throw new KeyDerivationError(ExceptionMessage.ZCASH_INVALID_WIF_PREFIX);
    }

    const prefixRemovedPrivateKeyBytes = privateKeyBytes.slice(
      privateKeyStartIndex,
      publicKeyCompressedByteStartIndex,
    );

    const isCompressed =
      privateKeyBytes.length === wifCompressedLength &&
      privateKeyBytes[publicKeyCompressedByteStartIndex] === wifCompressedByte;

    const keyPair = this.secp256k1Curve.getKeyPairFromPrivateKey(
      prefixRemovedPrivateKeyBytes,
      networks.bitcoin,
      isCompressed,
    );

    if (!keyPair.privateKey) {
      throw new KeyDerivationError(ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);
    }

    return {
      privateKey,
      publicKey: convertBytesToHex(keyPair.publicKey),
    };
  }
}

export { TransparentKeyDerivation };
