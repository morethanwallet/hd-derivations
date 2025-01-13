import { type DerivationType } from "@/address/enums/index.js";

type MultiBitHdAddressUnion = typeof DerivationType.BTC_LEGACY;

type BitcoinCoreAddressUnion =
  | typeof DerivationType.BTC_LEGACY
  | typeof DerivationType.BTC_SEG_WIT
  | typeof DerivationType.BTC_NATIVE_SEG_WIT
  | typeof DerivationType.BTC_TAPROOT;

type BitcoinAddressUnion =
  | typeof DerivationType.BTC_P2WSH
  | typeof DerivationType.BTC_P2WSH_IN_P2SH
  | BitcoinCoreAddressUnion;

export { type MultiBitHdAddressUnion, type BitcoinCoreAddressUnion, type BitcoinAddressUnion };
