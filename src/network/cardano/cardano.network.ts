import { BaseAddress, EnterpriseAddress, RewardAddress, type KeyPair } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "./types/index.js";
import { type AddressData, type AddressType } from "@/address/cardano/index.js";
import { assert } from "@/helpers/assert.helper.js";

class Cardano implements AbstractNetwork {
  private baseAddress: BaseAddress;
  private enterpriseAddress: EnterpriseAddress;
  private rewardAddress: RewardAddress;

  public constructor(mnemonic: Mnemonic) {
    this.baseAddress = new BaseAddress(mnemonic);
    this.enterpriseAddress = new EnterpriseAddress(mnemonic);
    this.rewardAddress = new RewardAddress(mnemonic);
  }

  public getAddressData(
    derivationPath: string,
    addressType: Exclude<AddressType, "base">
  ): AddressData<"enterprise" | "reward">;
  public getAddressData(
    derivationPath: string,
    addressType: Extract<AddressType, "base">
  ): AddressData<"base">;
  public getAddressData(
    derivationPath: string,
    addressType: AddressType
  ): AddressData<AddressType> {
    switch (addressType) {
      case "reward": {
        return this.rewardAddress.getData(derivationPath);
      }
      case "enterprise": {
        return this.enterpriseAddress.getData(derivationPath);
      }
      case "base": {
        return this.baseAddress.getData(derivationPath);
      }
    }
  }

  public importByPrivateKey(
    derivationPath: string,
    addressType: Exclude<AddressType, "base">,
    privateKey: AddressData<"enterprise" | "reward">["privateKey"]
  ): AddressData<"enterprise" | "reward">;
  public importByPrivateKey(
    derivationPath: string,
    addressType: Extract<AddressType, "base">,
    enterprisePrivateKey: AddressData<"base">["enterprisePrivateKey"],
    rewardPrivateKey: AddressData<"base">["rewardPrivateKey"]
  ): AddressData<"base">;
  public importByPrivateKey(
    derivationPath: string,
    addressType: AddressType,
    privateKey:
      | AddressData<"enterprise" | "reward">["privateKey"]
      | AddressData<"base">["enterprisePrivateKey"],
    rewardPrivateKey?: AddressData<"base">["rewardPrivateKey"]
  ): AddressData<AddressType> {
    assert(addressType === "base" && !rewardPrivateKey, Error, "")
    switch (addressType) {
      case "reward": {
        return this.rewardAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "enterprise": {
        return this.enterpriseAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "base": {
        return this.baseAddress.importByPrivateKey(derivationPath, privateKey, rewardPrivateKey);
      }
    }
  }
}

export { Cardano };
