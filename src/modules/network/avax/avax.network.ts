import type {
  AbstractNetwork,
  DeriveItemFromMnemonicParameters,
  ConstructorParameters,
  GetCredentialFromPrivateKeyParameters,
  DeriveItemsBatchFromMnemonicParameters,
  CheckIfPrivateKeyBelongsToMnemonicParameters,
  DerivedCredential,
  DerivedItem,
  NetworkHandlers,
} from "@/modules/network/libs/types/index.js";
import { getAvaxDerivationHandlers } from "./libs/helpers/index.js";
import { CommonBipKeyDerivation } from "@/modules/keyDerivation/index.js";
import { findCustomConfig, getNetworkHandlers } from "@/modules/network/libs/helpers/index.js";
import { ExceptionMessage } from "@/modules/network/libs/enums/index.js";
import { type AvaxDerivationTypeUnion } from "@/libs/types/index.js";
import { avaxConfig } from "@/modules/network/libs/modules/config/index.js";

class Avax implements AbstractNetwork<AvaxDerivationTypeUnion> {
  private handlers: Partial<NetworkHandlers<AvaxDerivationTypeUnion>>;

  public constructor({
    derivationConfigs,
    mnemonic,
    networkPurpose,
  }: ConstructorParameters<AvaxDerivationTypeUnion>) {
    const networkHandlers: NetworkHandlers<AvaxDerivationTypeUnion> = {
      avaxX: getAvaxDerivationHandlers({
        networkPurpose,
        derivationType: "avaxX",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("avaxX", derivationConfigs) ??
            avaxConfig[networkPurpose].avax.prefixConfig,
          mnemonic,
          false,
        ),
      }),
      avaxP: getAvaxDerivationHandlers({
        networkPurpose,
        derivationType: "avaxP",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("avaxP", derivationConfigs) ??
            avaxConfig[networkPurpose].avax.prefixConfig,
          mnemonic,
          false,
        ),
      }),
    };

    this.handlers = getNetworkHandlers(derivationConfigs, networkHandlers);
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
    parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<AvaxDerivationTypeUnion>,
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.checkIfPrivateKeyBelongsToMnemonic(parameters)) return true;
    }

    return false;
  }

  private getDerivationHandlers(
    derivationType: AvaxDerivationTypeUnion,
  ): NetworkHandlers<AvaxDerivationTypeUnion>[AvaxDerivationTypeUnion] | never {
    const derivationHandlers = this.handlers[derivationType];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Avax };
