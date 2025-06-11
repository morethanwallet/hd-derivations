import { NetworkTypeMap } from "./network-type-map.type.js";
import type { ValueOf } from "@/libs/types/index.js";

type NetworkTypeUnion = ValueOf<NetworkTypeMap>;

type GetNetworkTypeUnion<T extends NetworkTypeUnion> = T;

export { type NetworkTypeUnion, type GetNetworkTypeUnion };
