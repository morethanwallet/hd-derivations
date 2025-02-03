import type { BchDerivationTypeUnion } from "@/libs/types/index.js";
import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../types/index.js";
import { getCommonPrefixConfig } from "./libs/helpers/index.js";
import type { CommonBip32DerivationConfig } from "./libs/types/index.js";

const derivationPathPrefix = {
  mainnet: "m/44'/145'",
  testnet: "m/44'/1'",
};

type BchConfig = {
  [key in CommonNetworkPurposeRegTestExtendedUnion]: {
    [key in BchDerivationTypeUnion]: CommonBip32DerivationConfig;
  };
};

const bchConfig: BchConfig = {
  mainnet: {
    bchLegacy: {
      ...getCommonPrefixConfig("mainnet"),
      derivationPathPrefix: derivationPathPrefix.mainnet,
    },
    bchCashAddr: {
      ...getCommonPrefixConfig("mainnet"),
      derivationPathPrefix: derivationPathPrefix.mainnet,
    },
  },
  testnet: {
    bchLegacy: {
      ...getCommonPrefixConfig("testnet"),
      derivationPathPrefix: derivationPathPrefix.testnet,
    },
    bchCashAddr: {
      ...getCommonPrefixConfig("testnet"),
      derivationPathPrefix: derivationPathPrefix.testnet,
    },
  },
  regtest: {
    bchLegacy: {
      ...getCommonPrefixConfig("regtest"),
      derivationPathPrefix: derivationPathPrefix.testnet,
    },
    bchCashAddr: {
      ...getCommonPrefixConfig("regtest"),
      derivationPathPrefix: derivationPathPrefix.testnet,
    },
  },
};

export { bchConfig };
