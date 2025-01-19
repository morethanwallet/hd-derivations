import {
  type AbstractNetwork,
  type DeriveItemFromMnemonicParameters,
  type ConstructorParameters,
  type GetCredentialFromPrivateKeyParameters,
  DeriveItemsBatchFromMnemonicParameters,
} from "../types/index.js";
import {
  type AvaxDerivationTypeUnion,
  type DerivedCredential,
  type DerivedItem,
} from "@/types/index.js";
import { type Handlers } from "./types/index.js";
import { getAvaxItemHandlers } from "./helpers/getItemHandlers.helper.js";
import { CommonBipKeyDerivation } from "@/keyDerivation/index.js";
import { findCustomConfig } from "../helpers/index.js";
import { avaxConfig } from "@/config/index.js";
import { ExceptionMessage } from "../exceptions/index.js";

class Avax implements AbstractNetwork<AvaxDerivationTypeUnion> {
  public handlers: Partial<Handlers>;

  public constructor({
    derivationConfigs,
    mnemonic,
    networkPurpose,
  }: ConstructorParameters<AvaxDerivationTypeUnion>) {
    const isMainnet = networkPurpose === "mainnet";

    const keysDerivationHandlers = {
      avaxX: getAvaxItemHandlers({
        isMainnet,
        derivationType: "avaxX",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("p2wshInP2sh", derivationConfigs) ??
            avaxConfig[networkPurpose].avax.keysConfig,
          mnemonic
        ),
      }),
      avaxP: getAvaxItemHandlers({
        isMainnet,
        derivationType: "avaxP",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("p2wshInP2sh", derivationConfigs) ??
            avaxConfig[networkPurpose].avax.keysConfig,
          mnemonic
        ),
      }),
    };

    this.handlers = Object.fromEntries(
      derivationConfigs.map(({ derivationType }) => {
        return [derivationType, keysDerivationHandlers[derivationType]];
      })
    );
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

  private getDerivationHandlers(
    derivationType: AvaxDerivationTypeUnion
  ): Handlers[AvaxDerivationTypeUnion] | never {
    const derivationHandlers = this.handlers[derivationType];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Avax };
