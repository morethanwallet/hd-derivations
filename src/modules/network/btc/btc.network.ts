import {
  TaprootKeyDerivation,
  CommonBipKeyDerivation,
} from "@/libs/modules/key-derivation/index.js";
import { btcConfig } from "@/modules/network/libs/modules/config/index.js";
import type {
  DeriveItemFromMnemonicParameters,
  GetCredentialFromPKParameters,
  AbstractNetwork,
  ConstructorParameters,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  DerivedCredential,
  DerivedItem,
  DerivationsHandlers,
} from "@/modules/network/libs/types/index.js";
import {
  getLegacyDerivationHandlers,
  getSegWitDerivationHandlers,
  getNativeSegWitDerivationHandlers,
  getTaprootDerivationHandlers,
  getP2wshDerivationHandlers,
  getP2wshInP2shDerivationHandlers,
} from "./libs/helpers/index.js";
import { findCustomPrefixConfig } from "@/modules/network/libs/helpers/index.js";
import { type BtcDerivationTypeUnion } from "@/libs/types/index.js";
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Btc implements AbstractNetwork<BtcDerivationTypeUnion> {
  private derivationHandlers: DerivationsHandlers<BtcDerivationTypeUnion>[BtcDerivationTypeUnion];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<BtcDerivationTypeUnion>) {
    const { networkPurpose, derivationType } = derivationConfig;
    const secp256K1Curve = new Secp256k1Curve();

    const derivationsHandlers: DerivationsHandlers<BtcDerivationTypeUnion> = {
      btcLegacy: getLegacyDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("btcLegacy", derivationConfig) ??
            btcConfig[networkPurpose].btcLegacy.prefixConfig,
          mnemonic,
          secp256K1Curve,
        ),
      }),
      btcSegWit: getSegWitDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("btcSegWit", derivationConfig) ??
            btcConfig[networkPurpose].btcSegWit.prefixConfig,
          mnemonic,
          secp256K1Curve,
        ),
      }),
      btcNativeSegWit: getNativeSegWitDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("btcNativeSegWit", derivationConfig) ??
            btcConfig[networkPurpose].btcNativeSegWit.prefixConfig,
          mnemonic,
          secp256K1Curve,
        ),
      }),
      btcTaproot: getTaprootDerivationHandlers({
        keysDerivationInstance: new TaprootKeyDerivation(
          findCustomPrefixConfig("btcTaproot", derivationConfig) ??
            btcConfig[networkPurpose].btcTaproot.prefixConfig,
          mnemonic,
          secp256K1Curve,
        ),
      }),
      btcP2wsh: getP2wshDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("btcP2wsh", derivationConfig) ??
            btcConfig[networkPurpose].btcP2wsh.prefixConfig,
          mnemonic,
          secp256K1Curve,
        ),
      }),
      btcP2wshInP2sh: getP2wshInP2shDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("btcP2wshInP2sh", derivationConfig) ??
            btcConfig[networkPurpose].btcP2wshInP2sh.prefixConfig,
          mnemonic,
          secp256K1Curve,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<BtcDerivationTypeUnion>,
  ): DerivedItem<BtcDerivationTypeUnion> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<BtcDerivationTypeUnion>,
  ): DerivedCredential<BtcDerivationTypeUnion> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<BtcDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<BtcDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Btc };
