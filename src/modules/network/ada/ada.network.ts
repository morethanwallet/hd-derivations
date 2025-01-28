import {
  BaseKeyDerivation,
  EnterpriseKeyDerivation,
  RewardKeyDerivation,
} from "@/libs/modules/key-derivation/index.js";
import type {
  DeriveItemFromMnemonicParameters,
  AbstractNetwork,
  GetCredentialFromPKInnerHandlerParameters,
  ConstructorParameters,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  DerivedItem,
  DerivedCredential,
  NetworkHandlers,
} from "@/modules/network/libs/types/index.js";
import {
  getNetworkId,
  getEnterpriseDerivationHandlers,
  getRewardDerivationHandlers,
  getBaseDerivationHandlers,
} from "./libs/helpers/index.js";
import { ExceptionMessage } from "@/modules/network/libs/enums/index.js";
import { getNetworkHandlers } from "@/modules/network/libs/helpers/index.js";
import type { AdaDerivationTypeUnion } from "@/libs/types/index.js";

class Ada implements AbstractNetwork<AdaDerivationTypeUnion> {
  private handlers: NonNullable<Partial<NetworkHandlers<AdaDerivationTypeUnion>>>;

  public constructor({
    mnemonic,
    networkPurpose,
    derivationConfigs,
  }: ConstructorParameters<AdaDerivationTypeUnion>) {
    const networkId = getNetworkId(networkPurpose);

    const networkHandlers: NetworkHandlers<AdaDerivationTypeUnion> = {
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

    this.handlers = getNetworkHandlers(derivationConfigs, networkHandlers);
  }

  public deriveItemFromMnemonic({
    derivationType,
    derivationPath,
  }: DeriveItemFromMnemonicParameters<AdaDerivationTypeUnion>): DerivedItem<AdaDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers(derivationType);

    return derivationHandlers.deriveItemFromMnemonic({ derivationPath });
  }

  // public getCredentialFromPK({
  //   derivationType,
  //   ...parameters
  // }: GetCredentialFromPKParameters<AdaDerivationTypeUnion>): DerivedCredential<AdaDerivationTypeUnion> {
  //   const derivationHandlers = this.handlers[derivationType];

  //   if (!derivationHandler) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

  //   if (derivationType === "adaBase") {
  //     return derivationHandlers.getCredentialFromPK(
  //       parameters as GetCredentialFromPKParameters<"adaBase">
  //     );
  //   }
  // }

  public getCredentialFromPK<C extends AdaDerivationTypeUnion>({
    derivationType,
    ...parameters
  }: GetCredentialFromPKInnerHandlerParameters<C> & {
    derivationType: C;
  }): DerivedCredential<AdaDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers(derivationType);

    // TODO: Fix assertions
    return derivationHandlers.getCredentialFromPK(parameters as any);
  }

  public deriveItemsBatchFromMnemonic({
    derivationType,
    ...parameters
  }: DeriveItemsBatchFromMnemonicParameters<AdaDerivationTypeUnion>) {
    const derivationHandlers = this.getDerivationHandlers(derivationType);

    return (derivationHandlers as any).deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKeyBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<AdaDerivationTypeUnion>,
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.doesPKeyBelongToMnemonic(parameters)) return true;
    }

    return false;
  }

  private getDerivationHandlers(
    derivationType: AdaDerivationTypeUnion,
  ): NetworkHandlers<AdaDerivationTypeUnion>[AdaDerivationTypeUnion] | never {
    const derivationHandlers = this.handlers[derivationType];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Ada };
