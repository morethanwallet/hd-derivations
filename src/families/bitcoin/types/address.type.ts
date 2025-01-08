import { type AddressType } from "@/address/index.js";

type MultiBitHdAddress = typeof AddressType.BTC_LEGACY;

type BitcoinCoreAddress =
  | typeof AddressType.BTC_LEGACY
  | typeof AddressType.BTC_SEG_WIT
  | typeof AddressType.BTC_NATIVE_SEG_WIT
  | typeof AddressType.BTC_TAPROOT;

type BitcoinAddress =
  | typeof AddressType.BTC_P2WSH
  | typeof AddressType.BTC_P2WSH_IN_P2SH
  | BitcoinCoreAddress;

export { type MultiBitHdAddress, type BitcoinCoreAddress, type BitcoinAddress };
