import { networks } from "bitcoinjs-lib";
import type { CommonNetworkPurposeUnion } from "../../types/index.js";
import type { CommonBip32DerivationConfig } from "./libs/types/index.js";

const COMMON_DERIVATION_PATH_PREFIX = "m/44'/9000'";

type AvaxConfig = {
  [key in CommonNetworkPurposeUnion]: {
    avax: CommonBip32DerivationConfig;
  };
};

const avaxConfig: AvaxConfig = {
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
