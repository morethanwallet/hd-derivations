import { type NetworkPurpose as CommonNetworkPurpose } from "@/families/index.js";
import { type CardanoAddress } from "./address.type.js";
import { type DerivedItem, type AddressType } from "@/address/index.js";

type NetworkPurpose =
  | Extract<CommonNetworkPurpose, "mainnet">
  | "testnetPreprod"
  | "testnetPreview";

type GetDerivedItem =
  | ((
      derivationPath: string,
      addressType: Exclude<CardanoAddress, typeof AddressType.ADA_BASE>
    ) => DerivedItem<typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD>)
  | ((
      derivationPath: string,
      addressType: Extract<CardanoAddress, typeof AddressType.ADA_BASE>
    ) => DerivedItem<typeof AddressType.ADA_BASE>);

type ImportByPrivateKey =
  | ((
      derivationPath: string,
      privateKey: DerivedItem<
        typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD
      >["privateKey"],
      addressType: Exclude<CardanoAddress, typeof AddressType.ADA_BASE>,
      rewardPrivateKey?: DerivedItem<typeof AddressType.ADA_BASE>["rewardPrivateKey"]
    ) => DerivedItem<typeof AddressType.ADA_ENTERPRISE | typeof AddressType.ADA_REWARD>)
  | ((
      derivationPath: string,
      enterprisePrivateKey: DerivedItem<typeof AddressType.ADA_BASE>["enterprisePrivateKey"],
      addressType: Exclude<CardanoAddress, typeof AddressType.ADA_BASE>,
      rewardPrivateKey?: DerivedItem<typeof AddressType.ADA_BASE>["rewardPrivateKey"]
    ) => DerivedItem<typeof AddressType.ADA_BASE>);

type AbstractNetwork = {
  derive: GetDerivedItem;
  importByPrivateKey: ImportByPrivateKey;
};

export { type AbstractNetwork, type ImportByPrivateKey, type NetworkPurpose };
