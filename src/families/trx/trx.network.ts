import { CommonBipKeyDerivation } from "@/keyDerivation/index.js";
import { trxConfig } from "@/config/index.js";
import {
  type DeriveItemFromMnemonicParameters,
  type GetCredentialFromPrivateKeyParameters,
  type AbstractNetwork,
  type ConstructorParameters,
  type DeriveItemsBatchFromMnemonicParameters,
  type CheckIfPrivateKeyBelongsToMnemonicParameters,
  type DerivedCredential,
  type DerivedItem,
  type DerivationHandlers,
} from "../types/index.js";
import { ExceptionMessage } from "../exceptions/index.js";
import { getTrxItemHandlers } from "./helpers/index.js";
import { type Handlers } from "./types/index.js";
import { findCustomConfig, getNetworkHandlers } from "../helpers/index.js";
import { BtcDerivationTypeUnion } from "@/types/derivation/index.js";

class Trx implements AbstractNetwork<"trxBase"> {
  private handlers: NonNullable<Partial<Handlers>>;

  public constructor({ derivationConfigs, mnemonic }: ConstructorParameters<"trxBase">) {
    const keysDerivationHandlers: DerivationHandlers<"trxBase"> = {
      trxBase: getTrxItemHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("trxBase", derivationConfigs) ?? trxConfig.trxBase.keysConfig,
          mnemonic,
          false
        ),
      }),
    };

    this.handlers = getNetworkHandlers(derivationConfigs, keysDerivationHandlers);
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"trxBase">
  ): DerivedItem<BtcDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPrivateKey({
    privateKey,
  }: GetCredentialFromPrivateKeyParameters<"trxBase">): DerivedCredential<BtcDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.getCredentialFromPrivateKey({ privateKey });
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"trxBase">
  ): DerivedItem<BtcDerivationTypeUnion>[] {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public checkIfPrivateKeyBelongsToMnemonic(
    parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<"trxBase">
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.checkIfPrivateKeyBelongsToMnemonic(parameters)) return true;
    }

    return false;
  }

  private getDerivationHandlers(): Handlers["trxBase"] | never {
    const derivationHandlers = this.handlers["trxBase"];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Trx };
