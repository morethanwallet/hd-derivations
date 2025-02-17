import type {
  DeriveItemFromMnemonicParameters,
  AbstractNetwork,
  ConstructorParameters,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  DerivedItem,
  DerivedCredential,
  DerivationsHandlers,
  GetCredentialFromPKParameters,
} from "@/modules/network/libs/types/index.js";
import {
  getNetworkId,
  getEnterpriseDerivationHandlers,
  getRewardDerivationHandlers,
  getBaseDerivationHandlers,
} from "./libs/helpers/index.js";
import type { AdaDerivationTypeUnion } from "@/libs/types/index.js";
import {
  AdaBaseKeyDerivation,
  AdaCommonKeyDerivation,
} from "@/libs/modules/key-derivation/index.js";

class Ada implements AbstractNetwork<AdaDerivationTypeUnion> {
  private derivationHandlers: DerivationsHandlers<AdaDerivationTypeUnion>[AdaDerivationTypeUnion];

  public constructor({
    mnemonic,
    derivationConfig: { derivationType, networkPurpose },
  }: ConstructorParameters<AdaDerivationTypeUnion>) {
    const networkId = getNetworkId(networkPurpose);
    const commonKeysDerivationInstance = new AdaCommonKeyDerivation(mnemonic);

    const derivationsHandlers: DerivationsHandlers<AdaDerivationTypeUnion> = {
      adaEnterprise: getEnterpriseDerivationHandlers({
        networkId,
        keysDerivationInstance: commonKeysDerivationInstance,
      }),
      adaReward: getRewardDerivationHandlers({
        networkId,
        keysDerivationInstance: commonKeysDerivationInstance,
      }),
      adaBase: getBaseDerivationHandlers({
        networkId,
        keysDerivationInstance: new AdaBaseKeyDerivation(mnemonic),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<AdaDerivationTypeUnion>,
  ): DerivedItem<AdaDerivationTypeUnion> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<AdaDerivationTypeUnion>,
  ): DerivedCredential<AdaDerivationTypeUnion> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<AdaDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<AdaDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Ada };
