import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../types/index.js";
import type { Secp256k1Config } from "./libs/types/index.js";

import type { GetDerivationTypeUnion } from "@/libs/types/types.js";

const derivationPathPrefix = {
  mainnet: "m/44'/3'",
  testnet: "m/44'/1'",
};

const dogeConfig: Secp256k1Config<
  CommonNetworkPurposeRegTestExtendedUnion,
  GetDerivationTypeUnion<"dogeLegacy">
> = {
  mainnet: {
    dogeLegacy: {
      derivationPathPrefix: derivationPathPrefix.mainnet,
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
      derivationPathPrefix: derivationPathPrefix.testnet,
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
      derivationPathPrefix: derivationPathPrefix.testnet,
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
