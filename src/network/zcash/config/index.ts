import { type KeysConfig } from "@/address/index.js";
import { type AddressType } from "@/address/zcash/index.js";
import { type NetworkPurpose } from "@/network/index.js";

type Config = {
  [networkPurpose in NetworkPurpose]: {
    [address in AddressType]: {
      keysConfig: KeysConfig;
    };
  };
};

const config: Config = {
  mainnet: {
    transparent: {
      keysConfig: {
        messagePrefix: "\x18Zcash Signed Message:\n",
        bech32: "t1",
        bip32: {
          public: 0x0488b21e,
          private: 0x0488ade4,
        },
        pubKeyHash: 0x1cb8,
        scriptHash: 0x1cbd,
        wif: 0x80,
      },
    },
  },
  testnet: {
    transparent: {
      keysConfig: {
        messagePrefix: "\x18Zcash Signed Message:\n",
        bech32: "tm",
        bip32: {
          public: 0x043587cf,
          private: 0x04358394,
        },
        pubKeyHash: 0x1d25,
        scriptHash: 0x1cba,
        wif: 0xef,
      },
    },
  },
  regtest: {
    transparent: {
      keysConfig: {
        messagePrefix: "\x18Zcash Signed Message:\n",
        bech32: "tm",
        bip32: {
          public: 0x043587cf,
          private: 0x04358394,
        },
        pubKeyHash: 0x1d25,
        scriptHash: 0x1cba,
        wif: 0xef,
      },
    },
  },
};

export { config };
