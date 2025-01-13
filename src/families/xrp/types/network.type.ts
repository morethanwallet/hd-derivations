import { type AbstractAddress } from "@/address/index.js";
import { type NetworkPurposeUnion as CommonNetworkPurposeUnion } from "@/families/index.js";
import { type AddressUnion } from "./address.type.js";

type NetworkPurpose = Exclude<CommonNetworkPurposeUnion, "regtest">;

type XrpAbstractAddress = AbstractAddress<AddressUnion>;

type GetDerivedItemParameters = Omit<Parameters<XrpAbstractAddress["derive"]>[0], "networkPurpose">;

type ImportByPrivateKeyParameters = Omit<
  Parameters<XrpAbstractAddress["importByPrivateKey"]>[0],
  "networkPurpose"
>;

type AbstractNetwork = {
  derive: (parameters: GetDerivedItemParameters) => ReturnType<XrpAbstractAddress["derive"]>;
  importByPrivateKey: (
    parameters: ImportByPrivateKeyParameters
  ) => ReturnType<XrpAbstractAddress["importByPrivateKey"]>;
};

export { type AbstractNetwork, type NetworkPurpose };
