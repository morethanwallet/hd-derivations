import { networks } from "bitcoinjs-lib";
import { getCommonLegacyKeysConfig } from "../../helpers/index.js";
import { type BtcInstanceConfig } from "@/config/types/index.js";

const btcConfig = {
  mainnet: {
    legacy: getCommonLegacyKeysConfig("mainnet"),
    nativeSegWit: { keysConfig: networks.bitcoin },
    p2wsh: { keysConfig: networks.bitcoin },
    p2wshInP2sh: { keysConfig: networks.bitcoin },
    segWit: { keysConfig: networks.bitcoin },
    taproot: { keysConfig: networks.bitcoin },
  },
  testnet: {
    legacy: getCommonLegacyKeysConfig("testnet"),
    nativeSegWit: { keysConfig: networks.testnet },
    p2wsh: { keysConfig: networks.testnet },
    p2wshInP2sh: { keysConfig: networks.testnet },
    segWit: { keysConfig: networks.testnet },
    taproot: { keysConfig: networks.testnet },
  },
  regtest: {
    legacy: getCommonLegacyKeysConfig("regtest"),
    nativeSegWit: { keysConfig: networks.regtest },
    p2wsh: { keysConfig: networks.regtest },
    p2wshInP2sh: { keysConfig: networks.regtest },
    segWit: { keysConfig: networks.regtest },
    taproot: { keysConfig: networks.regtest },
  },
};

const defaultBtcInstanceConfig: BtcInstanceConfig = {
  network: "btc",
  mnemonic: "",
  networkPurpose: "mainnet",
  derivationConfigs: [
    { derivationType: "legacy", keysConfig: btcConfig.mainnet.legacy.keysConfig },
    { derivationType: "segWit", keysConfig: btcConfig.mainnet.segWit.keysConfig },
    { derivationType: "nativeSegWit", keysConfig: btcConfig.mainnet.nativeSegWit.keysConfig },
    { derivationType: "taproot", keysConfig: btcConfig.mainnet.taproot.keysConfig },
    { derivationType: "p2wsh", keysConfig: btcConfig.mainnet.p2wsh.keysConfig },
    { derivationType: "p2wshInP2sh", keysConfig: btcConfig.mainnet.p2wshInP2sh.keysConfig },
  ],
};

export { btcConfig, defaultBtcInstanceConfig };
