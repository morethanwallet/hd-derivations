import {
  Credential,
  PrivateKey,
  BaseAddress,
  PublicKey,
} from "@emurgo/cardano-serialization-lib-nodejs";
import { type Mnemonic } from "@/mnemonic/index.js";
import { getCredential, getNetworkId } from "./helpers/index.js";
import { EnterpriseKeyDerivation } from "./enterpriseKeyDerivation.js";
import { RewardKeyDerivation } from "./rewardKeyDerivation.js";
import { type NetworkPurposeUnion } from "@/families/cardano/types/index.js";
import { type DerivationType } from "@/keyDerivation/enums/index.js";
import {
  type DerivedItem,
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
  type DerivedCredential,
} from "../types/index.js";
import { Keys } from "@/keys/cardano/index.js";

class BaseKeyDerivation
  extends Keys
  implements AbstractKeyDerivation<typeof DerivationType.ADA_BASE>
{
  private enterpriseAddress: EnterpriseKeyDerivation;
  private rewardAddress: RewardKeyDerivation;

  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);

    this.enterpriseAddress = new EnterpriseKeyDerivation(mnemonic);
    this.rewardAddress = new RewardKeyDerivation(mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
    networkPurpose,
  }: DeriveFromMnemonicParameters<typeof DerivationType.ADA_BASE>): DerivedItem<
    typeof DerivationType.ADA_BASE
  > {
    const derivedEnterpriseItem = this.enterpriseAddress.deriveFromMnemonic({
      derivationPath,
      networkPurpose,
    });

    const derivedRewardItem = this.rewardAddress.deriveFromMnemonic({
      derivationPath,
      networkPurpose,
    });
    const enterpriseCredential = getCredential(PublicKey.from_hex(derivedEnterpriseItem.publicKey));
    const rewardCredential = getCredential(PublicKey.from_hex(derivedRewardItem.publicKey));
    const address = this.getAddress(enterpriseCredential, rewardCredential, networkPurpose);

    return {
      address,
      enterpriseDerivationPath: derivedEnterpriseItem.derivationPath,
      enterprisePrivateKey: derivedEnterpriseItem.privateKey,
      enterprisePublicKey: derivedEnterpriseItem.publicKey,
      rewardDerivationPath: derivedRewardItem.derivationPath,
      rewardPrivateKey: derivedRewardItem.privateKey,
      rewardPublicKey: derivedRewardItem.publicKey,
    };
  }

  public importByPrivateKey({
    enterprisePrivateKey,
    rewardPrivateKey,
    networkPurpose,
  }: ImportByPrivateKeyParameters<typeof DerivationType.ADA_BASE>): DerivedCredential<
    typeof DerivationType.ADA_BASE
  > {
    // TODO: Replace with checkIfPrivateKeyBelongsToMnemonic
    // const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    // for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
    //   const incrementedDerivationPath = appendAddressToDerivationPath(
    //     derivationPathWithoutAddress,
    //     i
    //   );

    //   const data = this.deriveFromMnemonic({
    //     networkPurpose,
    //     derivationPath: incrementedDerivationPath,
    //   });

    //   if (
    //     data.enterprisePrivateKey === enterprisePrivateKey &&
    //     data.rewardPrivateKey === rewardPrivateKey
    //   ) {
    //     return data;
    //   }
    // }

    const rawEnterprisePublicKey = PrivateKey.from_hex(enterprisePrivateKey).to_public();
    const rawRewardPublicKey = PrivateKey.from_hex(rewardPrivateKey).to_public();
    const enterpriseCredential = getCredential(rawEnterprisePublicKey);
    const rewardCredential = getCredential(rawRewardPublicKey);
    const address = this.getAddress(enterpriseCredential, rewardCredential, networkPurpose);

    return {
      address,
      enterprisePrivateKey,
      rewardPrivateKey,
      enterprisePublicKey: rawEnterprisePublicKey.to_hex(),
      rewardPublicKey: rawRewardPublicKey.to_hex(),
    };
  }

  private getAddress(
    enterpriseCredential: Credential,
    rewardCredential: Credential,
    networkPurpose: NetworkPurposeUnion
  ): DerivedItem<typeof DerivationType.ADA_BASE>["address"] {
    const address = BaseAddress.new(
      getNetworkId(networkPurpose),
      enterpriseCredential,
      rewardCredential
    );

    return address.to_address().to_bech32();
  }
}

export { BaseKeyDerivation };
