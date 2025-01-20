import { type ValueOf } from "ts-essentials";
import { type NetworkTypeMap } from "./networkTypeMap.type.js";

type NetworkTypeUnion = ValueOf<NetworkTypeMap>;

export { type NetworkTypeUnion };
