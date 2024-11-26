import { type AbstractAddress } from "@/address/avax/index.js";
import { type NetworkPurpose as CommonNetworkPurpose } from "@/network/index.js";

type NetworkType = "X" | "P";

type NetworkPurpose = Exclude<CommonNetworkPurpose, "regtest">;

type AbstractNetwork = {
  getAddressData: AbstractAddress["getData"];
  importByPrivateKey: AbstractAddress["importByPrivateKey"];
};

export { type AbstractNetwork, type NetworkType, type NetworkPurpose };
