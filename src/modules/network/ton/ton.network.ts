import {
  getTonBaseDerivationHandlers,
  getTonExodusDerivationHandlers,
} from "./libs/helpers/helpers.js";

import {
  CommonEd25519KeyDerivation,
  TonExodusKeyDerivation,
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
import { Ed25519Curve, Secp256k1Curve } from "@/libs/modules/curves/curves.js";
import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";

class Ton implements AbstractNetwork<DerivationTypeUnionByNetwork["ton"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeUnionByNetwork["ton"]
  >[DerivationTypeUnionByNetwork["ton"]];

  public constructor({
    derivationConfig,
    mnemonic,
  }: ConstructorParameters<DerivationTypeUnionByNetwork["ton"]>) {
    const { derivationType, ...addressParameters } = derivationConfig;
    const ed25519Curve = new Ed25519Curve(); // TODO: Export already initialized curves
    const secp256k1Curve = new Secp256k1Curve();

    const derivationHandlers: DerivationsHandlers<DerivationTypeUnionByNetwork["ton"]> = {
      tonBase: getTonBaseDerivationHandlers({
        ...addressParameters,
        keysDerivationInstance: new CommonEd25519KeyDerivation(mnemonic, ed25519Curve),
      }),
      tonExodus: getTonExodusDerivationHandlers({
        ...addressParameters,
        keysDerivationInstance: new TonExodusKeyDerivation(mnemonic, ed25519Curve, secp256k1Curve),
      }),
    };

    this.derivationHandlers = derivationHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeUnionByNetwork["ton"]>,
  ): DerivedItem<DerivationTypeUnionByNetwork["ton"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeUnionByNetwork["ton"]>,
  ): DerivedCredential<DerivationTypeUnionByNetwork["ton"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeUnionByNetwork["ton"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeUnionByNetwork["ton"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Ton };
