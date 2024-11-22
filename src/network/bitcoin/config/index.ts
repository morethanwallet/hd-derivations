import { type KeysConfig } from "@/address/index.js";
import { type BitcoinAddress } from "../types/index.js";
import { networks } from "bitcoinjs-lib";
import { type NetworkType } from "@/network/index.js";

type Config = {
  [networkType in NetworkType]: {
    [address in BitcoinAddress]: {
      keysConfig: KeysConfig;
    };
  };
};

const config: Config = {
  mainnet: {
    legacy: { keysConfig: networks.bitcoin },
    nativeSegWit: { keysConfig: networks.bitcoin },
    p2wsh: { keysConfig: networks.bitcoin },
    p2wshInP2sh: { keysConfig: networks.bitcoin },
    segWit: { keysConfig: networks.bitcoin },
    taproot: { keysConfig: networks.bitcoin },
  },
  testnet: {
    legacy: { keysConfig: networks.testnet },
    nativeSegWit: { keysConfig: networks.testnet },
    p2wsh: { keysConfig: networks.testnet },
    p2wshInP2sh: { keysConfig: networks.testnet },
    segWit: { keysConfig: networks.testnet },
    taproot: { keysConfig: networks.testnet },
  },
  regtest: {
    legacy: { keysConfig: networks.regtest },
    nativeSegWit: { keysConfig: networks.regtest },
    p2wsh: { keysConfig: networks.regtest },
    p2wshInP2sh: { keysConfig: networks.regtest },
    segWit: { keysConfig: networks.regtest },
    taproot: { keysConfig: networks.regtest },
  },
};

export { config };
