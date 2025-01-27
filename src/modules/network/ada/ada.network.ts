import {
  BaseKeyDerivation,
  EnterpriseKeyDerivation,
  RewardKeyDerivation,
} from "@/modules/keyDerivation/index.js";
import type {
  DeriveItemFromMnemonicParameters,
  AbstractNetwork,
  GetCredentialFromPrivateKeyInnerHandlerParameters,
  ConstructorParameters,
  DeriveItemsBatchFromMnemonicParameters,
  CheckIfPrivateKeyBelongsToMnemonicParameters,
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
  // question: can be allow to pass only specific networkHandler?
  // hard to imagine the case when we need multiple of them at once

  // summary: simplify and set derivationType in constructor
  // maybe also rename `NetworkHandlers` to `DerivationHandlers`
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

  // public getCredentialFromPrivateKey({
  //   derivationType,
  //   ...parameters
  // }: GetCredentialFromPrivateKeyParameters<AdaDerivationTypeUnion>): DerivedCredential<AdaDerivationTypeUnion> {
  //   const derivationHandlers = this.handlers[derivationType];

  //   if (!derivationHandler) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

  //   if (derivationType === "adaBase") {
  //     return derivationHandlers.getCredentialFromPrivateKey(
  //       parameters as GetCredentialFromPrivateKeyParameters<"adaBase">
  //     );
  //   }
  // }

  public getCredentialFromPrivateKey<C extends AdaDerivationTypeUnion>({
    derivationType,
    ...parameters
  }: GetCredentialFromPrivateKeyInnerHandlerParameters<C> & {
    derivationType: C;
  }): DerivedCredential<AdaDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers(derivationType);

    // TODO: Fix assertions
    return derivationHandlers.getCredentialFromPrivateKey(parameters as any);
  }

  public deriveItemsBatchFromMnemonic({
    derivationType,
    ...parameters
  }: DeriveItemsBatchFromMnemonicParameters<AdaDerivationTypeUnion>) {
    const derivationHandlers = this.getDerivationHandlers(derivationType);

    return (derivationHandlers as any).deriveItemsBatchFromMnemonic(parameters);
  }

  public checkIfPrivateKeyBelongsToMnemonic(
    parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<AdaDerivationTypeUnion>,
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.checkIfPrivateKeyBelongsToMnemonic(parameters)) return true;
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
