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
import type { AptDerivationTypeUnion } from "@/libs/types/index.js";

class Apt implements AbstractNetwork<AptDerivationTypeUnion> {
  private derivationHandlers: DerivationsHandlers<AptDerivationTypeUnion>[AptDerivationTypeUnion];

  public constructor({
    mnemonic,
    derivationConfig: { algorithm, authenticationScheme, derivationType },
  }: ConstructorParameters<AptDerivationTypeUnion>) {
    this.derivationHandlers = getAptDerivationHandlers({
      algorithm,
      isLegacy: derivationType === "aptLegacy",
      isMultiSig: authenticationScheme === "multiSig",
      keysDerivationInstance: new AptKeyDerivation(mnemonic),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<AptDerivationTypeUnion>,
  ): DerivedItem<AptDerivationTypeUnion> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<AptDerivationTypeUnion>,
  ): DerivedCredential<AptDerivationTypeUnion> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<AptDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<AptDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Apt };
