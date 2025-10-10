import { SolKeyDerivation } from "@/libs/modules/key-derivation/index.js";
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
import { getSolDerivationHandlers } from "./libs/helpers/index.js";
import { Ed25519Curve } from "@/libs/modules/curves/curves.js";

class Sol implements AbstractNetwork<"solBase"> {
  private derivationHandlers: DerivationsHandlers<"solBase">["solBase"];

  public constructor({ mnemonic }: ConstructorParameters<"solBase">) {
    const ed25519Curve = new Ed25519Curve();

    this.derivationHandlers = getSolDerivationHandlers({
      keysDerivationInstance: new SolKeyDerivation(mnemonic, ed25519Curve),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"solBase">,
  ): DerivedItem<"solBase"> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<"solBase">,
  ): DerivedCredential<"solBase"> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"solBase">,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(parameters: DoesPKBelongToMnemonicParameters<"solBase">) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Sol };
