import {
  getLegacyDerivationHandlers,
  getSegWitDerivationHandlers,
  getNativeSegWitDerivationHandlers,
} from "./libs/helpers/index.js";

import { CommonBipKeyDerivation } from "@/libs/modules/key-derivation/networks.js";
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
import { findCustomPrefixConfig } from "@/modules/network/libs/helpers/helpers.js";
import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Ltc implements AbstractNetwork<DerivationTypeUnionByNetwork["ltc"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeUnionByNetwork["ltc"]
  >[DerivationTypeUnionByNetwork["ltc"]];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<DerivationTypeUnionByNetwork["ltc"]>) {
    const { networkPurpose, derivationType } = derivationConfig;
    const secp256k1Curve = new Secp256k1Curve();

    const derivationsHandlers: DerivationsHandlers<DerivationTypeUnionByNetwork["ltc"]> = {
      ltcLegacy: getLegacyDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("ltcLegacy", derivationConfig) ??
            ltcConfig[networkPurpose].ltcLegacy.prefixConfig,
          mnemonic,
          secp256k1Curve,
        ),
      }),
      ltcSegWit: getSegWitDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("ltcSegWit", derivationConfig) ??
            ltcConfig[networkPurpose].ltcSegWit.prefixConfig,
          mnemonic,
          secp256k1Curve,
        ),
      }),
      ltcNativeSegWit: getNativeSegWitDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("ltcNativeSegWit", derivationConfig) ??
            ltcConfig[networkPurpose].ltcNativeSegWit.prefixConfig,
          mnemonic,
          secp256k1Curve,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeUnionByNetwork["ltc"]>,
  ): DerivedItem<DerivationTypeUnionByNetwork["ltc"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeUnionByNetwork["ltc"]>,
  ): DerivedCredential<DerivationTypeUnionByNetwork["ltc"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeUnionByNetwork["ltc"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeUnionByNetwork["ltc"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Ltc };
