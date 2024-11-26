const CommonDerivationPath = {
  SOL: "m/44'/501'/0'/0'",
  ADA: "m/1852'/1815'/0'",
} as const;

const DerivationPath = {
  ...CommonDerivationPath,
} as const;

export { DerivationPath, CommonDerivationPath };
