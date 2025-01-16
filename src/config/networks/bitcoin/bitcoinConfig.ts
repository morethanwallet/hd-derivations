import { networks } from "bitcoinjs-lib";
import { getCommonLegacyKeysConfig } from "../../helpers/getCommonLegacyKeysConfig.helper.js";

// const config = {
//   bip44: {
//     class: CommonBipKeyDerivation,
//     config: {
//       mainnet: {
//         keysConfig: {
//           bech32: "",
//           bip32: { private: 0x1, public: 0x1 },
//           messagePrefix: "",
//           pubKeyHash: 0x1,
//           scriptHash: 0x1,
//           wif: 0x1,
//         },
//       },
//     },
//   },
//   solana: {
//     class: SolanaKeyDerivation,
//     config: {
//       mainnet: {
//         keysConfig: {},
//       },
//     },
//   },
// };

// class Test {
//   private keyDerivations = {} as {
//     [key in keyof typeof config]: InstanceType<ValueOf<typeof config>["class"]>;
//   };

//   constructor(
//     mnemonic: string,
//     networkPurpose: "mainnet",
//     network: "bitcoin",
//     keyDerivation: keyof typeof config
//   ) {
//     const mnemonicInstance = new Mnemonic(mnemonic);
//     this.keyDerivations[keyDerivation] = new config[keyDerivation].class({
//       mnemonic: mnemonicInstance,
//       ...config[keyDerivation].config[networkPurpose],
//     });
//   }

//   public deriveFromMnemonic(keyDerivation: keyof typeof config) {
//     return this.keyDerivations[keyDerivation].deriveFromMnemonic({
//       derivationPath: "",
//       base58RootKey: "",
//     });
//   }
// }

const bitcoinConfig = {
  mainnet: {
    legacy: getCommonLegacyKeysConfig("mainnet"),
    nativeSegWit: { keysConfig: networks.bitcoin },
    p2wsh: { keysConfig: networks.bitcoin },
    p2wshInP2sh: { keysConfig: networks.bitcoin },
    segWit: { keysConfig: networks.bitcoin },
    taproot: { keysConfig: networks.bitcoin },
  },
  testnet: {
    legacy: getCommonLegacyKeysConfig("testnet"),
    nativeSegWit: { keysConfig: networks.testnet },
    p2wsh: { keysConfig: networks.testnet },
    p2wshInP2sh: { keysConfig: networks.testnet },
    segWit: { keysConfig: networks.testnet },
    taproot: { keysConfig: networks.testnet },
  },
  regtest: {
    legacy: getCommonLegacyKeysConfig("regtest"),
    nativeSegWit: { keysConfig: networks.regtest },
    p2wsh: { keysConfig: networks.regtest },
    p2wshInP2sh: { keysConfig: networks.regtest },
    segWit: { keysConfig: networks.regtest },
    taproot: { keysConfig: networks.regtest },
  },
  // bch: {
  //   mainnet: {
  //     ...COMMON_LEGACY_MAINNET_CONFIG,
  //     cashAddr: { keysConfig: networks.bitcoin },
  //   },
  //   testnet: {
  //     ...COMMON_LEGACY_TESTNET_CONFIG,
  //     cashAddr: { keysConfig: networks.testnet },
  //   },
  //   regtest: {
  //     ...COMMON_LEGACY_REGTEST_CONFIG,
  //     cashAddr: { keysConfig: networks.regtest },
  //   },
  // },
};

export { bitcoinConfig };
