import { type AdaInstanceConfig } from "@/config/types/index.js";

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

const defaultAdaInstanceConfig: AdaInstanceConfig = {
  network: "ada",
  mnemonic: "",
  networkPurpose: "mainnet",
  derivationConfigs: [
    { derivationType: "enterprise" },
    { derivationType: "reward" },
    { derivationType: "adaBase" },
  ],
};

export { adaConfig, defaultAdaInstanceConfig };
