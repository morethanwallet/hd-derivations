import { type KeysConfig } from "@/address/index.js";
import { networks } from "bitcoinjs-lib";
import { type NetworkPurpose } from "@/families/index.js";
import { type BitcoinAddress } from "../types/index.js";

type Config = {
  [networkPurpose in NetworkPurpose]: {
    [address in BitcoinAddress]: {
      keysConfig: KeysConfig;
    };
  };
};

const config: Config = {
  mainnet: {
    btcLegacy: { keysConfig: networks.bitcoin },
    btcNativeSegWit: { keysConfig: networks.bitcoin },
    btcP2wsh: { keysConfig: networks.bitcoin },
    btcP2wshInP2sh: { keysConfig: networks.bitcoin },
    btcSegWit: { keysConfig: networks.bitcoin },
    btcTaproot: { keysConfig: networks.bitcoin },
  },
  testnet: {
    btcLegacy: { keysConfig: networks.testnet },
    btcNativeSegWit: { keysConfig: networks.testnet },
    btcP2wsh: { keysConfig: networks.testnet },
    btcP2wshInP2sh: { keysConfig: networks.testnet },
    btcSegWit: { keysConfig: networks.testnet },
    btcTaproot: { keysConfig: networks.testnet },
  },
  regtest: {
    btcLegacy: { keysConfig: networks.regtest },
    btcNativeSegWit: { keysConfig: networks.regtest },
    btcP2wsh: { keysConfig: networks.regtest },
    btcP2wshInP2sh: { keysConfig: networks.regtest },
    btcSegWit: { keysConfig: networks.regtest },
    btcTaproot: { keysConfig: networks.regtest },
  },
};

export { config };
