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
} from "../types/index.js";
import { DerivedCredential, type AdaDerivationTypeUnion, type DerivedItem } from "@/types/index.js";
import {
  getBaseItemHandlers,
  getEnterpriseItemHandlers,
  getNetworkId,
  getRewardItemHandlers,
} from "./helpers/index.js";
import { ExceptionMessage } from "../exceptions/index.js";
import { type Handlers } from "./types/index.js";

class Cardano implements AbstractNetwork<AdaDerivationTypeUnion> {
  public handlers: NonNullable<Partial<Handlers>>;

  public constructor({
    mnemonic,
    networkPurpose,
    derivationConfigs,
  }: ConstructorParameters<AdaDerivationTypeUnion>) {
    const networkId = getNetworkId(networkPurpose);

    const keysDerivationHandlers = {
      enterprise: getEnterpriseItemHandlers(new EnterpriseKeyDerivation(mnemonic), networkId),
      reward: getRewardItemHandlers(new RewardKeyDerivation(mnemonic), networkId),
      adaBase: getBaseItemHandlers(new BaseKeyDerivation(mnemonic), networkId),
    };

    this.handlers = Object.fromEntries(
      derivationConfigs.map(({ derivationType }) => {
        return [derivationType, keysDerivationHandlers[derivationType]];
      })
    );
  }

  public deriveItemFromMnemonic({
    derivationType,
    derivationPath,
  }: DeriveItemFromMnemonicParameters<AdaDerivationTypeUnion>): DerivedItem<AdaDerivationTypeUnion> {
    const derivationHandler = this.getDerivationHandler(derivationType);

    return derivationHandler.deriveItemFromMnemonic({ derivationPath });
  }

  // public getCredentialFromPrivateKey({
  //   derivationType,
  //   ...parameters
  // }: GetCredentialFromPrivateKeyParameters<AdaDerivationTypeUnion>): DerivedCredential<AdaDerivationTypeUnion> {
  //   const derivationHandler = this.handlers[derivationType];

  //   if (!derivationHandler) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

  //   if (derivationType === "adaBase") {
  //     return derivationHandler.getCredentialFromPrivateKey(
  //       parameters as GetCredentialFromPrivateKeyParameters<"adaBase">
  //     );
  //   }
  // }

  public getCredentialFromPrivateKey<C extends AdaDerivationTypeUnion>({
    derivationType,
    ...parameters
  }: {
    derivationType: C;
  } & GetCredentialFromPrivateKeyInnerHandlerParameters<C>): DerivedCredential<AdaDerivationTypeUnion> {
    const derivationHandler = this.getDerivationHandler(derivationType);

    // TODO: Fix this assertion
    return derivationHandler.getCredentialFromPrivateKey(parameters as any);
  }

  private getDerivationHandler(
    derivationType: AdaDerivationTypeUnion
  ): Handlers[AdaDerivationTypeUnion] | never {
    const derivationHandler = this.handlers[derivationType];

    if (!derivationHandler) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandler;
  }
}

export { Cardano };
