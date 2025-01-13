import { type NetworkPurposeUnion as CommonNetworkPurposeUnion } from "@/families/index.js";
import { type AddressUnion } from "./address.type.js";
import { type DerivedItem, type AddressList } from "@/address/index.js";

type NetworkPurposeUnion =
  | Extract<CommonNetworkPurposeUnion, "mainnet">
  | "testnetPreprod"
  | "testnetPreview";

type GetDerivedItem =
  | ((
      derivationPath: string,
      addressType: Exclude<AddressUnion, typeof AddressList.ADA_BASE>
    ) => DerivedItem<typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD>)
  | ((
      derivationPath: string,
      addressType: Extract<AddressUnion, typeof AddressList.ADA_BASE>
    ) => DerivedItem<typeof AddressList.ADA_BASE>);

type ImportByPrivateKey =
  | ((
      derivationPath: string,
      privateKey: DerivedItem<
        typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD
      >["privateKey"],
      addressType: Exclude<AddressUnion, typeof AddressList.ADA_BASE>,
      rewardPrivateKey?: DerivedItem<typeof AddressList.ADA_BASE>["rewardPrivateKey"]
    ) => DerivedItem<typeof AddressList.ADA_ENTERPRISE | typeof AddressList.ADA_REWARD>)
  | ((
      derivationPath: string,
      enterprisePrivateKey: DerivedItem<typeof AddressList.ADA_BASE>["enterprisePrivateKey"],
      addressType: Exclude<AddressUnion, typeof AddressList.ADA_BASE>,
      rewardPrivateKey?: DerivedItem<typeof AddressList.ADA_BASE>["rewardPrivateKey"]
    ) => DerivedItem<typeof AddressList.ADA_BASE>);

type AbstractNetwork = {
  derive: GetDerivedItem;
  importByPrivateKey: ImportByPrivateKey;
};

export { type AbstractNetwork, type ImportByPrivateKey, type NetworkPurposeUnion };
