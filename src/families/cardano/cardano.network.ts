import {
  BaseKeyDerivation,
  EnterpriseKeyDerivation,
  RewardKeyDerivation,
} from "@/keyDerivation/index.js";
import {
  type DeriveItemFromMnemonicParameters,
  type AbstractNetwork,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
  type ConstructorParameters,
  type DeriveItemsBatchFromMnemonicParameters,
  type CheckIfPrivateKeyBelongsToMnemonicParameters,
  type DerivedItem,
  type DerivedCredential,
  type DerivationHandlers,
} from "../types/index.js";
import {
  getBaseItemHandlers,
  getEnterpriseItemHandlers,
  getNetworkId,
  getRewardItemHandlers,
} from "./helpers/index.js";
import { ExceptionMessage } from "../enums/index.js";
import { type Handlers } from "./types/index.js";
import { getNetworkHandlers } from "../helpers/index.js";
import { AdaDerivationTypeUnion } from "@/types/derivation/index.js";

class Cardano implements AbstractNetwork<AdaDerivationTypeUnion> {
  private handlers: NonNullable<Partial<Handlers>>;

  public constructor({
    mnemonic,
    networkPurpose,
    derivationConfigs,
  }: ConstructorParameters<AdaDerivationTypeUnion>) {
    const networkId = getNetworkId(networkPurpose);

    const keysDerivationHandlers: DerivationHandlers<AdaDerivationTypeUnion> = {
      enterprise: getEnterpriseItemHandlers({
        networkId,
        networkPurpose,
        keysDerivationInstance: new EnterpriseKeyDerivation(mnemonic),
      }),
      reward: getRewardItemHandlers({
        networkId,
        networkPurpose,
        keysDerivationInstance: new RewardKeyDerivation(mnemonic),
      }),
      adaBase: getBaseItemHandlers({
        networkId,
        networkPurpose,
        keysDerivationInstance: new BaseKeyDerivation(mnemonic),
      }),
    };

    this.handlers = getNetworkHandlers(derivationConfigs, keysDerivationHandlers);
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
    parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<AdaDerivationTypeUnion>
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.checkIfPrivateKeyBelongsToMnemonic(parameters)) return true;
    }

    return false;
  }

  private getDerivationHandlers(
    derivationType: AdaDerivationTypeUnion
  ): Handlers[AdaDerivationTypeUnion] | never {
    const derivationHandlers = this.handlers[derivationType];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Cardano };
