import { CommonBipKeyDerivation } from "@/libs/modules/key-derivation/index.js";
import { ltcConfig } from "@/modules/network/libs/modules/config/index.js";
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
} from "./libs/helpers/index.js";
import { findCustomPrefixConfig } from "@/modules/network/libs/helpers/index.js";
import type { LtcDerivationTypeUnion } from "@/libs/types/index.js";

class Ltc implements AbstractNetwork<LtcDerivationTypeUnion> {
  private derivationHandlers: DerivationsHandlers<LtcDerivationTypeUnion>[LtcDerivationTypeUnion];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<LtcDerivationTypeUnion>) {
    const { networkPurpose, derivationType } = derivationConfig;

    const derivationsHandlers: DerivationsHandlers<LtcDerivationTypeUnion> = {
      ltcLegacy: getLegacyDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("ltcLegacy", derivationConfig) ??
            ltcConfig[networkPurpose].ltcLegacy.prefixConfig,
          mnemonic,
        ),
      }),
      ltcSegWit: getSegWitDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("ltcSegWit", derivationConfig) ??
            ltcConfig[networkPurpose].ltcSegWit.prefixConfig,
          mnemonic,
        ),
      }),
      ltcNativeSegWit: getNativeSegWitDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("ltcNativeSegWit", derivationConfig) ??
            ltcConfig[networkPurpose].ltcNativeSegWit.prefixConfig,
          mnemonic,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<LtcDerivationTypeUnion>,
  ): DerivedItem<LtcDerivationTypeUnion> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<LtcDerivationTypeUnion>,
  ): DerivedCredential<LtcDerivationTypeUnion> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<LtcDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<LtcDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Ltc };
