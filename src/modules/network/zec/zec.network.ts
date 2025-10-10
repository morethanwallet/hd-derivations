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
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Zec implements AbstractNetwork<"zecTransparent"> {
  private derivationHandlers: DerivationsHandlers<"zecTransparent">["zecTransparent"];

  public constructor({ mnemonic, derivationConfig }: ConstructorParameters<"zecTransparent">) {
    const { networkPurpose, derivationType } = derivationConfig;
    const secp256k1Curve = new Secp256k1Curve();

    const derivationsHandlers: DerivationsHandlers<"zecTransparent"> = {
      zecTransparent: getTransparentDerivationHandlers({
        keysDerivationInstance: new TransparentKeyDerivation(
          mnemonic,
          findCustomPrefixConfig("zecTransparent", derivationConfig) ??
            zecConfig[networkPurpose].zecTransparent.prefixConfig,
          secp256k1Curve,
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
