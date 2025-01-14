const DerivationType = {
  AVAX: "avax",
  LEGACY: "legacy",
  SEG_WIT: "segWit",
  P2WSH_IN_P2SH: "p2wshInP2sh",
  P2WSH: "p2wsh",
  NATIVE_SEG_WIT: "nativeSegWit",
  TAPROOT: "taproot",
  CASH_ADDR: "cashAddr",
  ADA_BASE: "adaBase",
  REWARD: "reward",
  ENTERPRISE: "enterprise",
  BNB: "bnb",
  EVM: "evm",
  TRANSPARENT: "transparent",
  SOL: "sol",
  XRP_BASE: "xrpBase",
  X: "x",
} as const;

export { DerivationType };
