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
    networkPurpose,
    derivationConfig,
  }: ConstructorParameters<BtcDerivationTypeUnion>) {
    const derivationsHandlers: DerivationsHandlers<BtcDerivationTypeUnion> = {
      legacy: getLegacyDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("legacy", derivationConfig) ??
            btcConfig[networkPurpose].legacy.prefixConfig,
          mnemonic,
        ),
      }),
      segWit: getSegWitDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("segWit", derivationConfig) ??
            btcConfig[networkPurpose].segWit.prefixConfig,
          mnemonic,
        ),
      }),
      nativeSegWit: getNativeSegWitDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("nativeSegWit", derivationConfig) ??
            btcConfig[networkPurpose].nativeSegWit.prefixConfig,
          mnemonic,
        ),
      }),
      taproot: getTaprootDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new TaprootKeyDerivation(
          findCustomConfig("taproot", derivationConfig) ??
            btcConfig[networkPurpose].taproot.prefixConfig,
          mnemonic,
        ),
      }),
      p2wsh: getP2wshDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("p2wsh", derivationConfig) ??
            btcConfig[networkPurpose].p2wsh.prefixConfig,
          mnemonic,
        ),
      }),
      p2wshInP2sh: getP2wshInP2shDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("p2wshInP2sh", derivationConfig) ??
            btcConfig[networkPurpose].p2wshInP2sh.prefixConfig,
          mnemonic,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationConfig.derivationType];
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
