import { networks } from "bitcoinjs-lib";

const COMMON_LEGACY_MAINNET_CONFIG = { keysConfig: networks.bitcoin };
const COMMON_LEGACY_TESTNET_CONFIG = { keysConfig: networks.testnet };
const COMMON_LEGACY_REGTEST_CONFIG = { keysConfig: networks.regtest };

const bitcoinFamilyConfig = {
  btc: {
    mainnet: {
      ...COMMON_LEGACY_MAINNET_CONFIG,
      nativeSegWit: { keysConfig: networks.bitcoin },
      p2wsh: { keysConfig: networks.bitcoin },
      p2wshInP2sh: { keysConfig: networks.bitcoin },
      segWit: { keysConfig: networks.bitcoin },
      taproot: { keysConfig: networks.bitcoin },
    },
    testnet: {
      ...COMMON_LEGACY_TESTNET_CONFIG,
      nativeSegWit: { keysConfig: networks.testnet },
      p2wsh: { keysConfig: networks.testnet },
      p2wshInP2sh: { keysConfig: networks.testnet },
      segWit: { keysConfig: networks.testnet },
      taproot: { keysConfig: networks.testnet },
    },
    regtest: {
      ...COMMON_LEGACY_REGTEST_CONFIG,
      nativeSegWit: { keysConfig: networks.regtest },
      p2wsh: { keysConfig: networks.regtest },
      p2wshInP2sh: { keysConfig: networks.regtest },
      segWit: { keysConfig: networks.regtest },
      taproot: { keysConfig: networks.regtest },
    },
  },
  bch: {
    mainnet: {
      ...COMMON_LEGACY_MAINNET_CONFIG,
      cashAddr: { keysConfig: networks.bitcoin },
    },
    testnet: {
      ...COMMON_LEGACY_TESTNET_CONFIG,
      cashAddr: { keysConfig: networks.testnet },
    },
    regtest: {
      ...COMMON_LEGACY_REGTEST_CONFIG,
      cashAddr: { keysConfig: networks.regtest },
    },
  },
};

export { bitcoinFamilyConfig };
