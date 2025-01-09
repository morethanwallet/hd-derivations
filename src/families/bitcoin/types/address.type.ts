import { type AddressList } from "@/address/index.js";

type MultiBitHdAddressList = typeof AddressList.BTC_LEGACY;

type BitcoinCoreAddressList =
  | typeof AddressList.BTC_LEGACY
  | typeof AddressList.BTC_SEG_WIT
  | typeof AddressList.BTC_NATIVE_SEG_WIT
  | typeof AddressList.BTC_TAPROOT;

type BitcoinAddressList =
  | typeof AddressList.BTC_P2WSH
  | typeof AddressList.BTC_P2WSH_IN_P2SH
  | BitcoinCoreAddressList;

export { type MultiBitHdAddressList, type BitcoinCoreAddressList, type BitcoinAddressList };
