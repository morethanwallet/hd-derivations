import { NetworkTypeMap } from "./networkTypeMap.type.js";
import { type ValueOf } from "ts-essentials";

type NetworkTypeUnion = ValueOf<NetworkTypeMap>;

export { type NetworkTypeUnion };
