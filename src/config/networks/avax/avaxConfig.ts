import { networks } from "bitcoinjs-lib";
import { type AvaxInstanceConfig } from "@/config/types/index.js";

const avaxConfig = {
  mainnet: { avax: { keysConfig: networks.bitcoin } },
  testnet: { avax: { keysConfig: networks.bitcoin } },
  regtest: { avax: { keysConfig: networks.bitcoin } },
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
