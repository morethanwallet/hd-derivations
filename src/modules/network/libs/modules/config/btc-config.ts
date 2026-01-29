import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";
import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../types/index.js";
import { getCommonPrefixConfig } from "./libs/helpers/index.js";
import type { Secp256k1Config } from "./libs/types/secp256k1-config.type.js";

const commonTestnetsDerivationPathPrefix = {
  btcLegacy: "m/44'/1'",
  btcSegWit: "m/49'/1'",
  btcNativeSegWit: "m/84'/1'",
  btcTaproot: "m/86'/1'",
  btcP2wsh: "m/48'/1'/0'/2'/0",
  btcP2wshInP2sh: "m/48'/1'/0'/1'/0",
};

const btcConfig: Secp256k1Config<
  CommonNetworkPurposeRegTestExtendedUnion,
  DerivationTypeUnionByNetwork["btc"]
> = {
  mainnet: {
    btcLegacy: {
      derivationPathPrefix: "m/44'/0'",
      ...getCommonPrefixConfig("mainnet"),
    },
    btcP2wshInP2sh: {
      derivationPathPrefix: "m/48'/0'/0'/1'/0",
      ...getCommonPrefixConfig("mainnet"),
    },
    btcSegWit: {
      derivationPathPrefix: "m/49'/0'",
      ...getCommonPrefixConfig("mainnet"),
    },
    btcNativeSegWit: {
      derivationPathPrefix: "m/84'/0'",
      ...getCommonPrefixConfig("mainnet"),
    },
    btcP2wsh: {
      derivationPathPrefix: "m/48'/0'/0'/2'/0",
      ...getCommonPrefixConfig("mainnet"),
    },
    btcTaproot: {
      derivationPathPrefix: "m/86'/0'",
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
