import { CommonBipKeyDerivation } from "@/libs/modules/key-derivation/index.js";
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
import { getTrxDerivationHandlers } from "./libs/helpers/index.js";

class Trx implements AbstractNetwork<"trxBase"> {
  private derivationHandlers: DerivationsHandlers<"trxBase">["trxBase"];

  public constructor({
    mnemonic,
    derivationConfig: { prefixConfig },
  }: ConstructorParameters<"trxBase">) {
    this.derivationHandlers = getTrxDerivationHandlers({
      keysDerivationInstance: new CommonBipKeyDerivation(
        prefixConfig ?? trxConfig.trxBase.prefixConfig,
        mnemonic,
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
