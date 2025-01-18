import {
  type AbstractNetwork,
  type DeriveItemFromMnemonicParameters,
  type ConstructorParameters,
  type GetCredentialFromPrivateKeyParameters,
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
    const keysDerivationHandlers = {
      avaxX: getAvaxItemHandlers(
        new CommonBipKeyDerivation(
          findCustomConfig("p2wshInP2sh", derivationConfigs) ??
            avaxConfig[networkPurpose].avax.keysConfig,
          mnemonic
        ),
        "avaxX"
      ),
      avaxP: getAvaxItemHandlers(
        new CommonBipKeyDerivation(
          findCustomConfig("p2wshInP2sh", derivationConfigs) ??
            avaxConfig[networkPurpose].avax.keysConfig,
          mnemonic
        ),
        "avaxP"
      ),
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
    isMainnet,
  }: DeriveItemFromMnemonicParameters<AvaxDerivationTypeUnion>): DerivedItem<AvaxDerivationTypeUnion> {
    const derivationHandler = this.getDerivationHandler(derivationType);

    return derivationHandler.deriveItemFromMnemonic({ derivationPath, isMainnet });
  }

  public getCredentialFromPrivateKey({
    derivationType,
    isMainnet,
    privateKey,
  }: GetCredentialFromPrivateKeyParameters<AvaxDerivationTypeUnion>): DerivedCredential<AvaxDerivationTypeUnion> {
    const derivationHandler = this.getDerivationHandler(derivationType);

    return derivationHandler.getCredentialFromPrivateKey({ privateKey, isMainnet });
  }

  private getDerivationHandler(
    derivationType: AvaxDerivationTypeUnion
  ): Handlers[AvaxDerivationTypeUnion] | never {
    const derivationHandler = this.handlers[derivationType];

    if (!derivationHandler) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandler;
  }
}

export { Avax };
