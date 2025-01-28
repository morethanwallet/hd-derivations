import { CommonEd25519KeyDerivation } from "@/libs/modules/key-derivation/index.js";
import type {
  DeriveItemFromMnemonicParameters,
  GetCredentialFromPKParameters,
  AbstractNetwork,
  ConstructorParameters,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
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
        keysDerivationInstance: new CommonEd25519KeyDerivation(mnemonic),
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

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<"tonBase">,
  ): DerivedCredential<BtcDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"tonBase">,
  ): DerivedItem<BtcDerivationTypeUnion>[] {
    const derivationHandlers = this.getDerivationHandlers();

    return derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKeyBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<"tonBase">,
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.doesPKeyBelongToMnemonic(parameters)) return true;
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
