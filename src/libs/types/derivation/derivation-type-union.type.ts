import { type ValueOf } from "ts-essentials";
import { type DerivationTypeMap } from "./derivation-type-map.type.js";

type DerivationTypeUnion = ValueOf<DerivationTypeMap>;

type BtcDerivationTypeUnion =
  | DerivationTypeMap["btcLegacy"]
  | DerivationTypeMap["btcSegWit"]
  | DerivationTypeMap["btcTaproot"]
  | DerivationTypeMap["btcP2wsh"]
  | DerivationTypeMap["btcP2wshInP2sh"]
  | DerivationTypeMap["btcNativeSegWit"];

type AdaDerivationTypeUnion =
  | DerivationTypeMap["adaEnterprise"]
  | DerivationTypeMap["adaReward"]
  | DerivationTypeMap["adaBase"];

type XrpDerivationTypeUnion = DerivationTypeMap["xrpX"] | DerivationTypeMap["xrpBase"];

type AvaxDerivationTypeUnion = DerivationTypeMap["avaxX"] | DerivationTypeMap["avaxP"];

type BchDerivationTypeUnion = DerivationTypeMap["bchLegacy"] | DerivationTypeMap["bchCashAddr"];

export type {
  DerivationTypeUnion,
  BtcDerivationTypeUnion,
  AdaDerivationTypeUnion,
  XrpDerivationTypeUnion,
  AvaxDerivationTypeUnion,
  BchDerivationTypeUnion,
};
