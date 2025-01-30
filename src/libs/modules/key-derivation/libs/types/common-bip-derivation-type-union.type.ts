import { type DerivationTypeMap } from "@/libs/types/index.js";

type CommonBipDerivationTypeUnion =
  | DerivationTypeMap["btcLegacy"]
  | DerivationTypeMap["btcSegWit"]
  | DerivationTypeMap["btcNativeSegWit"]
  | DerivationTypeMap["btcTaproot"]
  | DerivationTypeMap["btcP2wsh"]
  | DerivationTypeMap["btcP2wshInP2sh"]
  | DerivationTypeMap["bchLegacy"]
  | DerivationTypeMap["bchCashAddr"]
  | DerivationTypeMap["avaxP"]
  | DerivationTypeMap["avaxX"]
  | DerivationTypeMap["xrpBase"]
  | DerivationTypeMap["xrpX"]
  | DerivationTypeMap["trxBase"];

export { type CommonBipDerivationTypeUnion };
