const CommonDerivationPath = {
  ADA: "m/1852'/1815'/0'",
} as const;

const DerivationPath = {
  ...CommonDerivationPath,
} as const;

export { DerivationPath, CommonDerivationPath };
