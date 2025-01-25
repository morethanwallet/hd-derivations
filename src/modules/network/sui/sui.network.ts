import { SuiKeyDerivation } from "@/modules/keyDerivation/index.js";
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
import { getSuiDerivationHandlers } from "./libs/helpers/index.js";
import { getNetworkHandlers } from "@/modules/network/libs/helpers/index.js";

class Sui implements AbstractNetwork<"suiBase"> {
  private handlers: NonNullable<Partial<NetworkHandlers<"suiBase">>>;

  public constructor({ derivationConfigs, mnemonic, scheme }: ConstructorParameters<"suiBase">) {
    const networkHandlers: NetworkHandlers<"suiBase"> = {
      suiBase: getSuiDerivationHandlers({
        scheme,
        keysDerivationInstance: new SuiKeyDerivation(mnemonic),
      }),
    };

    this.handlers = getNetworkHandlers(derivationConfigs, networkHandlers);
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"suiBase">,
  ): DerivedItem<"suiBase"> {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPrivateKey(
    parameters: GetCredentialFromPrivateKeyParameters<"suiBase">,
  ): DerivedCredential<"suiBase"> {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.getCredentialFromPrivateKey(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"suiBase">,
  ): DerivedItem<"suiBase">[] {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public checkIfPrivateKeyBelongsToMnemonic(
    parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<"suiBase">,
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.checkIfPrivateKeyBelongsToMnemonic(parameters)) return true;
    }

    return false;
  }

  private getDerivationHandlers(): NetworkHandlers<"suiBase">["suiBase"] | never {
    const derivationHandlers = this.handlers.suiBase;

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Sui };
