import { Keys } from "./keys/index.js";
import {
  Credential,
  PrivateKey,
  BaseAddress as LibraryBaseAddress,
  PublicKey,
} from "@emurgo/cardano-serialization-lib-nodejs";
import { appendAddressToDerivationPath, removeDerivationPathAddress } from "../helpers/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type BaseAddressKeyPair, type AddressData } from "./types/index.js";
import { getCredential, getNetworkId, updateDerivationPathChange } from "./helpers/index.js";
import { Change } from "./enums/index.js";
import { EnterpriseAddress } from "./enterpriseAddress.js";
import { RewardAddress } from "./rewardAddress.js";
import { type NetworkPurpose } from "@/families/cardano/index.js";
import { type AbstractAddress, type AddressType } from "@/address/index.js";

class BaseAddress extends Keys implements AbstractAddress<typeof AddressType.ADA_BASE> {
  private enterpriseAddress: EnterpriseAddress;
  private rewardAddress: RewardAddress;

  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);

    this.enterpriseAddress = new EnterpriseAddress(mnemonic);
    this.rewardAddress = new RewardAddress(mnemonic);
  }

  public getData(
    derivationPath: string,
    networkPurpose: NetworkPurpose
  ): AddressData<typeof AddressType.ADA_BASE> {
    const enterpriseAddressData = this.enterpriseAddress.getData(derivationPath, networkPurpose);
    const rewardAddressData = this.rewardAddress.getData(derivationPath, networkPurpose);
    const enterpriseCredential = getCredential(PublicKey.from_hex(enterpriseAddressData.publicKey));
    const stakingCredential = getCredential(PublicKey.from_hex(rewardAddressData.publicKey));
    const address = this.getAddress(enterpriseCredential, stakingCredential, networkPurpose);

    return {
      address,
      enterprisePath: enterpriseAddressData.path,
      enterprisePrivateKey: enterpriseAddressData.privateKey,
      enterprisePublicKey: enterpriseAddressData.publicKey,
      rewardPath: rewardAddressData.path,
      rewardPrivateKey: rewardAddressData.privateKey,
      rewardPublicKey: rewardAddressData.publicKey,
      mnemonic: this.mnemonic.getMnemonic(),
    };
  }

  public importByPrivateKey(
    derivationPath: string,
    enterprisePrivateKey: BaseAddressKeyPair["enterprisePrivateKey"],
    rewardPrivateKey: BaseAddressKeyPair["rewardPrivateKey"],
    networkPurpose: NetworkPurpose
  ): AddressData<typeof AddressType.ADA_BASE> {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(incrementedDerivationPath, networkPurpose);

      if (
        data.enterprisePrivateKey === enterprisePrivateKey &&
        data.rewardPrivateKey === rewardPrivateKey
      ) {
        return data;
      }
    }

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
      enterprisePath: updateDerivationPathChange(derivationPath, Change.EXTERNAL),
      rewardPublicKey: rawRewardPublicKey.to_hex(),
      rewardPath: updateDerivationPathChange(derivationPath, Change.CHIMERIC),
      mnemonic: EMPTY_MNEMONIC,
    };
  }

  private getAddress(
    enterpriseCredential: Credential,
    rewardCredential: Credential,
    networkPurpose: NetworkPurpose
  ): AddressData<typeof AddressType.ADA_BASE>["address"] {
    const address = LibraryBaseAddress.new(
      getNetworkId(networkPurpose),
      enterpriseCredential,
      rewardCredential
    );

    return address.to_address().to_bech32();
  }
}

export { BaseAddress };
