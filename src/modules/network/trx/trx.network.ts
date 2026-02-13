import { getTrxDerivationHandlers } from "./libs/helpers/helpers.js";

import { CommonBipKeyDerivation } from "@/libs/modules/key-derivation/networks.js";
import { trxConfig } from "@/modules/network/libs/modules/config/index.js";
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
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Trx implements AbstractNetwork<"trxBase"> {
  private derivationHandlers: DerivationsHandlers<"trxBase">["trxBase"];

  public constructor({
    mnemonic,
    derivationConfig: { prefixConfig },
  }: ConstructorParameters<"trxBase">) {
    const secp256k1Curve = new Secp256k1Curve();

    this.derivationHandlers = getTrxDerivationHandlers({
      keysDerivationInstance: new CommonBipKeyDerivation(
        prefixConfig ?? trxConfig.trxBase.prefixConfig,
        mnemonic,
        secp256k1Curve,
        false,
      ),
    });
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"trxBase">,
  ): DerivedItem<"trxBase"> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<"trxBase">,
  ): DerivedCredential<"trxBase"> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"trxBase">,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(parameters: DoesPKBelongToMnemonicParameters<"trxBase">) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Trx };
