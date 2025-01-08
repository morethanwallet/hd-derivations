import { type KeysConfig } from "@/address/index.js";
import { type AddressType } from "@/address/dogecoin/index.js";
import { type NetworkPurpose } from "@/families/index.js";

type Config = {
  [networkPurpose in NetworkPurpose]: {
    [address in AddressType]: {
      keysConfig: KeysConfig;
    };
  };
};

const config: Config = {
  mainnet: {
    legacy: {
      keysConfig: {
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
    legacy: {
      keysConfig: {
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
    legacy: {
      keysConfig: {
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

export { config };
