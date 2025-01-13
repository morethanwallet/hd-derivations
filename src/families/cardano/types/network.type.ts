import { type AddressUnion } from "./address.type.js";
import { type DerivedItem } from "@/address/types/index.js";
import { type DerivationType } from "@/address/enums/index.js";
import { type NetworkPurposeUnion as CommonNetworkPurposeUnion } from "@/families/types/index.js";

type NetworkPurposeUnion =
  | Extract<CommonNetworkPurposeUnion, "mainnet">
  | "testnetPreprod"
  | "testnetPreview";

type GetDerivedItem =
  | ((
      derivationPath: string,
      addressType: Exclude<AddressUnion, typeof DerivationType.ADA_BASE>
    ) => DerivedItem<typeof DerivationType.ADA_ENTERPRISE | typeof DerivationType.ADA_REWARD>)
  | ((
      derivationPath: string,
      addressType: Extract<AddressUnion, typeof DerivationType.ADA_BASE>
    ) => DerivedItem<typeof DerivationType.ADA_BASE>);

type ImportByPrivateKey =
  | ((
      derivationPath: string,
      privateKey: DerivedItem<
        typeof DerivationType.ADA_ENTERPRISE | typeof DerivationType.ADA_REWARD
      >["privateKey"],
      addressType: Exclude<AddressUnion, typeof DerivationType.ADA_BASE>,
      rewardPrivateKey?: DerivedItem<typeof DerivationType.ADA_BASE>["rewardPrivateKey"]
    ) => DerivedItem<typeof DerivationType.ADA_ENTERPRISE | typeof DerivationType.ADA_REWARD>)
  | ((
      derivationPath: string,
      enterprisePrivateKey: DerivedItem<typeof DerivationType.ADA_BASE>["enterprisePrivateKey"],
      addressType: Exclude<AddressUnion, typeof DerivationType.ADA_BASE>,
      rewardPrivateKey?: DerivedItem<typeof DerivationType.ADA_BASE>["rewardPrivateKey"]
    ) => DerivedItem<typeof DerivationType.ADA_BASE>);

type AbstractNetwork = {
  derive: GetDerivedItem;
  importByPrivateKey: ImportByPrivateKey;
};

export { type AbstractNetwork, type ImportByPrivateKey, type NetworkPurposeUnion };
