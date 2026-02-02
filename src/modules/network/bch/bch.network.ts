import type {
  AbstractNetwork,
  DerivationsHandlers,
  ConstructorParameters,
  DeriveItemFromMnemonicParameters,
  DerivedCredential,
  DerivedItem,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  GetCredentialFromPKParameters,
} from "../libs/types/index.js";
import {
  getCashAddrDerivationHandlers,
  getLegacyDerivationHandlers,
} from "./libs/helpers/index.js";
import { findCustomPrefixConfig } from "../libs/helpers/helpers.js";
import { bchConfig } from "../libs/modules/config/index.js";

import { CommonBipKeyDerivation } from "@/libs/modules/key-derivation/networks.js";
import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Bch implements AbstractNetwork<DerivationTypeUnionByNetwork["bch"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeUnionByNetwork["bch"]
  >[DerivationTypeUnionByNetwork["bch"]];

  public constructor({
    mnemonic,
    derivationConfig,
  }: ConstructorParameters<DerivationTypeUnionByNetwork["bch"]>) {
    const { networkPurpose, derivationType } = derivationConfig;
    const secp256k1Curve = new Secp256k1Curve();

    const derivationsHandlers: DerivationsHandlers<DerivationTypeUnionByNetwork["bch"]> = {
      bchLegacy: getLegacyDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("bchLegacy", derivationConfig) ??
            bchConfig[networkPurpose].bchLegacy.prefixConfig,
          mnemonic,
          secp256k1Curve,
        ),
      }),
      bchCashAddr: getCashAddrDerivationHandlers({
        isRegtest: networkPurpose === "regtest",
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomPrefixConfig("bchCashAddr", derivationConfig) ??
            bchConfig[networkPurpose].bchCashAddr.prefixConfig,
          mnemonic,
          secp256k1Curve,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeUnionByNetwork["bch"]>,
  ): DerivedItem<DerivationTypeUnionByNetwork["bch"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeUnionByNetwork["bch"]>,
  ): DerivedCredential<DerivationTypeUnionByNetwork["bch"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeUnionByNetwork["bch"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeUnionByNetwork["bch"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Bch };
