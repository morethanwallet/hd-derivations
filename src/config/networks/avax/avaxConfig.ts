import { networks } from "bitcoinjs-lib";
import { type AvaxInstanceConfig } from "@/config/types/index.js";

const COMMON_DERIVATION_PATH_PREFIX = "m/44'/9000'";

const avaxConfig = {
  mainnet: {
    avax: {
      derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX,
      keysConfig: { ...networks.bitcoin, bech32: "avax" },
    },
  },
  testnet: {
    avax: {
      derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX,
      keysConfig: { ...networks.bitcoin, bech32: "fuji" },
    },
  },
};

const defaultAvaxInstanceConfig: AvaxInstanceConfig = {
  network: "avax",
  mnemonic: "",
  networkPurpose: "mainnet",
  derivationConfigs: [
    { derivationType: "avaxP", keysConfig: avaxConfig.mainnet.avax.keysConfig },
    { derivationType: "avaxX", keysConfig: avaxConfig.mainnet.avax.keysConfig },
  ],
};

export { avaxConfig, defaultAvaxInstanceConfig };
