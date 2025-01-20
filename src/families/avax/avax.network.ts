import {
  type AbstractNetwork,
  type DeriveItemFromMnemonicParameters,
  type ConstructorParameters,
  type GetCredentialFromPrivateKeyParameters,
  type DeriveItemsBatchFromMnemonicParameters,
  type CheckIfPrivateKeyBelongsToMnemonicParameters,
} from "../types/index.js";
import {
  type AvaxDerivationTypeUnion,
  type DerivedCredential,
  type DerivedItem,
} from "@/types/index.js";
import { type Handlers } from "./types/index.js";
import { getAvaxItemHandlers } from "./helpers/getItemHandlers.helper.js";
import { CommonBipKeyDerivation } from "@/keyDerivation/index.js";
import { findCustomConfig, getNetworkHandlers } from "../helpers/index.js";
import { avaxConfig } from "@/config/index.js";
import { ExceptionMessage } from "../exceptions/index.js";

class Avax implements AbstractNetwork<AvaxDerivationTypeUnion> {
  private handlers: Partial<Handlers>;

  public constructor({
    derivationConfigs,
    mnemonic,
    networkPurpose,
  }: ConstructorParameters<AvaxDerivationTypeUnion>) {
    const keysDerivationHandlers = {
      avaxX: getAvaxItemHandlers({
        networkPurpose,
        derivationType: "avaxX",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("avaxX", derivationConfigs) ??
            avaxConfig[networkPurpose].avax.keysConfig,
          mnemonic,
          false
        ),
      }),
      avaxP: getAvaxItemHandlers({
        networkPurpose,
        derivationType: "avaxP",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("avaxP", derivationConfigs) ??
            avaxConfig[networkPurpose].avax.keysConfig,
          mnemonic,
          false
        ),
      }),
    };

    this.handlers = getNetworkHandlers(derivationConfigs, keysDerivationHandlers);
  }

  public deriveItemFromMnemonic({
    derivationPath,
    derivationType,
  }: DeriveItemFromMnemonicParameters<AvaxDerivationTypeUnion>): DerivedItem<AvaxDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers(derivationType);

    return derivationHandlers.deriveItemFromMnemonic({ derivationPath });
  }

  public getCredentialFromPrivateKey({
    derivationType,
    privateKey,
  }: GetCredentialFromPrivateKeyParameters<AvaxDerivationTypeUnion>): DerivedCredential<AvaxDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers(derivationType);

    return derivationHandlers.getCredentialFromPrivateKey({ privateKey });
  }

  public deriveItemsBatchFromMnemonic({
    derivationType,
    ...parameters
  }: DeriveItemsBatchFromMnemonicParameters<AvaxDerivationTypeUnion>) {
    const derivationHandlers = this.getDerivationHandlers(derivationType);

    return derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public checkIfPrivateKeyBelongsToMnemonic(
    parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<AvaxDerivationTypeUnion>
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.checkIfPrivateKeyBelongsToMnemonic(parameters)) return true;
    }

    return false;
  }

  private getDerivationHandlers(
    derivationType: AvaxDerivationTypeUnion
  ): Handlers[AvaxDerivationTypeUnion] | never {
    const derivationHandlers = this.handlers[derivationType];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Avax };
