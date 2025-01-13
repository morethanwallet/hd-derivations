import { type NetworkPurposeUnion as CommonNetworkPurposeUnion } from "@/families/types/index.js";

type NetworkPurposeUnion = Exclude<CommonNetworkPurposeUnion, "regtest">;

export { type NetworkPurposeUnion };
