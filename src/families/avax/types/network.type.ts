import { type AbstractAddress, type AddressType } from "@/address/index.js";
import { type NetworkPurpose as CommonNetworkPurpose } from "@/families/index.js";

type NetworkType = "X" | "P";

type NetworkPurpose = Exclude<CommonNetworkPurpose, "regtest">;

type AbstractNetwork = {
  getAddressData: AbstractAddress<typeof AddressType.AVAX>["getData"];
  importByPrivateKey: AbstractAddress<typeof AddressType.AVAX>["importByPrivateKey"];
};

export { type AbstractNetwork, type NetworkType, type NetworkPurpose };
