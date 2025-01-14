import { type ValueOf } from "ts-essentials";
import { type DerivationType } from "../enums/index.js";

type DerivationTypeList = typeof DerivationType;

type DerivationTypeUnion = ValueOf<DerivationTypeList>;

type BitcoinCoreDerivationTypeUnion =
  | DerivationTypeList["LEGACY"]
  | DerivationTypeList["SEG_WIT"]
  | DerivationTypeList["NATIVE_SEG_WIT"]
  | DerivationTypeList["TAPROOT"];

export { type DerivationTypeUnion, type BitcoinCoreDerivationTypeUnion };
