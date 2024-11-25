import { type KeysConfig } from "@/address/index.js";
import { type Address } from "../types/index.js";
import { type NetworkType } from "@/network/index.js";
import { networks } from "bitcoinjs-lib";

type Config = {
  [networkType in NetworkType]: {
    [address in Address]: {
      keysConfig: KeysConfig;
    };
  };
};

const config: Config = {
  mainnet: {
    cashAddr: {
      keysConfig: networks.bitcoin,
    },
    legacy: {
      keysConfig: networks.bitcoin,
    },
  },
  testnet: {
    cashAddr: {
      keysConfig: networks.testnet,
    },
    legacy: {
      keysConfig: networks.testnet,
    },
  },
  regtest: {
    cashAddr: {
      keysConfig: networks.regtest,
    },
    legacy: {
      keysConfig: networks.regtest,
    },
  },
};

export { config };
