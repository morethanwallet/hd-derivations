import { type AbstractAddress } from "@/address/xrp/index.js";
import { type NetworkPurpose as CommonNetworkPurpose } from "@/families/index.js";

type NetworkPurpose = Exclude<CommonNetworkPurpose, "regtest">;

type GetAddressDataParameters = Omit<Parameters<AbstractAddress["getData"]>[0], "isTestnet">;

type ImportByPrivateKeyParameters = Omit<
  Parameters<AbstractAddress["importByPrivateKey"]>[0],
  "isTestnet"
>;

type AbstractNetwork = {
  getAddressData: (parameters: GetAddressDataParameters) => ReturnType<AbstractAddress["getData"]>;
  importByPrivateKey: (
    parameters: ImportByPrivateKeyParameters
  ) => ReturnType<AbstractAddress["importByPrivateKey"]>;
};

export { type AbstractNetwork, type NetworkPurpose };
