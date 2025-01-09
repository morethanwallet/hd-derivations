import { AddressType, BaseAddress, EnterpriseAddress, RewardAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type NetworkPurpose, type AbstractNetwork, type CardanoAddress } from "./types/index.js";
import { type AddressData } from "@/address/cardano/index.js";
import { assert } from "@/helpers/assert.helper.js";
import { ExceptionMessage, NetworkError } from "../exceptions/index.js";

class Cardano implements AbstractNetwork {
  private purpose: NetworkPurpose;
  private baseAddress: BaseAddress;
  private enterpriseAddress: EnterpriseAddress;
  private rewardAddress: RewardAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.purpose = purpose;
    this.baseAddress = new BaseAddress(mnemonic);
    this.enterpriseAddress = new EnterpriseAddress(mnemonic);
    this.rewardAddress = new RewardAddress(mnemonic);
  }

  public getAddressData(
    derivationPath: string,
    addressType: Exclude<CardanoAddress, typeof AddressType.ADA_BASE>
  ): AddressData<typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD>;
  public getAddressData(
    derivationPath: string,
    addressType: Extract<CardanoAddress, typeof AddressType.ADA_BASE>
  ): AddressData<typeof AddressType.ADA_BASE>;
  public getAddressData(
    derivationPath: string,
    addressType: CardanoAddress
  ): AddressData<CardanoAddress> {
    switch (addressType) {
      case AddressType.ADA_REWARD: {
        return this.rewardAddress.getData(derivationPath, this.purpose);
      }
      case AddressType.ADA_ENTERPRISE: {
        return this.enterpriseAddress.getData(derivationPath, this.purpose);
      }
      case AddressType.ADA_BASE: {
        return this.baseAddress.getData(derivationPath, this.purpose);
      }
    }
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: AddressData<
      typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD
    >["privateKey"],
    addressType: Exclude<CardanoAddress, typeof AddressType.ADA_BASE>,
    rewardPrivateKey?: AddressData<typeof AddressType.ADA_BASE>["rewardPrivateKey"]
  ): AddressData<typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD>;
  public importByPrivateKey(
    derivationPath: string,
    enterprisePrivateKey: AddressData<typeof AddressType.ADA_BASE>["enterprisePrivateKey"],
    addressType: Extract<CardanoAddress, typeof AddressType.ADA_BASE>,
    rewardPrivateKey?: AddressData<typeof AddressType.ADA_BASE>["rewardPrivateKey"]
  ): AddressData<typeof AddressType.ADA_BASE>;
  public importByPrivateKey(
    derivationPath: string,
    privateKey:
      | AddressData<typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD>["privateKey"]
      | AddressData<typeof AddressType.ADA_BASE>["enterprisePrivateKey"],
    addressType: CardanoAddress,
    rewardPrivateKey?: AddressData<typeof AddressType.ADA_BASE>["rewardPrivateKey"]
  ): AddressData<CardanoAddress> {
    switch (addressType) {
      case AddressType.ADA_REWARD: {
        return this.rewardAddress.importByPrivateKey(derivationPath, privateKey, this.purpose);
      }
      case AddressType.ADA_ENTERPRISE: {
        return this.enterpriseAddress.importByPrivateKey(derivationPath, privateKey, this.purpose);
      }
      case AddressType.ADA_BASE: {
        assert(rewardPrivateKey, NetworkError, ExceptionMessage.CARDANO_REWARD_KEY_IS_REQUIRED);

        return this.baseAddress.importByPrivateKey(
          derivationPath,
          privateKey,
          rewardPrivateKey,
          this.purpose
        );
      }
    }
  }
}

export { Cardano };
