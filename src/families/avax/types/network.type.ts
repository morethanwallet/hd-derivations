import { type AbstractAddress, type AddressList } from "@/address/index.js";
import { type NetworkPurpose as CommonNetworkPurpose } from "@/families/index.js";

type NetworkType = "X" | "P";

type NetworkPurpose = Exclude<CommonNetworkPurpose, "regtest">;

type AbstractNetwork = {
  derive: AbstractAddress<typeof AddressList.AVAX>["derive"];
  importByPrivateKey: AbstractAddress<typeof AddressList.AVAX>["importByPrivateKey"];
};

export { type AbstractNetwork, type NetworkType, type NetworkPurpose };
