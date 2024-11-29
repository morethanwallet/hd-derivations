import { type KeysConfig } from "@/address/index.js";
import { type AddressType } from "@/address/bitcoin-cash/index.js";
import { type NetworkPurpose } from "@/network/index.js";
import { networks } from "bitcoinjs-lib";

type Config = {
  [networkPurpose in NetworkPurpose]: {
    [address in AddressType]: {
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
