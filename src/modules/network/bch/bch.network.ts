import type { BchDerivationTypeUnion } from "@/libs/types/index.js";
import type {
  AbstractNetwork,
  DerivationsHandlers,
  ConstructorParameters,
  DeriveItemFromMnemonicParameters,
  DerivedCredential,
  DerivedItem,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  GetCredentialFromPKParameters,
} from "../libs/types/index.js";
import {
  getCashAddrDerivationHandlers,
  getLegacyDerivationHandlers,
} from "./libs/helpers/index.js";
import { CommonBipKeyDerivation } from "@/libs/modules/key-derivation/index.js";
import { findCustomPrefixConfig } from "../libs/helpers/index.js";
import { bchConfig } from "../libs/modules/config/index.js";

class Bch implements AbstractNetwork<BchDerivationTypeUnion> {
  private derivationHandlers: DerivationsHandlers<BchDerivationTypeUnion>[BchDerivationTypeUnion];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<BchDerivationTypeUnion>) {
    const { networkPurpose, derivationType } = derivationConfig;

    const derivationsHandlers: DerivationsHandlers<BchDerivationTypeUnion> = {
      bchLegacy: getLegacyDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("bchLegacy", derivationConfig) ??
            bchConfig[networkPurpose].bchLegacy.prefixConfig,
          mnemonic,
        ),
      }),
      bchCashAddr: getCashAddrDerivationHandlers({
        isRegtest: networkPurpose === "regtest",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("bchCashAddr", derivationConfig) ??
            bchConfig[networkPurpose].bchCashAddr.prefixConfig,
          mnemonic,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<BchDerivationTypeUnion>,
  ): DerivedItem<BchDerivationTypeUnion> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<BchDerivationTypeUnion>,
  ): DerivedCredential<BchDerivationTypeUnion> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<BchDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<BchDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Bch };
