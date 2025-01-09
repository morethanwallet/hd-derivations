import {
  type DerivedItem,
  AddressType,
  BaseAddress,
  EnterpriseAddress,
  RewardAddress,
} from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type NetworkPurpose, type AbstractNetwork, type CardanoAddress } from "./types/index.js";
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

  public derive(
    derivationPath: string,
    addressType: Exclude<CardanoAddress, typeof AddressType.ADA_BASE>
  ): DerivedItem<typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD>;
  public derive(
    derivationPath: string,
    addressType: Extract<CardanoAddress, typeof AddressType.ADA_BASE>
  ): DerivedItem<typeof AddressType.ADA_BASE>;
  public derive(derivationPath: string, addressType: CardanoAddress): DerivedItem<CardanoAddress> {
    switch (addressType) {
      case AddressType.ADA_REWARD: {
        return this.rewardAddress.getData({ derivationPath, networkPurpose: this.purpose });
      }
      case AddressType.ADA_ENTERPRISE: {
        return this.enterpriseAddress.getData({ derivationPath, networkPurpose: this.purpose });
      }
      case AddressType.ADA_BASE: {
        return this.baseAddress.getData({ derivationPath, networkPurpose: this.purpose });
      }
    }
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: DerivedItem<
      typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD
    >["privateKey"],
    addressType: Exclude<CardanoAddress, typeof AddressType.ADA_BASE>,
    rewardPrivateKey?: DerivedItem<typeof AddressType.ADA_BASE>["rewardPrivateKey"]
  ): DerivedItem<typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD>;
  public importByPrivateKey(
    derivationPath: string,
    enterprisePrivateKey: DerivedItem<typeof AddressType.ADA_BASE>["enterprisePrivateKey"],
    addressType: Extract<CardanoAddress, typeof AddressType.ADA_BASE>,
    rewardPrivateKey?: DerivedItem<typeof AddressType.ADA_BASE>["rewardPrivateKey"]
  ): DerivedItem<typeof AddressType.ADA_BASE>;
  public importByPrivateKey(
    derivationPath: string,
    privateKey:
      | DerivedItem<typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD>["privateKey"]
      | DerivedItem<typeof AddressType.ADA_BASE>["enterprisePrivateKey"],
    addressType: CardanoAddress,
    rewardPrivateKey?: DerivedItem<typeof AddressType.ADA_BASE>["rewardPrivateKey"]
  ): DerivedItem<CardanoAddress> {
    switch (addressType) {
      case AddressType.ADA_REWARD: {
        return this.rewardAddress.importByPrivateKey({
          derivationPath,
          privateKey,
          networkPurpose: this.purpose,
        });
      }
      case AddressType.ADA_ENTERPRISE: {
        return this.enterpriseAddress.importByPrivateKey({
          derivationPath,
          privateKey,
          networkPurpose: this.purpose,
        });
      }
      case AddressType.ADA_BASE: {
        assert(rewardPrivateKey, NetworkError, ExceptionMessage.CARDANO_REWARD_KEY_IS_REQUIRED);

        return this.baseAddress.importByPrivateKey({
          derivationPath,
          rewardPrivateKey,
          enterprisePrivateKey: privateKey,
          networkPurpose: this.purpose,
        });
      }
    }
  }
}

export { Cardano };
