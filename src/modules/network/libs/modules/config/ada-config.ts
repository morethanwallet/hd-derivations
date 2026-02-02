const COMMON_DERIVATION_PATH_PREFIX = "m/1852'/1815'";

const adaConfig = {
  mainnet: {
    adaEnterprise: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    adaReward: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    adaBase: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    adaExodus: { derivationPathPrefix: "m/44'/1815'" },
    adaLedger: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
  },
  testnetPreprod: {
    adaEnterprise: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    adaReward: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    adaBase: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
  },
  testnetPreview: {
    adaEnterprise: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    adaReward: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    adaBase: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
  },
};

export { adaConfig };
