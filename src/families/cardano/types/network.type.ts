import { type NetworkPurposeUnion as CommonNetworkPurposeUnion } from "@/families/index.js";
import { type CardanoAddressUnion } from "./address.type.js";
import { type DerivedItem, type AddressList } from "@/address/index.js";

type NetworkPurposeUnion =
  | Extract<CommonNetworkPurposeUnion, "mainnet">
  | "testnetPreprod"
  | "testnetPreview";

type GetDerivedItem =
  | ((
      derivationPath: string,
      addressType: Exclude<CardanoAddressUnion, typeof AddressList.ADA_BASE>
    ) => DerivedItem<typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD>)
  | ((
      derivationPath: string,
      addressType: Extract<CardanoAddressUnion, typeof AddressList.ADA_BASE>
    ) => DerivedItem<typeof AddressList.ADA_BASE>);

type ImportByPrivateKey =
  | ((
      derivationPath: string,
      privateKey: DerivedItem<
        typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD
      >["privateKey"],
      addressType: Exclude<CardanoAddressUnion, typeof AddressList.ADA_BASE>,
      rewardPrivateKey?: DerivedItem<typeof AddressList.ADA_BASE>["rewardPrivateKey"]
    ) => DerivedItem<typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD>)
  | ((
      derivationPath: string,
      enterprisePrivateKey: DerivedItem<typeof AddressList.ADA_BASE>["enterprisePrivateKey"],
      addressType: Exclude<CardanoAddressUnion, typeof AddressList.ADA_BASE>,
      rewardPrivateKey?: DerivedItem<typeof AddressList.ADA_BASE>["rewardPrivateKey"]
    ) => DerivedItem<typeof AddressList.ADA_BASE>);

type AbstractNetwork = {
  derive: GetDerivedItem;
  importByPrivateKey: ImportByPrivateKey;
};

export { type AbstractNetwork, type ImportByPrivateKey, type NetworkPurposeUnion };
