import { NetworkTypeMap } from "./network-type-map.type.js";
import type { ValueOf } from "@/libs/types/index.js";

type NetworkTypeUnion = ValueOf<NetworkTypeMap>;

type DotNetworkTypeUnion = "dot" | "ksm" | "aca";

export { type NetworkTypeUnion, type DotNetworkTypeUnion };
