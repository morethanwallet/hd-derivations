import { networks } from "bitcoinjs-lib";
import { getCommonLegacyKeysConfig } from "./libs/helpers/index.js";

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
    legacy: {
      derivationPathPrefix: "m/44'/0'",
      ...getCommonLegacyKeysConfig("mainnet"),
    },
    segWit: {
      derivationPathPrefix: commonSegWitDerivationPathPrefix.mainnet,
      prefixConfig: networks.bitcoin,
    },
    nativeSegWit: {
      derivationPathPrefix: "m/84'/0'",
      prefixConfig: networks.bitcoin,
    },
    taproot: {
      derivationPathPrefix: "m/86'/0'",
      prefixConfig: networks.bitcoin,
    },
    p2wsh: {
      derivationPathPrefix: commonSegWitDerivationPathPrefix.mainnet,
      prefixConfig: networks.bitcoin,
    },
    p2wshInP2sh: {
      derivationPathPrefix: commonSegWitDerivationPathPrefix.mainnet,
      prefixConfig: networks.bitcoin,
    },
  },
  testnet: {
    legacy: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.legacy,
      ...getCommonLegacyKeysConfig("testnet"),
    },
    segWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.segWit,
      prefixConfig: networks.testnet,
    },
    nativeSegWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.nativeSegWit,
      prefixConfig: networks.testnet,
    },
    taproot: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.taproot,
      prefixConfig: networks.testnet,
    },
    p2wsh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.p2wsh,
      prefixConfig: networks.testnet,
    },
    p2wshInP2sh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.p2wshInP2sh,
      prefixConfig: networks.testnet,
    },
  },
  regtest: {
    legacy: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.legacy,
      ...getCommonLegacyKeysConfig("regtest"),
    },
    segWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.segWit,
      prefixConfig: networks.regtest,
    },
    nativeSegWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.nativeSegWit,
      prefixConfig: networks.regtest,
    },
    taproot: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.taproot,
      prefixConfig: networks.regtest,
    },
    p2wsh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.p2wsh,
      prefixConfig: networks.regtest,
    },
    p2wshInP2sh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.p2wshInP2sh,
      prefixConfig: networks.regtest,
    },
  },
};

export { btcConfig };
