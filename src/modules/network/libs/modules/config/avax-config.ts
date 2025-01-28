import { networks } from "bitcoinjs-lib";
import type { CommonNetworkPurposeUnion } from "../../types/index.js";
import type { PrefixConfig } from "@/libs/modules/keys/index.js";

const COMMON_DERIVATION_PATH_PREFIX = "m/44'/9000'";

type AvaxConfig = {
  [key in CommonNetworkPurposeUnion]: {
    avax: {
      derivationPathPrefix: string;
      prefixConfig: PrefixConfig;
    };
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
