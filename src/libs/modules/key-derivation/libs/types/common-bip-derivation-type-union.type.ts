import type {
  XrpDerivationTypeUnion,
  DerivationTypeMap,
  BtcDerivationTypeUnion,
  BchDerivationTypeUnion,
  AvaxDerivationTypeUnion,
  LtcDerivationTypeUnion,
} from "@/libs/types/index.js";

type CommonBipDerivationTypeUnion =
  | BtcDerivationTypeUnion
  | BchDerivationTypeUnion
  | AvaxDerivationTypeUnion
  | XrpDerivationTypeUnion
  | DerivationTypeMap["trxBase"]
  | DerivationTypeMap["dogeLegacy"]
  | LtcDerivationTypeUnion;

export { type CommonBipDerivationTypeUnion };
