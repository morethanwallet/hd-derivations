import { SuiKeyDerivation } from "@/libs/modules/key-derivation/index.js";
import type {
  DeriveItemFromMnemonicParameters,
  GetCredentialFromPKParameters,
  AbstractNetwork,
  ConstructorParameters,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  DerivedCredential,
  DerivedItem,
  DerivationsHandlers,
} from "@/modules/network/libs/types/index.js";
import { getSuiDerivationHandlers } from "./libs/helpers/index.js";

class Sui implements AbstractNetwork<"suiBase"> {
  private derivationHandlers: DerivationsHandlers<"suiBase">["suiBase"];

  public constructor({ mnemonic, derivationConfig: { scheme } }: ConstructorParameters<"suiBase">) {
    this.derivationHandlers = getSuiDerivationHandlers({
      scheme,
      keysDerivationInstance: new SuiKeyDerivation(mnemonic),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"suiBase">,
  ): DerivedItem<"suiBase"> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<"suiBase">,
  ): DerivedCredential<"suiBase"> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"suiBase">,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(parameters: DoesPKBelongToMnemonicParameters<"suiBase">) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Sui };
