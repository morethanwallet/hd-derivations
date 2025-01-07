import { BaseAddress, EnterpriseAddress, RewardAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type NetworkPurpose, type AbstractNetwork } from "./types/index.js";
import { type AddressData, type AddressType } from "@/address/cardano/index.js";
import { assert } from "@/helpers/assert.helper.js";
import { ExceptionMessage, NetworkError } from "../exceptions/index.js";
import { validateDerivationPath } from "@/helpers/index.js";
import { derivationPathSegmentToAllowedValue } from "./validation/index.js";

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
    this.validateDerivationPath(derivationPath);

    switch (addressType) {
      case "reward": {
        return this.rewardAddress.getData(derivationPath, this.purpose);
      }
      case "enterprise": {
        return this.enterpriseAddress.getData(derivationPath, this.purpose);
      }
      case "base": {
        return this.baseAddress.getData(derivationPath, this.purpose);
      }
    }
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: AddressData<"enterprise" | "reward">["privateKey"],
    addressType: Exclude<AddressType, "base">,
    rewardPrivateKey?: AddressData<"base">["rewardPrivateKey"]
  ): AddressData<"enterprise" | "reward">;
  public importByPrivateKey(
    derivationPath: string,
    enterprisePrivateKey: AddressData<"base">["enterprisePrivateKey"],
    addressType: Extract<AddressType, "base">,
    rewardPrivateKey?: AddressData<"base">["rewardPrivateKey"]
  ): AddressData<"base">;
  public importByPrivateKey(
    derivationPath: string,
    privateKey:
      | AddressData<"enterprise" | "reward">["privateKey"]
      | AddressData<"base">["enterprisePrivateKey"],
    addressType: AddressType,
    rewardPrivateKey?: AddressData<"base">["rewardPrivateKey"]
  ): AddressData<AddressType> {
    switch (addressType) {
      case "reward": {
        return this.rewardAddress.importByPrivateKey(derivationPath, privateKey, this.purpose);
      }
      case "enterprise": {
        return this.enterpriseAddress.importByPrivateKey(derivationPath, privateKey, this.purpose);
      }
      case "base": {
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

  private validateDerivationPath(derivationPath: string): void | never {
    validateDerivationPath({
      derivationPath,
      allowedPurpose: derivationPathSegmentToAllowedValue.purpose,
      allowedCoin: derivationPathSegmentToAllowedValue.coin,
    });
  }
}

export { Cardano };
