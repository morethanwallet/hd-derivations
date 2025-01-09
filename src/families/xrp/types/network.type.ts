import { type AbstractAddress } from "@/address/index.js";
import { type NetworkPurpose as CommonNetworkPurpose } from "@/families/index.js";
import { type XrpAddress } from "./address.type.js";

type NetworkPurpose = Exclude<CommonNetworkPurpose, "regtest">;

type XrpAbstractAddress = AbstractAddress<XrpAddress>;

type GetDerivedItemParameters = Omit<
  Parameters<XrpAbstractAddress["getData"]>[0],
  "networkPurpose"
>;

type ImportByPrivateKeyParameters = Omit<
  Parameters<XrpAbstractAddress["importByPrivateKey"]>[0],
  "networkPurpose"
>;

type AbstractNetwork = {
  derive: (parameters: GetDerivedItemParameters) => ReturnType<XrpAbstractAddress["getData"]>;
  importByPrivateKey: (
    parameters: ImportByPrivateKeyParameters
  ) => ReturnType<XrpAbstractAddress["importByPrivateKey"]>;
};

export { type AbstractNetwork, type NetworkPurpose };
