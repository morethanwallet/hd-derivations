const AddressType = {
  AVAX: "avax",
  BTC_LEGACY: "legacy",
  BTC_SEG_WIT: "segWit",
  BTC_P2WSH_IN_P2SH: "p2wshInP2sh",
  BTC_P2WSH: "p2wsh",
  BTC_NATIVE_SEG_WIT: "nativeSegWit",
  BTC_TAPROOT: "taproot",
  BCH_CASH_ADDR: "cashAddr",
  ADA_BASE: "adaBase",
  ADA_REWARD: "reward",
  ADA_ENTERPRISE: "enterprise",
  BNB: "bnb",
  EVM: "evm",
  ZEC_TRANSPARENT: "transparent",
  SOL: "sol",
  XRP_BASE: "xrpBase",
  XRP_X: "x",
} as const;

export { AddressType };
