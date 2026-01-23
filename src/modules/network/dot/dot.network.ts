import {
  CommonEd25519KeyDerivation,
  DotBaseKeyDerivation,
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
import {
  getBaseDerivationHandlers,
  getStandardHdDerivationHandlers,
} from "./libs/helpers/index.js";
import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";
import { Ed25519Curve } from "@/libs/modules/curves/curves.js";

class Dot implements AbstractNetwork<DerivationTypeUnionByNetwork["dot"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeUnionByNetwork["dot"]
  >[DerivationTypeUnionByNetwork["dot"]];

  public constructor({
    derivationConfig: { ss58Format, derivationType, scheme },
    mnemonic,
    dotMnemonic,
  }: ConstructorParameters<DerivationTypeUnionByNetwork["dot"]>) {
    const ed25519Curve = new Ed25519Curve();

    const derivationHandlers: DerivationsHandlers<DerivationTypeUnionByNetwork["dot"]> = {
      dotStandardHd: getStandardHdDerivationHandlers({
        ss58Format,
        keysDerivationInstance: new CommonEd25519KeyDerivation(mnemonic, ed25519Curve),
      }),
      dotBase: getBaseDerivationHandlers({
        scheme,
        ss58Format,
        keysDerivationInstance: new DotBaseKeyDerivation(dotMnemonic),
      }),
    };

    this.derivationHandlers = derivationHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeUnionByNetwork["dot"]>,
  ): DerivedItem<DerivationTypeUnionByNetwork["dot"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeUnionByNetwork["dot"]>,
  ): DerivedCredential<DerivationTypeUnionByNetwork["dot"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeUnionByNetwork["dot"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeUnionByNetwork["dot"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Dot };
