import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../types/index.js";
import type { CommonBip32DerivationConfig } from "./libs/types/index.js";

const TESTNET_CONFIG = {
  zecTransparent: {
    prefixConfig: {
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
    derivationPathPrefix: "m/44'/1'",
  },
};

type ZecConfig = {
  [networkPurpose in CommonNetworkPurposeRegTestExtendedUnion]: {
    zecTransparent: CommonBip32DerivationConfig;
  };
};

const zecConfig: ZecConfig = {
  mainnet: {
    zecTransparent: {
      prefixConfig: {
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
      derivationPathPrefix: "m/44'/133'",
    },
  },
  testnet: TESTNET_CONFIG,
  regtest: TESTNET_CONFIG,
};

export { zecConfig };
