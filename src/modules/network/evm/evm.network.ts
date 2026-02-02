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

import { EvmKeyDerivation } from "@/libs/modules/key-derivation/networks.js";
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Evm implements AbstractNetwork<"evmBase"> {
  private derivationHandlers: DerivationsHandlers<"evmBase">["evmBase"];

  public constructor({ mnemonic, derivationConfig }: ConstructorParameters<"evmBase">) {
    const secp256k1Curve = new Secp256k1Curve();

    this.derivationHandlers = getEvmDerivationHandlers({
      keysDerivationInstance: new EvmKeyDerivation(
        derivationConfig?.prefixConfig ?? evmConfig.prefixConfig,
        mnemonic,
        secp256k1Curve,
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
