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
import type { DerivationTypeMap } from "@/libs/types/index.js";

class Trx implements AbstractNetwork<DerivationTypeMap["trxBase"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeMap["trxBase"]
  >[DerivationTypeMap["trxBase"]];

  public constructor({
    mnemonic,
    derivationConfig: { derivationType, prefixConfig },
  }: ConstructorParameters<"trxBase">) {
    const derivationsHandlers: DerivationsHandlers<"trxBase"> = {
      trxBase: getTrxDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          prefixConfig ?? trxConfig.trxBase.prefixConfig,
          mnemonic,
          false,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
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

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeMap["trxBase"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Trx };
