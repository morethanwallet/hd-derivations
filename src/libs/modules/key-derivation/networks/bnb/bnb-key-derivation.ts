import { getPublicKeyFromPrivateKey } from "@binance-chain/javascript-sdk/lib/crypto/index.js";

import {
  getSecp256k1NodeFromMnemonic,
  getKeyPairFromPrivateKeyBytes,
} from "../../libs/helpers/index.js";

import {
  type DeriveFromMnemonicParameters,
  type AbstractKeyDerivation,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/types.js";
import { type Secp256k1Curve, type PrefixConfig } from "@/libs/modules/curves/curves.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { convertHexToBytes } from "@/libs/utils/index.js";

class BnbKeyDerivation implements AbstractKeyDerivation<"bnbBase"> {
  public prefixConfig: PrefixConfig;
  private mnemonic: Mnemonic;
  private secp256k1Curve: Secp256k1Curve;

  public constructor(
    mnemonic: Mnemonic,
    secp256k1Curve: Secp256k1Curve,
    prefixConfig: PrefixConfig,
  ) {
    this.mnemonic = mnemonic;
    this.secp256k1Curve = secp256k1Curve;
    this.prefixConfig = prefixConfig;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"bnbBase">): CommonKeyPair {
    const node = getSecp256k1NodeFromMnemonic({
      derivationPath,
      mnemonic: this.mnemonic,
      secp256k1Curve: this.secp256k1Curve,
      prefixConfig: this.prefixConfig,
    });

    return this.getKeyPair(node.privateKey);
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"bnbBase">): CommonKeyPair {
    const rawKey = convertHexToBytes(privateKey);

    return this.getKeyPair(rawKey);
  }

  public getKeyPair(privateKeyBytes: Uint8Array | undefined): CommonKeyPair {
    const { privateKey } = getKeyPairFromPrivateKeyBytes(
      privateKeyBytes,
      this.secp256k1Curve,
      this.prefixConfig,
    );

    const publicKey = getPublicKeyFromPrivateKey(privateKey);

    return { privateKey, publicKey };
  }
}

export { BnbKeyDerivation };
