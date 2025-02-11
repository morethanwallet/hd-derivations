import { BnbKeyDerivation } from "@/libs/modules/key-derivation/index.js";
import type {
  ConstructorParameters,
  AbstractNetwork,
  DerivationsHandlers,
  DerivedCredential,
  DerivedItem,
  DeriveItemFromMnemonicParameters,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  GetCredentialFromPKParameters,
} from "../libs/types/index.js";
import { getBnbDerivationHandlers } from "./libs/helpers/index.js";
import { bnbConfig } from "../libs/modules/config/index.js";

class Bnb implements AbstractNetwork<"bnbBase"> {
  private derivationHandlers: DerivationsHandlers<"bnbBase">["bnbBase"];

  public constructor({ mnemonic, derivationConfig }: ConstructorParameters<"bnbBase">) {
    this.derivationHandlers = getBnbDerivationHandlers({
      keysDerivationInstance: new BnbKeyDerivation(
        derivationConfig.prefixConfig ?? bnbConfig.prefixConfig,
        mnemonic,
      ),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"bnbBase">,
  ): DerivedItem<"bnbBase"> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<"bnbBase">,
  ): DerivedCredential<"bnbBase"> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"bnbBase">,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(parameters: DoesPKBelongToMnemonicParameters<"bnbBase">) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Bnb };
