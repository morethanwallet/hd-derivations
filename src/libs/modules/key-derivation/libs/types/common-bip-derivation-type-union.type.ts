import type {
  XrpDerivationTypeUnion,
  BtcDerivationTypeUnion,
  BchDerivationTypeUnion,
  AvaxDerivationTypeUnion,
  LtcDerivationTypeUnion,
  GetDerivationTypeUnion,
} from "@/libs/types/types.js";

type CommonBipDerivationTypeUnion = GetDerivationTypeUnion<
  | BtcDerivationTypeUnion
  | BchDerivationTypeUnion
  | AvaxDerivationTypeUnion
  | XrpDerivationTypeUnion
  | "trxBase"
  | "dogeLegacy"
  | LtcDerivationTypeUnion
>;

export { type CommonBipDerivationTypeUnion };
