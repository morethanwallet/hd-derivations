import { type AddressList } from "@/address/index.js";

type MultiBitHdAddress = typeof AddressList.BTC_LEGACY;

type BitcoinCoreAddress =
  | typeof AddressList.BTC_LEGACY
  | typeof AddressList.BTC_SEG_WIT
  | typeof AddressList.BTC_NATIVE_SEG_WIT
  | typeof AddressList.BTC_TAPROOT;

type BitcoinAddress =
  | typeof AddressList.BTC_P2WSH
  | typeof AddressList.BTC_P2WSH_IN_P2SH
  | BitcoinCoreAddress;

export { type MultiBitHdAddress, type BitcoinCoreAddress, type BitcoinAddress };
