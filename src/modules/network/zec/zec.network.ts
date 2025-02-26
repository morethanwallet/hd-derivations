import { zecConfig } from "@/modules/network/libs/modules/config/index.js";
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
import { getTransparentDerivationHandlers } from "./libs/helpers/index.js";
import { findCustomPrefixConfig } from "@/modules/network/libs/helpers/index.js";
import { TransparentKeyDerivation } from "@/libs/modules/key-derivation/index.js";

class Zec implements AbstractNetwork<"zecTransparent"> {
  private derivationHandlers: DerivationsHandlers<"zecTransparent">["zecTransparent"];

  public constructor({ mnemonic, derivationConfig }: ConstructorParameters<"zecTransparent">) {
    const { networkPurpose, derivationType } = derivationConfig;

    const derivationsHandlers: DerivationsHandlers<"zecTransparent"> = {
      zecTransparent: getTransparentDerivationHandlers({
        keysDerivationInstance: new TransparentKeyDerivation(
          findCustomPrefixConfig("zecTransparent", derivationConfig) ??
            zecConfig[networkPurpose].zecTransparent.prefixConfig,
          mnemonic,
        ),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<"zecTransparent">,
  ): DerivedItem<"zecTransparent"> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<"zecTransparent">,
  ): DerivedCredential<"zecTransparent"> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<"zecTransparent">,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(parameters: DoesPKBelongToMnemonicParameters<"zecTransparent">) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Zec };
