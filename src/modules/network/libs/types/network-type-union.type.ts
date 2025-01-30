import { NetworkTypeMap } from "./network-type-map.type.js";
import type { ValueOf } from "@/libs/types/index.js";

type NetworkTypeUnion = ValueOf<NetworkTypeMap>;

export { type NetworkTypeUnion };
