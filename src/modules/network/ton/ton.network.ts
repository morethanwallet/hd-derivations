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

  public constructor({
    derivationConfig,
    mnemonic,
  }: ConstructorParameters<DerivationTypeMap["tonBase"]>) {
    const derivationsHandlers: DerivationsHandlers<DerivationTypeMap["tonBase"]> = {
      tonBase: getTonDerivationHandlers({
        keysDerivationInstance: new CommonEd25519KeyDerivation(mnemonic),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationConfig.derivationType];
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

  public doesPKeyBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeMap["tonBase"]>,
  ) {
    return this.derivationHandlers.doesPKeyBelongToMnemonic(parameters);
  }
}

export { Ton };
