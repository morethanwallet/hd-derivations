const CommonDerivationPath = {
  NATIVE_SEG_WIT_BTC: "m/84'/0'/0'/0",
  LEGACY_BTC: "m/44'/0'/0'/0",
  TAPROOT_BTC: "m/86'/0'/0'/0",
  LEGACY_DOGE: "m/44'/3'/0'/0",
  CASH_ADDR_BCH: "m/44'/145'/0'/0",
  XRP: "m/44'/144'/0'/0",
  SOL: "m/44'/501'/0'/0'",
  ADA: "m/1852'/1815'/0'",
  ZEC_TRANSPARENT: "m/44'/133'/0'/0",
  BNB: "m/44'/714'/0'/0",
  AVAX_X: "m/44'/9000'/0'/0",
  AVAX_C: "m/44'/9005'/0'/0",
  ETH: "m/44'/60'/0'/0",
  BSC: "m/44'/9006'/0'/0",
  ETC: "m/44'/61'/0'/0",
} as const;

const CoinomiDerivationPath = {
  NATIVE_SEG_WIT_BTC: "m/84'/0'/0'/0",
  LEGACY_BTC: "m/44'/0'/0'/0",
  TAPROOT_BTC: "m/86'/0'/0'/0",
  LEGACY_DOGE: "m/44'/3'/0'/0",
  CASH_ADDR_BCH: "m/44'/145'/0'/0",
  XRP: "m/44'/144'/0'/0",
  SOL: "m/44'/501'/0'/0'",
  ADA: "m/1852'/1815'/0'",
  ZEC_TRANSPARENT: "m/44'/133'/0'/0",
  BNB: "m/44'/714'/0'/0",
  AVAX_X: "m/44'/9000'/0'/0",
  AVAX_C: "m/44'/9005'/0'/0",
  BSC: "m/44'/9006'/0'/0",
  COINOMI_ETH: "m/44'/60'/0'",
  COINOMI_ETC: "m/44'/61'/0'",
} as const;

const MultiBitHdDerivationPath = {
  MULTI_BIT_HD_LEGACY_BTC: "m/0'/0",
} as const;

const DerivationPath = {
  ...CommonDerivationPath,
  ...CoinomiDerivationPath,
  ...MultiBitHdDerivationPath,
} as const;

export { DerivationPath, CoinomiDerivationPath, CommonDerivationPath, MultiBitHdDerivationPath };
