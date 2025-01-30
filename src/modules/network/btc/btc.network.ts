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
import { findCustomConfig } from "@/modules/network/libs/helpers/index.js";
import { type BtcDerivationTypeUnion } from "@/libs/types/index.js";

class Btc implements AbstractNetwork<BtcDerivationTypeUnion> {
  private derivationHandlers: DerivationsHandlers<BtcDerivationTypeUnion>[BtcDerivationTypeUnion];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<BtcDerivationTypeUnion>) {
    const { networkPurpose, derivationType } = derivationConfig;

    const derivationsHandlers: DerivationsHandlers<BtcDerivationTypeUnion> = {
      btcLegacy: getLegacyDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("btcLegacy", derivationConfig) ??
            btcConfig[networkPurpose].btcLegacy.prefixConfig,
          mnemonic,
        ),
      }),
      btcSegWit: getSegWitDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("btcSegWit", derivationConfig) ??
            btcConfig[networkPurpose].btcSegWit.prefixConfig,
          mnemonic,
        ),
      }),
      btcNativeSegWit: getNativeSegWitDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("btcNativeSegWit", derivationConfig) ??
            btcConfig[networkPurpose].btcNativeSegWit.prefixConfig,
          mnemonic,
        ),
      }),
      btcTaproot: getTaprootDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new TaprootKeyDerivation(
          findCustomConfig("btcTaproot", derivationConfig) ??
            btcConfig[networkPurpose].btcTaproot.prefixConfig,
          mnemonic,
        ),
      }),
      btcP2wsh: getP2wshDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("btcP2wsh", derivationConfig) ??
            btcConfig[networkPurpose].btcP2wsh.prefixConfig,
          mnemonic,
        ),
      }),
      btcP2wshInP2sh: getP2wshInP2shDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("btcP2wshInP2sh", derivationConfig) ??
            btcConfig[networkPurpose].btcP2wshInP2sh.prefixConfig,
          mnemonic,
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

  public doesPKeyBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<BtcDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKeyBelongToMnemonic(parameters);
  }
}

export { Btc };
