import {
  SolBaseKeyDerivation,
  SolExodusKeyDerivation,
} from "@/libs/modules/key-derivation/networks.js";
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
import {
  getSolBaseDerivationHandlers,
  getSolExodusDerivationHandlers,
} from "./libs/helpers/helpers.js";
import { Ed25519Curve, Secp256k1Curve } from "@/libs/modules/curves/curves.js";
import { type DerivationTypeUnionByNetwork } from "@/libs/types/types.js";

class Sol implements AbstractNetwork<DerivationTypeUnionByNetwork["sol"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeUnionByNetwork["sol"]
  >[DerivationTypeUnionByNetwork["sol"]];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<DerivationTypeUnionByNetwork["sol"]>) {
    const ed25519Curve = new Ed25519Curve();
    const secp256k1Curve = new Secp256k1Curve();

    const derivationHandlers: DerivationsHandlers<DerivationTypeUnionByNetwork["sol"]> = {
      solBase: getSolBaseDerivationHandlers({
        keysDerivationInstance: new SolBaseKeyDerivation(mnemonic, ed25519Curve),
      }),
      solExodus: getSolExodusDerivationHandlers({
        keysDerivationInstance: new SolExodusKeyDerivation(mnemonic, ed25519Curve, secp256k1Curve),
      }),
    };

    this.derivationHandlers = derivationHandlers[derivationConfig.derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeUnionByNetwork["sol"]>,
  ): DerivedItem<DerivationTypeUnionByNetwork["sol"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeUnionByNetwork["sol"]>,
  ): DerivedCredential<DerivationTypeUnionByNetwork["sol"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeUnionByNetwork["sol"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeUnionByNetwork["sol"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Sol };
