import { type DerivationType } from "@/keyDerivation/enums/index.js";

type AddressUnion =
  | typeof DerivationType.ADA_BASE
  | typeof DerivationType.ADA_ENTERPRISE
  | typeof DerivationType.ADA_REWARD;

export { type AddressUnion };
