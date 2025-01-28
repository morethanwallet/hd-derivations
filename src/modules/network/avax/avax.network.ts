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
import { findCustomConfig } from "@/modules/network/libs/helpers/index.js";
import { type AvaxDerivationTypeUnion } from "@/libs/types/index.js";
import { avaxConfig } from "@/modules/network/libs/modules/config/index.js";

class Avax implements AbstractNetwork<AvaxDerivationTypeUnion> {
  private derivationHandlers: DerivationsHandlers<AvaxDerivationTypeUnion>[AvaxDerivationTypeUnion];

  public constructor({
    mnemonic,
    networkPurpose,
    derivationConfig,
  }: ConstructorParameters<AvaxDerivationTypeUnion>) {
    const derivationsHandlers: DerivationsHandlers<AvaxDerivationTypeUnion> = {
      avaxX: getAvaxDerivationHandlers({
        networkPurpose,
        derivationType: "avaxX",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("avaxX", derivationConfig) ??
            avaxConfig[networkPurpose].avax.prefixConfig,
          mnemonic,
          false,
        ),
      }),
      avaxP: getAvaxDerivationHandlers({
        networkPurpose,
        derivationType: "avaxP",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("avaxP", derivationConfig) ??
            avaxConfig[networkPurpose].avax.prefixConfig,
          mnemonic,
          false,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationConfig.derivationType];
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

  public doesPKeyBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<AvaxDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKeyBelongToMnemonic(parameters);
  }
}

export { Avax };
