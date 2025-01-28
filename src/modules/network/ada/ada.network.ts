import {
  BaseKeyDerivation,
  EnterpriseKeyDerivation,
  RewardKeyDerivation,
} from "@/libs/modules/key-derivation/index.js";
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

class Ada implements AbstractNetwork<AdaDerivationTypeUnion> {
  private derivationHandlers: DerivationsHandlers<AdaDerivationTypeUnion>[AdaDerivationTypeUnion];

  public constructor({
    mnemonic,
    networkPurpose,
    derivationConfig,
  }: ConstructorParameters<AdaDerivationTypeUnion>) {
    const networkId = getNetworkId(networkPurpose);

    const derivationsHandlers: DerivationsHandlers<AdaDerivationTypeUnion> = {
      enterprise: getEnterpriseDerivationHandlers({
        networkId,
        networkPurpose,
        keysDerivationInstance: new EnterpriseKeyDerivation(mnemonic),
      }),
      reward: getRewardDerivationHandlers({
        networkId,
        networkPurpose,
        keysDerivationInstance: new RewardKeyDerivation(mnemonic),
      }),
      adaBase: getBaseDerivationHandlers({
        networkId,
        networkPurpose,
        keysDerivationInstance: new BaseKeyDerivation(mnemonic),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationConfig.derivationType];
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

  public doesPKeyBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<AdaDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKeyBelongToMnemonic(parameters);
  }
}

export { Ada };
