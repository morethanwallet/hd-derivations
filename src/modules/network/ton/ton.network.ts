import { TonKeyDerivation } from "@/modules/keyDerivation/index.js";
import type {
  DeriveItemFromMnemonicParameters,
  GetCredentialFromPrivateKeyParameters,
  AbstractNetwork,
  ConstructorParameters,
  DeriveItemsBatchFromMnemonicParameters,
  CheckIfPrivateKeyBelongsToMnemonicParameters,
  DerivedCredential,
  DerivedItem,
  DerivationHandlers,
  TonHandlers,
} from "@/modules/network/libs/types/index.js";
import { ExceptionMessage } from "@/modules/network/libs/enums/index.js";
import { getTonItemHandlers } from "./libs/helpers/index.js";
import { getNetworkHandlers } from "@/modules/network/libs/helpers/index.js";
import { BtcDerivationTypeUnion } from "@/libs/types/index.js";

class Ton implements AbstractNetwork<"tonBase"> {
  private handlers: NonNullable<Partial<TonHandlers>>;

  public constructor({ derivationConfigs, mnemonic }: ConstructorParameters<"tonBase">) {
    const derivationHandlers: DerivationHandlers<"tonBase"> = {
      tonBase: getTonItemHandlers({
        keysDerivationInstance: new TonKeyDerivation(mnemonic),
      }),
    };

    this.handlers = getNetworkHandlers(derivationConfigs, derivationHandlers);
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"tonBase">
  ): DerivedItem<BtcDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPrivateKey(
    parameters: GetCredentialFromPrivateKeyParameters<"tonBase">
  ): DerivedCredential<BtcDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.getCredentialFromPrivateKey(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"tonBase">
  ): DerivedItem<BtcDerivationTypeUnion>[] {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public checkIfPrivateKeyBelongsToMnemonic(
    parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<"tonBase">
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.checkIfPrivateKeyBelongsToMnemonic(parameters)) return true;
    }

    return false;
  }

  private getDerivationHandlers(): TonHandlers["tonBase"] | never {
    const derivationHandlers = this.handlers["tonBase"];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Ton };
