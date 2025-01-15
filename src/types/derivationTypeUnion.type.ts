import { type ValueOf } from "ts-essentials";
import { type DerivationTypeMap } from "./derivationTypeMap.type.js";

type DerivationTypeUnion = ValueOf<DerivationTypeMap>;

type XrpDerivationTypeUnion = DerivationTypeMap["x"] | DerivationTypeMap["xrpBase"];

type AvaxDerivationTypeUnion = DerivationTypeMap["avaxX"] | DerivationTypeMap["avaxP"];

export { type DerivationTypeUnion, type XrpDerivationTypeUnion, type AvaxDerivationTypeUnion };
