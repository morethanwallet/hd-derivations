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
import { type DerivationTypeUnionByNetwork } from "@/libs/types/types.js";
import { avaxConfig } from "@/modules/network/libs/modules/config/index.js";
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Avax implements AbstractNetwork<DerivationTypeUnionByNetwork["avax"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeUnionByNetwork["avax"]
  >[DerivationTypeUnionByNetwork["avax"]];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<DerivationTypeUnionByNetwork["avax"]>) {
    const { networkPurpose, derivationType } = derivationConfig;
    const { prefix } = avaxConfig[networkPurpose][derivationType];
    const secp256k1Curve = new Secp256k1Curve();

    const derivationsHandlers: DerivationsHandlers<DerivationTypeUnionByNetwork["avax"]> = {
      avaxX: getAvaxDerivationHandlers({
        prefix,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("avaxX", derivationConfig) ??
            avaxConfig[networkPurpose].avaxX.prefixConfig,
          mnemonic,
          secp256k1Curve,
          false,
        ),
      }),
      avaxP: getAvaxDerivationHandlers({
        prefix,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("avaxP", derivationConfig) ??
            avaxConfig[networkPurpose].avaxP.prefixConfig,
          mnemonic,
          secp256k1Curve,
          false,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeUnionByNetwork["avax"]>,
  ): DerivedItem<DerivationTypeUnionByNetwork["avax"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeUnionByNetwork["avax"]>,
  ): DerivedCredential<DerivationTypeUnionByNetwork["avax"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeUnionByNetwork["avax"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeUnionByNetwork["avax"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Avax };
