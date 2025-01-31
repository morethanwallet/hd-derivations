import type {
  AbstractNetwork,
  DeriveItemFromMnemonicParameters,
  ConstructorParameters,
  GetCredentialFromPKParameters,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  DerivedCredential,
  DerivedItem,
  DerivationsHandlers,
} from "@/modules/network/libs/types/index.js";
import { getAvaxDerivationHandlers } from "./libs/helpers/index.js";
import { CommonBipKeyDerivation } from "@/libs/modules/key-derivation/index.js";
import { findCustomPrefixConfig } from "@/modules/network/libs/helpers/index.js";
import { type AvaxDerivationTypeUnion } from "@/libs/types/index.js";
import { avaxConfig } from "@/modules/network/libs/modules/config/index.js";

class Avax implements AbstractNetwork<AvaxDerivationTypeUnion> {
  private derivationHandlers: DerivationsHandlers<AvaxDerivationTypeUnion>[AvaxDerivationTypeUnion];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<AvaxDerivationTypeUnion>) {
    const { networkPurpose, derivationType } = derivationConfig;

    const derivationsHandlers: DerivationsHandlers<AvaxDerivationTypeUnion> = {
      avaxX: getAvaxDerivationHandlers({
        derivationType: "avaxX",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("avaxX", derivationConfig) ??
            avaxConfig[networkPurpose].avax.prefixConfig,
          mnemonic,
          false,
        ),
      }),
      avaxP: getAvaxDerivationHandlers({
        derivationType: "avaxP",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("avaxP", derivationConfig) ??
            avaxConfig[networkPurpose].avax.prefixConfig,
          mnemonic,
          false,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<AvaxDerivationTypeUnion>,
  ): DerivedItem<AvaxDerivationTypeUnion> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<AvaxDerivationTypeUnion>,
  ): DerivedCredential<AvaxDerivationTypeUnion> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<AvaxDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<AvaxDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Avax };
