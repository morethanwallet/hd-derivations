import { type ValueOf } from "ts-essentials";
import { type DerivationType } from "../enums/index.js";

type DerivationTypeUnion = ValueOf<typeof DerivationType>;

export { type DerivationTypeUnion };
