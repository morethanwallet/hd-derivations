import { EvmKeyDerivation } from "@/libs/modules/key-derivation/index.js";
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
import { getEvmDerivationHandlers } from "./libs/helpers/index.js";
import { evmConfig } from "../libs/modules/config/index.js";

class Evm implements AbstractNetwork<"evmBase"> {
  private derivationHandlers: DerivationsHandlers<"evmBase">["evmBase"];

  public constructor({
    mnemonic,
    derivationConfig: { prefixConfig },
  }: ConstructorParameters<"evmBase">) {
    this.derivationHandlers = getEvmDerivationHandlers({
      keysDerivationInstance: new EvmKeyDerivation(
        prefixConfig ?? evmConfig.prefixConfig,
        mnemonic,
      ),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"evmBase">,
  ): DerivedItem<"evmBase"> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<"evmBase">,
  ): DerivedCredential<"evmBase"> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"evmBase">,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(parameters: DoesPKBelongToMnemonicParameters<"evmBase">) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Evm };
