import { bufferToHex } from "ethereumjs-util";

import {
  getSecp256k1NodeFromMnemonic,
  getKeyPairFromPrivateKeyBytes,
} from "../../libs/helpers/index.js";

import { checkAndRemoveHexPrefix, addHexPrefix, convertHexToBytes } from "@/libs/utils/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { type Secp256k1Curve, type PrefixConfig } from "@/libs/modules/curves/curves.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/types.js";

class EvmKeyDerivation implements AbstractKeyDerivation<"evmBase"> {
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
  }: DeriveFromMnemonicParameters<"evmBase">): CommonKeyPair {
    const node = getSecp256k1NodeFromMnemonic({
      derivationPath,
      mnemonic: this.mnemonic,
      secp256k1Curve: this.secp256k1Curve,
      prefixConfig: this.prefixConfig,
    });

    return this.getKeyPair(node.privateKey);
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"evmBase">): CommonKeyPair {
    const rawPrivateKey = convertHexToBytes(checkAndRemoveHexPrefix(privateKey));

    return this.getKeyPair(rawPrivateKey);
  }

  private getKeyPair(privateKeyBytes: Uint8Array | undefined): CommonKeyPair {
    const { privateKey, publicKey } = getKeyPairFromPrivateKeyBytes(
      privateKeyBytes,
      this.secp256k1Curve,
      this.prefixConfig,
    );

    return {
      privateKey: bufferToHex(Buffer.from(privateKey, "hex")),
      publicKey: addHexPrefix(publicKey),
    };
  }
}

export { EvmKeyDerivation };
