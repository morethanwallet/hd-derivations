import { type KeysConfig } from "@/keyDerivation/index.js";
import { networks } from "bitcoinjs-lib";
import { type NetworkPurpose } from "@/families/index.js";
import { type BitcoinAddressList } from "../types/index.js";

type Config = {
  [networkPurpose in NetworkPurpose]: {
    [address in BitcoinAddressList]: {
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
