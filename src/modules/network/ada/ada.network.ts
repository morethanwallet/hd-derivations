import type {
  DeriveItemFromMnemonicParameters,
  AbstractNetwork,
  ConstructorParameters,
  DeriveItemsBatchFromMnemonicParameters,
  DoesPKBelongToMnemonicParameters,
  DerivedItem,
  DerivedCredential,
  DerivationsHandlers,
  GetCredentialFromPKParameters,
} from "@/modules/network/libs/types/index.js";
import {
  getNetworkId,
  getEnterpriseDerivationHandlers,
  getRewardDerivationHandlers,
  getExodusDerivationHandlers,
  getBaseDerivationHandlers,
} from "./libs/helpers/index.js";
import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";
import {
  AdaBaseKeyDerivation,
  AdaCommonKeyDerivation,
} from "@/libs/modules/key-derivation/index.js";
import { AdaExodusKeyDerivation } from "@/libs/modules/key-derivation/networks/ada/ada-exodus-key-derivation.js";
import { Secp256k1Curve } from "@/libs/modules/curves/curves.js";

class Ada implements AbstractNetwork<DerivationTypeUnionByNetwork["ada"]> {
  private derivationHandlers: DerivationsHandlers<
    DerivationTypeUnionByNetwork["ada"]
  >[DerivationTypeUnionByNetwork["ada"]];

  public constructor({
    mnemonic,
    derivationConfig: { derivationType, networkPurpose },
  }: ConstructorParameters<DerivationTypeUnionByNetwork["ada"]>) {
    const networkId = getNetworkId(networkPurpose);
    const commonKeysDerivationInstance = new AdaCommonKeyDerivation(mnemonic);
    const secp256k1Curve = new Secp256k1Curve();

    const derivationsHandlers: DerivationsHandlers<DerivationTypeUnionByNetwork["ada"]> = {
      adaEnterprise: getEnterpriseDerivationHandlers({
        networkId,
        keysDerivationInstance: commonKeysDerivationInstance,
      }),
      adaReward: getRewardDerivationHandlers({
        networkId,
        keysDerivationInstance: commonKeysDerivationInstance,
      }),
      adaBase: getBaseDerivationHandlers({
        networkId,
        keysDerivationInstance: new AdaBaseKeyDerivation(mnemonic),
      }),
      adaExodus: getExodusDerivationHandlers({
        networkId,
        keysDerivationInstance: new AdaExodusKeyDerivation(mnemonic, secp256k1Curve),
      }),
    };

    this.derivationHandlers = derivationsHandlers[derivationType];
  }

  public deriveItemFromMnemonic(
    parameters: DeriveItemFromMnemonicParameters<DerivationTypeUnionByNetwork["ada"]>,
  ): DerivedItem<DerivationTypeUnionByNetwork["ada"]> {
    return this.derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPK(
    parameters: GetCredentialFromPKParameters<DerivationTypeUnionByNetwork["ada"]>,
  ): DerivedCredential<DerivationTypeUnionByNetwork["ada"]> {
    return this.derivationHandlers.getCredentialFromPK(parameters);
  }

  public deriveItemsBatchFromMnemonic(
    parameters: DeriveItemsBatchFromMnemonicParameters<DerivationTypeUnionByNetwork["ada"]>,
  ) {
    return this.derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  public doesPKBelongToMnemonic(
    parameters: DoesPKBelongToMnemonicParameters<DerivationTypeUnionByNetwork["ada"]>,
  ) {
    return this.derivationHandlers.doesPKBelongToMnemonic(parameters);
  }
}

export { Ada };
