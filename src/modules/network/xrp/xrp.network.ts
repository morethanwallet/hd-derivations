import type {
  AbstractNetwork,
  DerivationsHandlers,
  ConstructorParameters,
  DeriveItemFromMnemonicParameters,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  GetCredentialFromPKParameters,
} from "../libs/types/index.js";
import { getXrpDerivationHandlers } from "./libs/helpers/helpers.js";
import { findCustomPrefixConfig } from "../libs/helpers/helpers.js";
import { xrpConfig } from "../libs/modules/config/index.js";

import { CommonBipKeyDerivation } from "@/libs/modules/key-derivation/networks.js";
import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Xrp implements AbstractNetwork<DerivationTypeUnionByNetwork["xrp"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeUnionByNetwork["xrp"]
  >[DerivationTypeUnionByNetwork["xrp"]];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<DerivationTypeUnionByNetwork["xrp"]>) {
    const { derivationType, networkPurpose, destinationTag } = derivationConfig;
    const isTestnet = networkPurpose === "testnet";
    const secp256k1Curve = new Secp256k1Curve();

    const derivationsHandlers: DerivationsHandlers<DerivationTypeUnionByNetwork["xrp"]> = {
      xrpBase: getXrpDerivationHandlers({
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
      xrpX: getXrpDerivationHandlers({
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
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeUnionByNetwork["xrp"]>,
  ) {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeUnionByNetwork["xrp"]>,
  ) {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeUnionByNetwork["xrp"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeUnionByNetwork["xrp"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Xrp };
