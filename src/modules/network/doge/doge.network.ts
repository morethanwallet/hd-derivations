import { CommonBipKeyDerivation } from "@/libs/modules/key-derivation/index.js";
import { dogeConfig } from "@/modules/network/libs/modules/config/index.js";
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
import { getLegacyDerivationHandlers } from "./libs/helpers/index.js";
import { findCustomPrefixConfig } from "@/modules/network/libs/helpers/index.js";
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Doge implements AbstractNetwork<"dogeLegacy"> {
  private derivationHandlers: DerivationsHandlers<"dogeLegacy">["dogeLegacy"];

  public constructor({ mnemonic, derivationConfig }: ConstructorParameters<"dogeLegacy">) {
    const secp256k1Curve = new Secp256k1Curve();

    this.derivationHandlers = getLegacyDerivationHandlers({
      keysDerivationInstance: new CommonBipKeyDerivation(
        findCustomPrefixConfig("dogeLegacy", derivationConfig) ??
          dogeConfig[derivationConfig.networkPurpose].dogeLegacy.prefixConfig,
        mnemonic,
        secp256k1Curve,
      ),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"dogeLegacy">,
  ): DerivedItem<"dogeLegacy"> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<"dogeLegacy">,
  ): DerivedCredential<"dogeLegacy"> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"dogeLegacy">,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(parameters: DoesPKBelongToMnemonicParameters<"dogeLegacy">) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Doge };
