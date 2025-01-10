import { type AbstractAddress, type AddressList } from "@/address/index.js";
import { type NetworkPurposeUnion as CommonNetworkPurposeUnion } from "@/families/index.js";

type NetworkTypeUnion = "X" | "P";

type NetworkPurposeUnion = Exclude<CommonNetworkPurposeUnion, "regtest">;

type AbstractNetwork = {
  derive: AbstractAddress<typeof AddressList.AVAX>["derive"];
  importByPrivateKey: AbstractAddress<typeof AddressList.AVAX>["importByPrivateKey"];
};

export { type AbstractNetwork, type NetworkTypeUnion, type NetworkPurposeUnion };
