import { CommonBipKeyDerivation } from "@/modules/key-derivation/index.js";
import { trxConfig } from "@/modules/network/libs/modules/config/index.js";
import type {
  DeriveItemFromMnemonicParameters,
  GetCredentialFromPrivateKeyParameters,
  AbstractNetwork,
  ConstructorParameters,
  DeriveItemsBatchFromMnemonicParameters,
  CheckIfPrivateKeyBelongsToMnemonicParameters,
  DerivedCredential,
  DerivedItem,
  NetworkHandlers,
} from "@/modules/network/libs/types/index.js";
import { ExceptionMessage } from "@/modules/network/libs/enums/index.js";
import { getTrxDerivationHandlers } from "./libs/helpers/index.js";
import { findCustomConfig, getNetworkHandlers } from "@/modules/network/libs/helpers/index.js";
import { BtcDerivationTypeUnion } from "@/libs/types/index.js";

class Trx implements AbstractNetwork<"trxBase"> {
  private handlers: NonNullable<Partial<NetworkHandlers<"trxBase">>>;

  public constructor({ derivationConfigs, mnemonic }: ConstructorParameters<"trxBase">) {
    const networkHandlers: NetworkHandlers<"trxBase"> = {
      trxBase: getTrxDerivationHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("trxBase", derivationConfigs) ?? trxConfig.trxBase.prefixConfig,
          mnemonic,
          false,
        ),
      }),
    };

    this.handlers = getNetworkHandlers(derivationConfigs, networkHandlers);
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"trxBase">,
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
    parameters: DeriveItemsBatchFromMnemonicParameters<"trxBase">,
  ): DerivedItem<BtcDerivationTypeUnion>[] {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public checkIfPrivateKeyBelongsToMnemonic(
    parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<"trxBase">,
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.checkIfPrivateKeyBelongsToMnemonic(parameters)) return true;
    }

    return false;
  }

  private getDerivationHandlers(): NetworkHandlers<"trxBase">["trxBase"] | never {
    const derivationHandlers = this.handlers["trxBase"];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Trx };
