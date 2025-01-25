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
  NetworkHandlers,
} from "@/modules/network/libs/types/index.js";
import { ExceptionMessage } from "@/modules/network/libs/enums/index.js";
import { getTonDerivationHandlers } from "./libs/helpers/index.js";
import { getNetworkHandlers } from "@/modules/network/libs/helpers/index.js";
import { BtcDerivationTypeUnion } from "@/libs/types/index.js";

class Ton implements AbstractNetwork<"tonBase"> {
  private handlers: NonNullable<Partial<NetworkHandlers<"tonBase">>>;

  public constructor({ derivationConfigs, mnemonic }: ConstructorParameters<"tonBase">) {
    const networkHandlers: NetworkHandlers<"tonBase"> = {
      tonBase: getTonDerivationHandlers({
        keysDerivationInstance: new TonKeyDerivation(mnemonic),
      }),
    };

    this.handlers = getNetworkHandlers(derivationConfigs, networkHandlers);
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"tonBase">,
  ): DerivedItem<BtcDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPrivateKey(
    parameters: GetCredentialFromPrivateKeyParameters<"tonBase">,
  ): DerivedCredential<BtcDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.getCredentialFromPrivateKey(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"tonBase">,
  ): DerivedItem<BtcDerivationTypeUnion>[] {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public checkIfPrivateKeyBelongsToMnemonic(
    parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<"tonBase">,
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.checkIfPrivateKeyBelongsToMnemonic(parameters)) return true;
    }

    return false;
  }

  private getDerivationHandlers(): NetworkHandlers<"tonBase">["tonBase"] | never {
    const derivationHandlers = this.handlers["tonBase"];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Ton };
