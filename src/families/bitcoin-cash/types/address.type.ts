import { type DerivationType } from "@/address/enums/index.js";

type AddressUnion = typeof DerivationType.BTC_LEGACY | typeof DerivationType.BCH_CASH_ADDR;

export { type AddressUnion };
