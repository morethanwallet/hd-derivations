const CommonDerivationPath = {
  SOL: "m/44'/501'/0'/0'",
  ADA: "m/1852'/1815'/0'",
  BNB: "m/44'/714'/0'/0",
  AVAX_C: "m/44'/9005'/0'/0",
  ETH: "m/44'/60'/0'/0",
  BSC: "m/44'/9006'/0'/0",
  ETC: "m/44'/61'/0'/0",
} as const;

const CoinomiDerivationPath = {
  SOL: "m/44'/501'/0'/0'",
  ADA: "m/1852'/1815'/0'",
  BNB: "m/44'/714'/0'/0",
  AVAX_C: "m/44'/9005'/0'/0",
  BSC: "m/44'/9006'/0'/0",
  COINOMI_ETH: "m/44'/60'/0'",
  COINOMI_ETC: "m/44'/61'/0'",
} as const;

const DerivationPath = {
  ...CommonDerivationPath,
  ...CoinomiDerivationPath,
} as const;

export { DerivationPath, CoinomiDerivationPath, CommonDerivationPath };
