import {
  CommonEd25519KeyDerivation,
  DotKeyDerivation,
} from "@/libs/modules/key-derivation/index.js";
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
import {
  getBaseDerivationHandlers,
  getStandardHdDerivationHandlers,
} from "./libs/helpers/index.js";
import type { DotDerivationTypeUnion } from "@/libs/types/index.js";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { NetworkError } from "../libs/exceptions/index.js";
import { ExceptionMessage } from "../libs/enums/index.js";

class Dot implements AbstractNetwork<DotDerivationTypeUnion> {
  public static async create(
    parameters: ConstructorParameters<DotDerivationTypeUnion>,
  ): Promise<Dot> {
    try {
      // Initialization is necessary for the @polkadot/util-crypto WASM package to work correctly
      await cryptoWaitReady();
      return new Dot(parameters);
    } catch (error) {
      console.error("Polkadot WASM initialization failed:", error);
      throw new NetworkError(ExceptionMessage.NETWORK_INITIALIZATION_FAILED);
    }
  }

  private derivationHandlers: DerivationsHandlers<DotDerivationTypeUnion>[DotDerivationTypeUnion];

  public constructor({
    derivationConfig: { ss58Format, derivationType, scheme },
    mnemonic,
    dotMnemonic,
  }: ConstructorParameters<DotDerivationTypeUnion>) {
    const derivationHandlers: DerivationsHandlers<DotDerivationTypeUnion> = {
      dotStandardHd: getStandardHdDerivationHandlers({
        ss58Format,
        keysDerivationInstance: new CommonEd25519KeyDerivation(mnemonic),
      }),
      dotBase: getBaseDerivationHandlers({
        scheme,
        ss58Format,
        keysDerivationInstance: new DotKeyDerivation(dotMnemonic),
      }),
    };

    this.derivationHandlers = derivationHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DotDerivationTypeUnion>,
  ): DerivedItem<DotDerivationTypeUnion> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DotDerivationTypeUnion>,
  ): DerivedCredential<DotDerivationTypeUnion> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DotDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DotDerivationTypeUnion>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Dot };
