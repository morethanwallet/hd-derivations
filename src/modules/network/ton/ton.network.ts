import { CommonEd25519KeyDerivation } from "@/libs/modules/key-derivation/index.js";
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
import { getTonDerivationHandlers } from "./libs/helpers/index.js";

class Ton implements AbstractNetwork<"tonBase"> {
  private derivationHandlers: DerivationsHandlers<"tonBase">["tonBase"];

  // TODO: Remove derivation type for chains with only 1 derivation type
  public constructor({ derivationConfig, mnemonic }: ConstructorParameters<"tonBase">) {
    const { derivationType, ...addressParameters } = derivationConfig;

    this.derivationHandlers = getTonDerivationHandlers({
      ...addressParameters,
      keysDerivationInstance: new CommonEd25519KeyDerivation(mnemonic),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"tonBase">,
  ): DerivedItem<"tonBase"> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<"tonBase">,
  ): DerivedCredential<"tonBase"> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"tonBase">,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(parameters: DoesPKBelongToMnemonicParameters<"tonBase">) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Ton };
