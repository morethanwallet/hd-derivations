import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../types/index.js";
import { getCommonPrefixConfig } from "./libs/helpers/index.js";
import type { Secp256k1Config } from "./libs/types/index.js";

import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";

const derivationPathPrefix = {
  mainnet: "m/44'/145'",
  testnet: "m/44'/1'",
};

const bchConfig: Secp256k1Config<
  CommonNetworkPurposeRegTestExtendedUnion,
  DerivationTypeUnionByNetwork["bch"]
> = {
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
