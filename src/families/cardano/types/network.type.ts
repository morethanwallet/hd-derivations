import { type NetworkPurpose as CommonNetworkPurpose } from "@/families/index.js";
import { type CardanoAddressList } from "./address.type.js";
import { type DerivedItem, type AddressList } from "@/address/index.js";

type NetworkPurpose =
  | Extract<CommonNetworkPurpose, "mainnet">
  | "testnetPreprod"
  | "testnetPreview";

type GetDerivedItem =
  | ((
      derivationPath: string,
      addressType: Exclude<CardanoAddressList, typeof AddressList.ADA_BASE>
    ) => DerivedItem<typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD>)
  | ((
      derivationPath: string,
      addressType: Extract<CardanoAddressList, typeof AddressList.ADA_BASE>
    ) => DerivedItem<typeof AddressList.ADA_BASE>);

type ImportByPrivateKey =
  | ((
      derivationPath: string,
      privateKey: DerivedItem<
        typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD
      >["privateKey"],
      addressType: Exclude<CardanoAddressList, typeof AddressList.ADA_BASE>,
      rewardPrivateKey?: DerivedItem<typeof AddressList.ADA_BASE>["rewardPrivateKey"]
    ) => DerivedItem<typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD>)
  | ((
      derivationPath: string,
      enterprisePrivateKey: DerivedItem<typeof AddressList.ADA_BASE>["enterprisePrivateKey"],
      addressType: Exclude<CardanoAddressList, typeof AddressList.ADA_BASE>,
      rewardPrivateKey?: DerivedItem<typeof AddressList.ADA_BASE>["rewardPrivateKey"]
    ) => DerivedItem<typeof AddressList.ADA_BASE>);

type AbstractNetwork = {
  derive: GetDerivedItem;
  importByPrivateKey: ImportByPrivateKey;
};

export { type AbstractNetwork, type ImportByPrivateKey, type NetworkPurpose };
