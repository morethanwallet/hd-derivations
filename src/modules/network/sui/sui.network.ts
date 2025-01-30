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
import { DerivationTypeMap } from "@/libs/types/index.js";

class Sui implements AbstractNetwork<DerivationTypeMap["suiBase"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeMap["suiBase"]
  >[DerivationTypeMap["suiBase"]];

  public constructor({
    mnemonic,
    derivationConfig: { derivationType, scheme },
  }: ConstructorParameters<DerivationTypeMap["suiBase"]>) {
    const derivationsHandlers: DerivationsHandlers<DerivationTypeMap["suiBase"]> = {
      suiBase: getSuiDerivationHandlers({
        scheme,
        keysDerivationInstance: new SuiKeyDerivation(mnemonic),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeMap["suiBase"]>,
  ): DerivedItem<DerivationTypeMap["suiBase"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeMap["suiBase"]>,
  ): DerivedCredential<DerivationTypeMap["suiBase"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeMap["suiBase"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKeyBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeMap["suiBase"]>,
  ) {
    return this.derivationHandlers.doesPKeyBelongToMnemonic(parameters);
  }
}

export { Sui };
