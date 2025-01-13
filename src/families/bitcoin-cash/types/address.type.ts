import { type DerivationType } from "@/keyDerivation/enums/index.js";

type AddressUnion = typeof DerivationType.BTC_LEGACY | typeof DerivationType.BCH_CASH_ADDR;

export { type AddressUnion };
