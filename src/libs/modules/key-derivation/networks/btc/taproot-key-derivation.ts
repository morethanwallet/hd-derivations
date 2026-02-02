import { toXOnlyPublicKey } from "./libs/helpers/index.js";
import { getKeyPairFromWif } from "../../libs/helpers/get-key-pair-from.wif.helper.js";
import { getKeyPairFromBip32Interface } from "../../libs/helpers/get-key-pair-from-bip32-interface.helper.js";

import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { type Secp256k1Curve, type PrefixConfig } from "@/libs/modules/curves/curves.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/types.js";
import { convertBytesToHex, convertHexToBytes } from "@/libs/utils/index.js";

class TaprootKeyDerivation implements AbstractKeyDerivation<"btcTaproot"> {
  public prefixConfig: PrefixConfig;
  private mnemonic: Mnemonic;
  private secp256k1Curve: Secp256k1Curve;

  public constructor(
    prefixConfig: PrefixConfig,
    mnemonic: Mnemonic,
    secp256k1Curve: Secp256k1Curve,
  ) {
    this.prefixConfig = prefixConfig;
    this.mnemonic = mnemonic;
    this.secp256k1Curve = secp256k1Curve;
  }

  public deriveFromMnemonic({
    derivationPath,
    base58RootKey,
  }: DeriveFromMnemonicParameters<"btcTaproot">): CommonKeyPair {
    const seed = this.mnemonic.getSeed();

    const rootKey = base58RootKey
      ? this.secp256k1Curve.getRootKeyFromBase58(base58RootKey, this.prefixConfig)
      : this.secp256k1Curve.getRootKeyFromSeed(seed, this.prefixConfig);

    const node = this.secp256k1Curve.derivePath(rootKey, derivationPath);

    const keyPair = getKeyPairFromBip32Interface(node, true);

    return this.getXOnlyKeyPair(keyPair);
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"btcTaproot">): CommonKeyPair {
    const keyPair = getKeyPairFromWif(privateKey, this.prefixConfig);

    return this.getXOnlyKeyPair(keyPair);
  }

  private getXOnlyKeyPair(keyPair: CommonKeyPair): CommonKeyPair {
    const xOnlyPublicKey = toXOnlyPublicKey(convertHexToBytes(keyPair.publicKey));
    const publicKey = convertBytesToHex(xOnlyPublicKey);

    return { privateKey: keyPair.privateKey, publicKey };
  }
}

export { TaprootKeyDerivation };
