import {
  type DeriveFromMnemonicParameters,
  type AbstractKeyDerivation,
  type CommonBipDerivationTypeUnion,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/types.js";
import { type Secp256k1Curve, type PrefixConfig } from "@/libs/modules/curves/curves.js";
import {
  getKeyPairFromBip32Interface,
  getKeyPairFromPrivateKeyBytes,
  getKeyPairFromWif,
} from "@/libs/modules/key-derivation/libs/helpers/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { convertHexToBytes } from "@/libs/utils/index.js";

class CommonBipKeyDerivation implements AbstractKeyDerivation<CommonBipDerivationTypeUnion> {
  public prefixConfig: PrefixConfig;
  private isPrivateKeyWifFormatted: boolean;
  private mnemonic: Mnemonic;
  private secp256k1Curve: Secp256k1Curve;

  public constructor(
    prefixConfig: PrefixConfig,
    mnemonic: Mnemonic,
    secp256k1Curve: Secp256k1Curve,
    isPrivateKeyWifFormatted: boolean = true,
  ) {
    this.isPrivateKeyWifFormatted = isPrivateKeyWifFormatted;
    this.prefixConfig = prefixConfig;
    this.mnemonic = mnemonic;
    this.secp256k1Curve = secp256k1Curve;
  }

  public deriveFromMnemonic({
    derivationPath,
    base58RootKey,
  }: DeriveFromMnemonicParameters<CommonBipDerivationTypeUnion>): CommonKeyPair {
    const seed = this.mnemonic.getSeed();

    const rootKey = base58RootKey
      ? this.secp256k1Curve.getRootKeyFromBase58(base58RootKey, this.prefixConfig)
      : this.secp256k1Curve.getRootKeyFromSeed(seed, this.prefixConfig);

    const node = this.secp256k1Curve.derivePath(rootKey, derivationPath);

    return getKeyPairFromBip32Interface(node, this.isPrivateKeyWifFormatted);
  }

  public importByPrivateKey({
    privateKey,
  }: PrivateKey<CommonBipDerivationTypeUnion>): CommonKeyPair {
    const wifKeyLength = 52;
    const isWifPrivateKey = privateKey.length === wifKeyLength;

    if (isWifPrivateKey) {
      return getKeyPairFromWif(privateKey, this.prefixConfig);
    }

    return getKeyPairFromPrivateKeyBytes(
      convertHexToBytes(privateKey),
      this.secp256k1Curve,
      this.prefixConfig,
    );
  }
}

export { CommonBipKeyDerivation };
