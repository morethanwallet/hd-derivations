import { networks } from "bitcoinjs-lib";
import { getCommonLegacyKeysConfig } from "../../helpers/index.js";
import { type BtcInstanceConfig } from "@/config/types/index.js";

const commonSegWitDerivationPathPrefix = {
  mainnet: "m/49'/0'",
  testnet: "m/49'/1'",
};

const commonTestnetsDerivationPathPrefix = {
  legacy: "m/44'/1'",
  segWit: commonSegWitDerivationPathPrefix.testnet,
  nativeSegWit: "m/84'/1'",
  taproot: "m/86'/1'",
  p2wsh: commonSegWitDerivationPathPrefix.testnet,
  p2wshInP2sh: commonSegWitDerivationPathPrefix.testnet,
};

const btcConfig = {
  mainnet: {
    legacy: { derivationPathPrefix: "m/44'/0'", ...getCommonLegacyKeysConfig("mainnet") },
    segWit: {
      derivationPathPrefix: commonSegWitDerivationPathPrefix.mainnet,
      keysConfig: networks.bitcoin,
    },
    nativeSegWit: { derivationPathPrefix: "m/84'/0'", keysConfig: networks.bitcoin },
    taproot: { derivationPathPrefix: "m/86'/0'", keysConfig: networks.bitcoin },
    p2wsh: {
      derivationPathPrefix: commonSegWitDerivationPathPrefix.mainnet,
      keysConfig: networks.bitcoin,
    },
    p2wshInP2sh: {
      derivationPathPrefix: commonSegWitDerivationPathPrefix.mainnet,
      keysConfig: networks.bitcoin,
    },
  },
  testnet: {
    legacy: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.legacy,
      ...getCommonLegacyKeysConfig("testnet"),
    },
    segWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.segWit,
      keysConfig: networks.testnet,
    },
    nativeSegWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.nativeSegWit,
      keysConfig: networks.testnet,
    },
    taproot: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.taproot,
      keysConfig: networks.testnet,
    },
    p2wsh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.p2wsh,
      keysConfig: networks.testnet,
    },
    p2wshInP2sh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.p2wshInP2sh,
      keysConfig: networks.testnet,
    },
  },
  regtest: {
    legacy: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.legacy,
      ...getCommonLegacyKeysConfig("regtest"),
    },
    segWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.segWit,
      keysConfig: networks.regtest,
    },
    nativeSegWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.nativeSegWit,
      keysConfig: networks.regtest,
    },
    taproot: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.taproot,
      keysConfig: networks.regtest,
    },
    p2wsh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.p2wsh,
      keysConfig: networks.regtest,
    },
    p2wshInP2sh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.p2wshInP2sh,
      keysConfig: networks.regtest,
    },
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
