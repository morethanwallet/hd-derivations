import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../types/index.js";
import type { CommonBip32DerivationConfig } from "./libs/types/index.js";

const commonDerivationPathPrefix = {
  mainnet: "m/44'/3'",
  testnet: "m/44'/1'",
};

type DogeConfig = {
  [networkPurpose in CommonNetworkPurposeRegTestExtendedUnion]: {
    dogeLegacy: CommonBip32DerivationConfig;
  };
};

const dogeConfig: DogeConfig = {
  mainnet: {
    dogeLegacy: {
      derivationPathPrefix: commonDerivationPathPrefix.mainnet,
      prefixConfig: {
        messagePrefix: "\x19Dogecoin Signed Message:\n",
        bech32: "doge",
        bip32: {
          public: 0x02facafd,
          private: 0x02fac398,
        },
        pubKeyHash: 0x1e,
        scriptHash: 0x16,
        wif: 0x9e,
      },
    },
  },
  testnet: {
    dogeLegacy: {
      derivationPathPrefix: commonDerivationPathPrefix.testnet,
      prefixConfig: {
        messagePrefix: "\x19Dogecoin Signed Message:\n",
        bech32: "doge",
        bip32: {
          public: 0x043587cf,
          private: 0x04358394,
        },
        pubKeyHash: 0x71,
        scriptHash: 0xc4,
        wif: 0xf1,
      },
    },
  },
  regtest: {
    dogeLegacy: {
      derivationPathPrefix: commonDerivationPathPrefix.testnet,
      prefixConfig: {
        messagePrefix: "\x19Dogecoin Signed Message:\n",
        bech32: "dcrt",
        bip32: {
          public: 0x043587cf,
          private: 0x04358394,
        },
        pubKeyHash: 0x6f,
        scriptHash: 0xc4,
        wif: 0xef,
      },
    },
  },
};

export { dogeConfig };
