import { type NetworkPurposeUnion } from "@/families/types/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { networks } from "bitcoinjs-lib";
import { AddressUnion } from "../types/index.js";

type Config = {
  [networkPurpose in NetworkPurposeUnion]: {
    [address in AddressUnion]: {
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
