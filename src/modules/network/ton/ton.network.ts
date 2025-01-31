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
import { type DerivationTypeMap } from "@/libs/types/index.js";

class Ton implements AbstractNetwork<DerivationTypeMap["tonBase"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeMap["tonBase"]
  >[DerivationTypeMap["tonBase"]];

  // TODO: Remove derivation type for chains with only 1 derivation type
  public constructor({
    derivationConfig,
    mnemonic,
  }: ConstructorParameters<DerivationTypeMap["tonBase"]>) {
    const { derivationType, ...addressParameters } = derivationConfig;

    this.derivationHandlers = getTonDerivationHandlers({
      ...addressParameters,
      keysDerivationInstance: new CommonEd25519KeyDerivation(mnemonic),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeMap["tonBase"]>,
  ): DerivedItem<DerivationTypeMap["tonBase"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeMap["tonBase"]>,
  ): DerivedCredential<DerivationTypeMap["tonBase"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeMap["tonBase"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeMap["tonBase"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Ton };
