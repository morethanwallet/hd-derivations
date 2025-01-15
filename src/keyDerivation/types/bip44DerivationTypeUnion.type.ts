import { type DerivationTypeMap } from "@/types/index.js";

type Bip44DerivationTypeUnion =
  | DerivationTypeMap["legacy"]
  | DerivationTypeMap["segWit"]
  | DerivationTypeMap["nativeSegWit"]
  | DerivationTypeMap["taproot"]
  | DerivationTypeMap["p2wsh"]
  | DerivationTypeMap["p2wshInP2sh"]
  | DerivationTypeMap["cashAddr"]
  | DerivationTypeMap["avaxP"]
  | DerivationTypeMap["avaxX"]
  | DerivationTypeMap["xrpBase"]
  | DerivationTypeMap["xrpX"];

export { type Bip44DerivationTypeUnion };
