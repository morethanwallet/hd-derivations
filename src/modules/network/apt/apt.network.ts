import { AptKeyDerivation } from "@/libs/modules/key-derivation/index.js";
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
import { getAptDerivationHandlers } from "./libs/helpers/index.js";
import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";

class Apt implements AbstractNetwork<DerivationTypeUnionByNetwork["apt"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeUnionByNetwork["apt"]
  >[DerivationTypeUnionByNetwork["apt"]];

  public constructor({
    mnemonic,
    derivationConfig: { scheme, authenticationScheme, derivationType },
  }: ConstructorParameters<DerivationTypeUnionByNetwork["apt"]>) {
    this.derivationHandlers = getAptDerivationHandlers({
      scheme,
      isLegacy: derivationType === "aptLegacy",
      isMultiSig: authenticationScheme === "multiSig",
      keysDerivationInstance: new AptKeyDerivation(mnemonic),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeUnionByNetwork["apt"]>,
  ): DerivedItem<DerivationTypeUnionByNetwork["apt"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeUnionByNetwork["apt"]>,
  ): DerivedCredential<DerivationTypeUnionByNetwork["apt"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeUnionByNetwork["apt"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeUnionByNetwork["apt"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Apt };
