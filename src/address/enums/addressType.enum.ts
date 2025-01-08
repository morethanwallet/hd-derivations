const AddressType = {
  AVAX: "avax",
  BTC_LEGACY: "btcLegacy",
  BTC_SEG_WIT: "btcSegWit",
  BTC_P2WSH_IN_P2SH: "btcP2wshInP2sh",
  BTC_P2WSH: "btcP2wsh",
  BTC_NATIVE_SEG_WIT: "btcNativeSegWit",
  BTC_TAPROOT: "btcTaproot",
  BCH_CASH_ADDR: "bchCashAddr",
  ADA_BASE: "adaBase",
  ADA_REWARD: "adaReward",
  ADA_ENTERPRISE: "adaEnterprise",
  BNB: "bnb",
  EVM: "evm",
  ZEC_TRANSPARENT: "zecTransparent",
  SOL: "sol",
  XRP_BASE: "xrpBase",
  XRP_X: "xrpX",
} as const;

export { AddressType };
