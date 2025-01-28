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
import { findCustomConfig } from "@/modules/network/libs/helpers/index.js";
import type { DerivationTypeMap } from "@/libs/types/index.js";

class Trx implements AbstractNetwork<DerivationTypeMap["trxBase"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeMap["trxBase"]
  >[DerivationTypeMap["trxBase"]];

  public constructor({ derivationConfig, mnemonic }: ConstructorParameters<"trxBase">) {
    const derivationsHandlers: DerivationsHandlers<"trxBase"> = {
      trxBase: getTrxDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("trxBase", derivationConfig) ?? trxConfig.trxBase.prefixConfig,
          mnemonic,
          false,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationConfig.derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeMap["trxBase"]>,
  ): DerivedItem<DerivationTypeMap["trxBase"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeMap["trxBase"]>,
  ): DerivedCredential<DerivationTypeMap["trxBase"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeMap["trxBase"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKeyBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeMap["trxBase"]>,
  ) {
    return this.derivationHandlers.doesPKeyBelongToMnemonic(parameters);
  }
}

export { Trx };
