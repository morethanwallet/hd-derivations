import {
  SolBaseKeyDerivation,
  SolExodusKeyDerivation,
} from "@/libs/modules/key-derivation/index.js";
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
import { getSolDerivationHandlers, getSolExodusDerivationHandlers } from "./libs/helpers/index.js";
import { Ed25519Curve, Secp256k1Curve } from "@/libs/modules/curves/curves.js";
import { type SolDerivationTypeUnion } from "@/libs/types/types.js";

class Sol implements AbstractNetwork<SolDerivationTypeUnion> {
  private derivationHandlers: DerivationsHandlers<SolDerivationTypeUnion>[SolDerivationTypeUnion];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<SolDerivationTypeUnion>) {
    const ed25519Curve = new Ed25519Curve();
    const secp256k1Curve = new Secp256k1Curve();

    const derivationHandlers: DerivationsHandlers<SolDerivationTypeUnion> = {
      solBase: getSolDerivationHandlers({
        keysDerivationInstance: new SolBaseKeyDerivation(mnemonic, ed25519Curve),
      }),
      solExodus: getSolExodusDerivationHandlers({
        keysDerivationInstance: new SolExodusKeyDerivation(mnemonic, ed25519Curve, secp256k1Curve),
      }),
    };

    this.derivationHandlers = derivationHandlers[derivationConfig.derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<SolDerivationTypeUnion>,
  ): DerivedItem<SolDerivationTypeUnion> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<SolDerivationTypeUnion>,
  ): DerivedCredential<SolDerivationTypeUnion> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<SolDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<SolDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Sol };
