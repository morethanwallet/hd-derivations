import { BnbKeyDerivation } from "@/libs/modules/key-derivation/networks.js";
import type {
  ConstructorParameters,
  AbstractNetwork,
  DerivationsHandlers,
  DerivedCredential,
  DerivedItem,
  DeriveItemFromMnemonicParameters,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  GetCredentialFromPKParameters,
} from "../libs/types/index.js";
import { getBnbDerivationHandlers } from "./libs/helpers/index.js";
import { bnbConfig } from "../libs/modules/config/index.js";
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Bnb implements AbstractNetwork<"bnbBase"> {
  private derivationHandlers: DerivationsHandlers<"bnbBase">["bnbBase"];

  public constructor({ mnemonic, derivationConfig }: ConstructorParameters<"bnbBase">) {
    const secp256k1Curve = new Secp256k1Curve();

    this.derivationHandlers = getBnbDerivationHandlers({
      keysDerivationInstance: new BnbKeyDerivation(
        mnemonic,
        secp256k1Curve,
        derivationConfig?.prefixConfig ?? bnbConfig.prefixConfig,
      ),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"bnbBase">,
  ): DerivedItem<"bnbBase"> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<"bnbBase">,
  ): DerivedCredential<"bnbBase"> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"bnbBase">,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(parameters: DoesPKBelongToMnemonicParameters<"bnbBase">) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Bnb };
