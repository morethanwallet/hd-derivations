import { type AddressData } from "@/address/cardano/index.js";
import { type NetworkPurpose as CommonNetworkPurpose } from "@/families/index.js";
import { type CardanoAddress } from "./address.type.js";
import { type AddressType } from "@/address/index.js";

type NetworkPurpose =
  | Extract<CommonNetworkPurpose, "mainnet">
  | "testnetPreprod"
  | "testnetPreview";

type GetAddressData =
  | ((
      derivationPath: string,
      addressType: Exclude<CardanoAddress, typeof AddressType.ADA_BASE>
    ) => AddressData<typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD>)
  | ((
      derivationPath: string,
      addressType: Extract<CardanoAddress, typeof AddressType.ADA_BASE>
    ) => AddressData<typeof AddressType.ADA_BASE>);

type ImportByPrivateKey =
  | ((
      derivationPath: string,
      privateKey: AddressData<
        typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD
      >["privateKey"],
      addressType: Exclude<CardanoAddress, typeof AddressType.ADA_BASE>,
      rewardPrivateKey?: AddressData<typeof AddressType.ADA_BASE>["rewardPrivateKey"]
    ) => AddressData<typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD>)
  | ((
      derivationPath: string,
      enterprisePrivateKey: AddressData<typeof AddressType.ADA_BASE>["enterprisePrivateKey"],
      addressType: Exclude<CardanoAddress, typeof AddressType.ADA_BASE>,
      rewardPrivateKey?: AddressData<typeof AddressType.ADA_BASE>["rewardPrivateKey"]
    ) => AddressData<typeof AddressType.ADA_BASE>);

type AbstractNetwork = {
  getAddressData: GetAddressData;
  importByPrivateKey: ImportByPrivateKey;
};

export { type AbstractNetwork, type ImportByPrivateKey, type NetworkPurpose };
