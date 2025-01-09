import { type AbstractAddress } from "@/address/index.js";
import { type NetworkPurpose as CommonNetworkPurpose } from "@/families/index.js";
import { type XrpAddressList } from "./address.type.js";

type NetworkPurpose = Exclude<CommonNetworkPurpose, "regtest">;

type XrpAbstractAddress = AbstractAddress<XrpAddressList>;

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
