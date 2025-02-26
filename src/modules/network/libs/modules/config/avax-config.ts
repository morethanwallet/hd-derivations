import { networks } from "bitcoinjs-lib";
import type { CommonNetworkPurposeUnion } from "../../types/index.js";
import type { Secp256k1Config } from "./libs/types/index.js";
import type { AvaxDerivationTypeUnion } from "@/libs/types/index.js";

const COMMON_DERIVATION_PATH_PREFIX = "m/44'/9000'";

type AvaxConfig = Secp256k1Config<
  CommonNetworkPurposeUnion,
  AvaxDerivationTypeUnion,
  { prefix: string }
>;

const avaxConfig: AvaxConfig = {
  mainnet: {
    avaxX: {
      derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX,
      prefixConfig: { ...networks.bitcoin, bech32: "avax" },
      prefix: "X-",
    },
    avaxP: {
      derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX,
      prefixConfig: { ...networks.bitcoin, bech32: "avax" },
      prefix: "P-",
    },
  },
  testnet: {
    avaxX: {
      derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX,
      prefixConfig: { ...networks.bitcoin, bech32: "fuji" },
      prefix: "X-",
    },
    avaxP: {
      derivationPathPrefix: COMMON_DERIVATION_PATH_PREFIX,
      prefixConfig: { ...networks.bitcoin, bech32: "fuji" },
      prefix: "P-",
    },
  },
};

export { avaxConfig };
