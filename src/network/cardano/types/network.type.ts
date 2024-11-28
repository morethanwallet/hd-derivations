import { type AddressType, type AddressData } from "@/address/cardano/index.js";

type GetAddressData =
  | ((
      derivationPath: string,
      addressType: Exclude<AddressType, "base">
    ) => AddressData<"enterprise" | "reward">)
  | ((derivationPath: string, addressType: Extract<AddressType, "base">) => AddressData<"base">);

type ImportByPrivateKey =
  | ((
      derivationPath: string,
      addressType: Exclude<AddressType, "base">,
      privateKey: AddressData<"enterprise" | "reward">["privateKey"],
      rewardPrivateKey?: AddressData<"base">["rewardPrivateKey"]
    ) => AddressData<"enterprise" | "reward">)
  | ((
      derivationPath: string,
      addressType: Extract<AddressType, "base">,
      enterprisePrivateKey: AddressData<"base">["enterprisePrivateKey"],
      rewardPrivateKey?: AddressData<"base">["rewardPrivateKey"]
    ) => AddressData<"base">);

type AbstractNetwork = {
  getAddressData: GetAddressData;
  importByPrivateKey: ImportByPrivateKey;
};

export { type AbstractNetwork, type ImportByPrivateKey };
