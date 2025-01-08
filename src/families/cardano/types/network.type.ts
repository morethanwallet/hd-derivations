import { type AddressType, type AddressData } from "@/address/cardano/index.js";
import { type NetworkPurpose as CommonNetworkPurpose } from "@/families/index.js";

type NetworkPurpose =
  | Extract<CommonNetworkPurpose, "mainnet">
  | "testnetPreprod"
  | "testnetPreview";

type GetAddressData =
  | ((
      derivationPath: string,
      addressType: Exclude<AddressType, "base">
    ) => AddressData<"enterprise" | "reward">)
  | ((derivationPath: string, addressType: Extract<AddressType, "base">) => AddressData<"base">);

type ImportByPrivateKey =
  | ((
      derivationPath: string,
      privateKey: AddressData<"enterprise" | "reward">["privateKey"],
      addressType: Exclude<AddressType, "base">,
      rewardPrivateKey?: AddressData<"base">["rewardPrivateKey"]
    ) => AddressData<"enterprise" | "reward">)
  | ((
      derivationPath: string,
      enterprisePrivateKey: AddressData<"base">["enterprisePrivateKey"],
      addressType: Exclude<AddressType, "base">,
      rewardPrivateKey?: AddressData<"base">["rewardPrivateKey"]
    ) => AddressData<"base">);

type AbstractNetwork = {
  getAddressData: GetAddressData;
  importByPrivateKey: ImportByPrivateKey;
};

export { type AbstractNetwork, type ImportByPrivateKey, type NetworkPurpose };
