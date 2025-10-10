import type {
  AbstractNetwork,
  DerivationsHandlers,
  ConstructorParameters,
  DerivedCredential,
  DerivedItem,
  DeriveItemFromMnemonicParameters,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  GetCredentialFromPKParameters,
} from "../libs/types/index.js";
import type { XrpDerivationTypeUnion } from "@/libs/types/index.js";
import { geXrpDerivationHandlers } from "./libs/helpers/index.js";
import { CommonBipKeyDerivation } from "@/libs/modules/key-derivation/index.js";
import { findCustomPrefixConfig } from "../libs/helpers/index.js";
import { xrpConfig } from "../libs/modules/config/index.js";
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Xrp implements AbstractNetwork<XrpDerivationTypeUnion> {
  private derivationHandlers: DerivationsHandlers<XrpDerivationTypeUnion>[XrpDerivationTypeUnion];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<XrpDerivationTypeUnion>) {
    const { derivationType, networkPurpose, destinationTag } = derivationConfig;
    const isTestnet = networkPurpose === "testnet";
    const secp256k1Curve = new Secp256k1Curve();

    const derivationsHandlers: DerivationsHandlers<XrpDerivationTypeUnion> = {
      xrpBase: geXrpDerivationHandlers({
        derivationType,
        isTestnet,
        destinationTag,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("bchLegacy", derivationConfig) ?? xrpConfig.prefixConfig,
          mnemonic,
          secp256k1Curve,
          false,
        ),
      }),
      xrpX: geXrpDerivationHandlers({
        derivationType,
        isTestnet,
        destinationTag,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("bchCashAddr", derivationConfig) ?? xrpConfig.prefixConfig,
          mnemonic,
          secp256k1Curve,
          false,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<XrpDerivationTypeUnion>,
  ): DerivedItem<XrpDerivationTypeUnion> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<XrpDerivationTypeUnion>,
  ): DerivedCredential<XrpDerivationTypeUnion> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<XrpDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<XrpDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Xrp };
