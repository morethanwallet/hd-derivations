import { type DerivationTypeMap } from "@/types/index.js";

type CommonDerivationTypeUnion =
  | DerivationTypeMap["legacy"]
  | DerivationTypeMap["segWit"]
  | DerivationTypeMap["nativeSegWit"]
  | DerivationTypeMap["taproot"]
  | DerivationTypeMap["p2wsh"]
  | DerivationTypeMap["p2wshInP2sh"]
  | DerivationTypeMap["cashAddr"];

export { type CommonDerivationTypeUnion };
