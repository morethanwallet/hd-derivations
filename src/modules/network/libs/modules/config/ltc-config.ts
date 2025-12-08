import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";
import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../types/index.js";
import type { Secp256k1Config } from "./libs/types/index.js";

const TESTNETS_DERIVATION_PATH_PREFIX = {
  ltcLegacy: "m/44'/1'",
  ltcSegWit: "m/49'/1'",
  ltcNativeSegWit: "m/84'/1'",
};

const COMMON_TESTNETS_PREFIX_CONFIG = {
  messagePrefix: "\x19Litecoin Signed Message:\n",
  bip32: { public: 0x043587cf, private: 0x04358394 },
  pubKeyHash: 0x6f,
  scriptHash: 0x3a,
  wif: 0xef,
};

const PREFIX_CONFIG = {
  mainnet: {
    bech32: "ltc",
    messagePrefix: "\x19Litecoin Signed Message:\n",
    bip32: { public: 0x0488b21e, private: 0x0488ade4 },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
  },
  testnet: {
    ...COMMON_TESTNETS_PREFIX_CONFIG,
    bech32: "tltc",
  },
  regtest: {
    ...COMMON_TESTNETS_PREFIX_CONFIG,
    bech32: "rltc",
  },
};

const ltcConfig: Secp256k1Config<
  CommonNetworkPurposeRegTestExtendedUnion,
  DerivationTypeUnionByNetwork["ltc"]
> = {
  mainnet: {
    ltcLegacy: { derivationPathPrefix: "m/44'/2'", prefixConfig: PREFIX_CONFIG.mainnet },
    ltcSegWit: { derivationPathPrefix: "m/49'/2'", prefixConfig: PREFIX_CONFIG.mainnet },
    ltcNativeSegWit: {
      derivationPathPrefix: "m/84'/2'",
      prefixConfig: PREFIX_CONFIG.mainnet,
    },
  },
  testnet: {
    ltcLegacy: {
      derivationPathPrefix: TESTNETS_DERIVATION_PATH_PREFIX.ltcLegacy,
      prefixConfig: PREFIX_CONFIG.testnet,
    },
    ltcSegWit: {
      derivationPathPrefix: TESTNETS_DERIVATION_PATH_PREFIX.ltcSegWit,
      prefixConfig: PREFIX_CONFIG.testnet,
    },
    ltcNativeSegWit: {
      derivationPathPrefix: TESTNETS_DERIVATION_PATH_PREFIX.ltcNativeSegWit,
      prefixConfig: PREFIX_CONFIG.testnet,
    },
  },
  regtest: {
    ltcLegacy: {
      derivationPathPrefix: TESTNETS_DERIVATION_PATH_PREFIX.ltcLegacy,
      prefixConfig: PREFIX_CONFIG.regtest,
    },
    ltcSegWit: {
      derivationPathPrefix: TESTNETS_DERIVATION_PATH_PREFIX.ltcSegWit,
      prefixConfig: PREFIX_CONFIG.regtest,
    },
    ltcNativeSegWit: {
      derivationPathPrefix: TESTNETS_DERIVATION_PATH_PREFIX.ltcNativeSegWit,
      prefixConfig: PREFIX_CONFIG.regtest,
    },
  },
};

export { ltcConfig };
