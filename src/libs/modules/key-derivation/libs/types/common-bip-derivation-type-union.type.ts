import type {
  XrpDerivationTypeUnion,
  DerivationTypeMap,
  BtcDerivationTypeUnion,
  BchDerivationTypeUnion,
  AvaxDerivationTypeUnion,
} from "@/libs/types/index.js";

type CommonBipDerivationTypeUnion =
  | BtcDerivationTypeUnion
  | BchDerivationTypeUnion
  | AvaxDerivationTypeUnion
  | XrpDerivationTypeUnion
  | DerivationTypeMap["trxBase"]
  | DerivationTypeMap["bnbBase"];

export { type CommonBipDerivationTypeUnion };
