import {
  Credential,
  PrivateKey,
  BaseAddress as LibraryBaseAddress,
  PublicKey,
} from "@emurgo/cardano-serialization-lib-nodejs";
import { type Mnemonic } from "@/mnemonic/index.js";
import { getCredential, getNetworkId } from "./helpers/index.js";
import { EnterpriseAddress } from "./enterpriseAddress.js";
import { RewardAddress } from "./rewardAddress.js";
import { type NetworkPurposeUnion } from "@/families/cardano/index.js";
import { type DerivationType } from "@/address/enums/index.js";
import {
  type DerivedItem,
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
  type DerivedCredential,
} from "../types/index.js";
import { Keys } from "@/keys/cardano/index.js";

class BaseAddress extends Keys implements AbstractKeyDerivation<typeof DerivationType.ADA_BASE> {
  private enterpriseAddress: EnterpriseAddress;
  private rewardAddress: RewardAddress;

  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);

    this.enterpriseAddress = new EnterpriseAddress(mnemonic);
    this.rewardAddress = new RewardAddress(mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
    networkPurpose,
  }: DeriveFromMnemonicParameters<typeof DerivationType.ADA_BASE>): DerivedItem<
    typeof DerivationType.ADA_BASE
  > {
    const derivedEnterpriseItem = this.enterpriseAddress.derive({
      derivationPath,
      networkPurpose,
    });

    const derivedRewardItem = this.rewardAddress.derive({ derivationPath, networkPurpose });
    const enterpriseCredential = getCredential(PublicKey.from_hex(derivedEnterpriseItem.publicKey));
    const rewardCredential = getCredential(PublicKey.from_hex(derivedRewardItem.publicKey));
    const address = this.getAddress(enterpriseCredential, rewardCredential, networkPurpose);

    return {
      address,
      enterpriseDerivationPath: derivedEnterpriseItem.path,
      enterprisePrivateKey: derivedEnterpriseItem.privateKey,
      enterprisePublicKey: derivedEnterpriseItem.publicKey,
      rewardDerivationPath: derivedRewardItem.path,
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
    const address = LibraryBaseAddress.new(
      getNetworkId(networkPurpose),
      enterpriseCredential,
      rewardCredential
    );

    return address.to_address().to_bech32();
  }
}

export { BaseAddress };
