import { type ValueOf } from "ts-essentials";
import { type DerivationTypeMap } from "./derivationTypeMap.type.js";

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

type TonDerivationTypeUnion =
  | DerivationTypeMap["tonV1r1"]
  | DerivationTypeMap["tonV1r2"]
  | DerivationTypeMap["tonV1r3"]
  | DerivationTypeMap["tonV2r1"]
  | DerivationTypeMap["tonV2r2"]
  | DerivationTypeMap["tonV3r1"]
  | DerivationTypeMap["tonV3r2"]
  | DerivationTypeMap["tonV4r1"]
  | DerivationTypeMap["tonV5r1"];

export {
  type DerivationTypeUnion,
  type BtcDerivationTypeUnion,
  type AdaDerivationTypeUnion,
  type XrpDerivationTypeUnion,
  type AvaxDerivationTypeUnion,
  type TonDerivationTypeUnion,
};
