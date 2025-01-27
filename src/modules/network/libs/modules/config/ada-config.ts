const COMMON_DERIVATION_PATH_PREFIX = "m/1852'/1815'";

const adaConfig = {
  mainnet: {
    enterprise: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    reward: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    adaBase: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
  },
  testnetPreprod: {
    enterprise: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    reward: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    adaBase: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
  },
  testnetPreview: {
    enterprise: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    reward: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
    adaBase: { derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX },
  },
};

export { adaConfig };
