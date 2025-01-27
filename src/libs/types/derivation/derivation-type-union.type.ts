import { type ValueOf } from "ts-essentials";
import { type DerivationTypeMap } from "./derivation-type-map.type.js";

type DerivationTypeUnion = ValueOf<DerivationTypeMap>;

type BtcDerivationTypeUnion =
  | DerivationTypeMap["legacy"]
  | DerivationTypeMap["segWit"]
  | DerivationTypeMap["taproot"]
  | DerivationTypeMap["p2wsh"]
  | DerivationTypeMap["p2wshInP2sh"]
  | DerivationTypeMap["nativeSegWit"];

type AdaDerivationTypeUnion =
  | DerivationTypeMap["enterprise"]
  | DerivationTypeMap["reward"]
  | DerivationTypeMap["adaBase"];

type XrpDerivationTypeUnion = DerivationTypeMap["xrpX"] | DerivationTypeMap["xrpBase"];

type AvaxDerivationTypeUnion = DerivationTypeMap["avaxX"] | DerivationTypeMap["avaxP"];

export {
  type DerivationTypeUnion,
  type BtcDerivationTypeUnion,
  type AdaDerivationTypeUnion,
  type XrpDerivationTypeUnion,
  type AvaxDerivationTypeUnion,
};
