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
import { getDotDerivationHandlers } from "./libs/helpers/index.js";
import { type DerivationTypeMap } from "@/libs/types/index.js";

class Dot implements AbstractNetwork<DerivationTypeMap["dotBase"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeMap["dotBase"]
  >[DerivationTypeMap["dotBase"]];

  public constructor({
    derivationConfig: { ss58Format },
    mnemonic,
  }: ConstructorParameters<DerivationTypeMap["dotBase"]>) {
    this.derivationHandlers = getDotDerivationHandlers({
      ss58Format,
      keysDerivationInstance: new CommonEd25519KeyDerivation(mnemonic),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeMap["dotBase"]>,
  ): DerivedItem<DerivationTypeMap["dotBase"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeMap["dotBase"]>,
  ): DerivedCredential<DerivationTypeMap["dotBase"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeMap["dotBase"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeMap["dotBase"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Dot };
