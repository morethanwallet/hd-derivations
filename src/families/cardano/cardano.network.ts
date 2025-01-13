import {
  type DerivedItem,
  AddressList,
  BaseAddress,
  EnterpriseAddress,
  RewardAddress,
} from "@/keyDerivation/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import {
  type NetworkPurpose,
  type AbstractNetwork,
  type CardanoAddressList,
} from "./types/index.js";
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
    addressType: Exclude<CardanoAddressList, typeof AddressList.ADA_BASE>
  ): DerivedItem<typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD>;
  public derive(
    derivationPath: string,
    addressType: Extract<CardanoAddressList, typeof AddressList.ADA_BASE>
  ): DerivedItem<typeof AddressList.ADA_BASE>;
  public derive(
    derivationPath: string,
    addressType: CardanoAddressList
  ): DerivedItem<CardanoAddressList> {
    switch (addressType) {
      case AddressList.ADA_REWARD: {
        return this.rewardAddress.derive({ derivationPath, networkPurpose: this.purpose });
      }
      case AddressList.ADA_ENTERPRISE: {
        return this.enterpriseAddress.derive({ derivationPath, networkPurpose: this.purpose });
      }
      case AddressList.ADA_BASE: {
        return this.baseAddress.derive({ derivationPath, networkPurpose: this.purpose });
      }
    }
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: DerivedItem<
      typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD
    >["privateKey"],
    addressType: Exclude<CardanoAddressList, typeof AddressList.ADA_BASE>,
    rewardPrivateKey?: DerivedItem<typeof AddressList.ADA_BASE>["rewardPrivateKey"]
  ): DerivedItem<typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD>;
  public importByPrivateKey(
    derivationPath: string,
    enterprisePrivateKey: DerivedItem<typeof AddressList.ADA_BASE>["enterprisePrivateKey"],
    addressType: Extract<CardanoAddressList, typeof AddressList.ADA_BASE>,
    rewardPrivateKey?: DerivedItem<typeof AddressList.ADA_BASE>["rewardPrivateKey"]
  ): DerivedItem<typeof AddressList.ADA_BASE>;
  public importByPrivateKey(
    derivationPath: string,
    privateKey:
      | DerivedItem<typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD>["privateKey"]
      | DerivedItem<typeof AddressList.ADA_BASE>["enterprisePrivateKey"],
    addressType: CardanoAddressList,
    rewardPrivateKey?: DerivedItem<typeof AddressList.ADA_BASE>["rewardPrivateKey"]
  ): DerivedItem<CardanoAddressList> {
    switch (addressType) {
      case AddressList.ADA_REWARD: {
        return this.rewardAddress.importByPrivateKey({
          derivationPath,
          privateKey,
          networkPurpose: this.purpose,
        });
      }
      case AddressList.ADA_ENTERPRISE: {
        return this.enterpriseAddress.importByPrivateKey({
          derivationPath,
          privateKey,
          networkPurpose: this.purpose,
        });
      }
      case AddressList.ADA_BASE: {
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
