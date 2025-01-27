import { networks } from "bitcoinjs-lib";

const COMMON_DERIVATION_PATH_PREFIX = "m/44'/9000'";

const avaxConfig = {
  mainnet: {
    avax: {
      derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX,
      prefixConfig: { ...networks.bitcoin, bech32: "avax" },
    },
  },
  testnet: {
    avax: {
      derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX,
      prefixConfig: { ...networks.bitcoin, bech32: "fuji" },
    },
  },
};

export { avaxConfig };
