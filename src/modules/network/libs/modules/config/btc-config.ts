import { getCommonPrefixConfig } from "./libs/helpers/index.js";

const commonSegWitDerivationPathPrefix = {
  mainnet: "m/49'/0'",
  testnet: "m/49'/1'",
};

const commonTestnetsDerivationPathPrefix = {
  btcLegacy: "m/44'/1'",
  btcSegWit: commonSegWitDerivationPathPrefix.testnet,
  btcNativeSegWit: "m/84'/1'",
  btcTaproot: "m/86'/1'",
  btcP2wsh: commonSegWitDerivationPathPrefix.testnet,
  btcP2wshInP2sh: commonSegWitDerivationPathPrefix.testnet,
};

const btcConfig = {
  mainnet: {
    btcLegacy: {
      derivationPathPrefix: "m/44'/0'",
      ...getCommonPrefixConfig("mainnet"),
    },
    btcSegWit: {
      derivationPathPrefix: commonSegWitDerivationPathPrefix.mainnet,
      ...getCommonPrefixConfig("mainnet"),
    },
    btcNativeSegWit: {
      derivationPathPrefix: "m/84'/0'",
      ...getCommonPrefixConfig("mainnet"),
    },
    btcTaproot: {
      derivationPathPrefix: "m/86'/0'",
      ...getCommonPrefixConfig("mainnet"),
    },
    btcP2wsh: {
      derivationPathPrefix: commonSegWitDerivationPathPrefix.mainnet,
      ...getCommonPrefixConfig("mainnet"),
    },
    btcP2wshInP2sh: {
      derivationPathPrefix: commonSegWitDerivationPathPrefix.mainnet,
      ...getCommonPrefixConfig("mainnet"),
    },
  },
  testnet: {
    btcLegacy: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcLegacy,
      ...getCommonPrefixConfig("testnet"),
    },
    btcSegWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcSegWit,
      ...getCommonPrefixConfig("testnet"),
    },
    btcNativeSegWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcNativeSegWit,
      ...getCommonPrefixConfig("testnet"),
    },
    btcTaproot: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcTaproot,
      ...getCommonPrefixConfig("testnet"),
    },
    btcP2wsh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcP2wsh,
      ...getCommonPrefixConfig("testnet"),
    },
    btcP2wshInP2sh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcP2wshInP2sh,
      ...getCommonPrefixConfig("testnet"),
    },
  },
  regtest: {
    btcLegacy: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcLegacy,
      ...getCommonPrefixConfig("regtest"),
    },
    btcSegWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcSegWit,
      ...getCommonPrefixConfig("regtest"),
    },
    btcNativeSegWit: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcNativeSegWit,
      ...getCommonPrefixConfig("regtest"),
    },
    btcTaproot: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcTaproot,
      ...getCommonPrefixConfig("regtest"),
    },
    btcP2wsh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcP2wsh,
      ...getCommonPrefixConfig("regtest"),
    },
    btcP2wshInP2sh: {
      derivationPathPrefix: commonTestnetsDerivationPathPrefix.btcP2wshInP2sh,
      ...getCommonPrefixConfig("regtest"),
    },
  },
};

export { btcConfig };
