// import { Mnemonic } from "@/mnemonic/index.js";
// import { Bitcoin } from "../index.js";
// import { describe, it, expect } from "vitest";
// import { EMPTY_MNEMONIC } from "@/keyDerivation/constants/index.js";

// const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

// const MOCK_COMMON_DERIVATION_PATH = {
//   mainnet: {
//     legacy: "m/44'/0'/0'/0/0",
//     segWit: "m/49'/0'/0'/0/0",
//     nativeSegWit: "m/84'/0'/0'/0/0",
//     taproot: "m/86'/0'/0'/0/0",
//   },
//   testnet: {
//     legacy: "m/44'/1'/0'/0/0",
//     segWit: "m/49'/1'/0'/0/0",
//     nativeSegWit: "m/84'/1'/0'/0/0",
//     taproot: "m/86'/1'/0'/0/0",
//   },
// };

// const MOCK_COMMON_MAINNET_SEGWIT_ADDRESS_DATA = {
//   native: {
//     mnemonic: MNEMONIC,
//     privateKey: "KzJPKD7B7wezTn9QZvHAGSH2CXvdhmcurq3WoEvsgPpBwzitdC81",
//     publicKey: "0317e1f9c3fd3d6d630cf1f1f4ec442cb9a93ff8c076ab71bcad5bb7ed8d17348c",
//     path: MOCK_COMMON_DERIVATION_PATH.mainnet.segWit,
//   },
//   nonNative: {
//     mnemonic: EMPTY_MNEMONIC,
//     privateKey: "KxvjmXm3z1s7L4WeRvbWHD54UhKnGVqst9QL9vd2jZ4zUKsHZrKx",
//     publicKey: "0217007e56bf94ddba9898ed2bedcd1692dbbbf34824bcd81bd0f55ac5329e6098",
//     path: MOCK_COMMON_DERIVATION_PATH.mainnet.segWit,
//   },
// };

// const MOCK_MAINNET_ADDRESS_DATA = {
//   native: {
//     legacy: {
//       mnemonic: MNEMONIC,
//       address: "176d1FZHP88mMFoyaTA2sZ5UA19CY33Phn",
//       privateKey: "L3hhRruT6ZGHKutu49Spfq68zHuhGDm8b7ahr4bcLD2AbTJWBJnr",
//       publicKey: "03d3f020b78cc3c5b0e7bb49ef8e13d9718ef223b34819fb4c5c35ddec76bc90c0",
//       path: MOCK_COMMON_DERIVATION_PATH.mainnet.legacy,
//     },
//     segWit: {
//       ...MOCK_COMMON_MAINNET_SEGWIT_ADDRESS_DATA.native,
//       address: "3QZgY2mGE3ugcjjjq956v4JsbFVjr6xCd9",
//     },
//     nativeSegWit: {
//       mnemonic: MNEMONIC,
//       address: "bc1qzccrsckwsr7t76sz54kjwmhkxyts94e573hpd8",
//       privateKey: "L4VQdCsiDczvSBSAro7GvS41qkFdMAy8htNF5Zcx6g4ip5C88DKC",
//       publicKey: "02326c7f6b115952cf752f27bfbedcebfa93f6b3f460aac780e76be12d805a9d04",
//       path: MOCK_COMMON_DERIVATION_PATH.mainnet.nativeSegWit,
//     },
//     taproot: {
//       mnemonic: MNEMONIC,
//       address: "bc1pqlgwhczvyfftzu8kjwkmyxay4xd2qghmazwqty8dtw5sempknd2qhkag2t",
//       privateKey: "L4obzibVhVrw5V2hCUQAiipuXBw5X8W1bdR3WzTZUgafDLmeUzzR",
//       publicKey: "eb2c29de66f2581f95f881847492bab0a9e9000856202bf1f10d537f6eeacfe5",
//       path: MOCK_COMMON_DERIVATION_PATH.mainnet.taproot,
//     },
//     p2wsh: {
//       ...MOCK_COMMON_MAINNET_SEGWIT_ADDRESS_DATA.native,
//       address: "bc1q6vdym5mjce2jc00qv03eu7t0g7cprr5kye6xcvvw5xs2uf250nns3r3sn6",
//     },
//     p2wshInP2sh: {
//       ...MOCK_COMMON_MAINNET_SEGWIT_ADDRESS_DATA.native,
//       address: "3HRjXgMDRKK8rn9wfVFad28jyHT82KPfo3",
//     },
//   },
//   nonNative: {
//     legacy: {
//       mnemonic: EMPTY_MNEMONIC,
//       address: "1DpokrQjdBPbgxhvA7DuwEa2d4sAWxGe2K",
//       privateKey: "L2qPambu4AcbJTfATtyJDyMpTRDdeTX1A8RpNDSvcHWbFADogPwK",
//       publicKey: "03ef3463bbb9bb2de72842c2d45035f7cdcc1d6de6c339a6dd504445e4019626bc",
//       path: MOCK_COMMON_DERIVATION_PATH.mainnet.legacy,
//     },
//     segWit: {
//       ...MOCK_COMMON_MAINNET_SEGWIT_ADDRESS_DATA.nonNative,
//       address: "3Kbe5cjR2c7GBzwcK3GRCaUxkP88KEbseh",
//     },
//     nativeSegWit: {
//       mnemonic: EMPTY_MNEMONIC,
//       address: "bc1qsy9hltg0u8an5g0kuty23e3hdve2eqaxaadv3y",
//       privateKey: "L2oT3UVFFqESwhuwJBsV3LX61aDRQWfiiFKpbghtbArTVWMP84uH",
//       publicKey: "035e80a741f89eb8dbe171d7841968a7296dd6dc0cb75d4d85b45de16c1014fa71",
//       path: MOCK_COMMON_DERIVATION_PATH.mainnet.nativeSegWit,
//     },
//     taproot: {
//       mnemonic: EMPTY_MNEMONIC,
//       address: "bc1pndv2wuuprqu4ku5c4dz3uvke3s8n0yf4wkdejcu53uprwfwc9h8qv59h9a",
//       privateKey: "L17b91gnDPNZiqaubKXrDzzRQaiJkizmvzMWqxc4mxuy7WkFGQLL",
//       publicKey: "c5a5b24c05fcc0c98a217ef9df5984a08ab2db876be75b4f6fb64fdfb2149499",
//       path: MOCK_COMMON_DERIVATION_PATH.mainnet.taproot,
//     },
//     p2wsh: {
//       ...MOCK_COMMON_MAINNET_SEGWIT_ADDRESS_DATA.nonNative,
//       address: "bc1qrg29edwwkhjvtd8lv34l78auknm96zhrd23sgmvfeuw6e3qt0yqqz4zgjj",
//     },
//     p2wshInP2sh: {
//       ...MOCK_COMMON_MAINNET_SEGWIT_ADDRESS_DATA.nonNative,
//       address: "3P1EYk9YYSBoDuKcQj2C6bPMbvTvVuoy2j",
//     },
//   },
// };

// const MOCK_COMMON_TESTNET_SEGWIT_ADDRESS_DATA = {
//   native: {
//     mnemonic: MNEMONIC,
//     privateKey: "cQjBQLBCeuyn1FeJE72M93vQJgMjoMXH9CkgidtjqjBsiLRjJKLK",
//     publicKey: "0338848902420d91c7789bd62edb88814ce27ecd48f5ac9dd1d0f08682864c6755",
//     path: MOCK_COMMON_DERIVATION_PATH.testnet.segWit,
//   },
//   nonNative: {
//     mnemonic: EMPTY_MNEMONIC,
//     privateKey: "cVhAbPqGLxUNtDRKrADt6PWyaoAiic7xxUPkB2SzKqM658VwkxZT",
//     publicKey: "033e504e8e281c8a8c96cc17e3874fbfeb5cb68208d0caa8ef1becd82a110946b9",
//     path: MOCK_COMMON_DERIVATION_PATH.testnet.segWit,
//   },
// };

// const MOCK_TESTNET_ADDRESS_DATA = {
//   native: {
//     legacy: {
//       mnemonic: MNEMONIC,
//       address: "mk2hF1aSuKkBZtCUM9jDfjgFLE5gGJ8U8c",
//       privateKey: "cQEPGT34NWGzWnW1JE3d5GKaBcEQJqUsDdxH2jXD97CkXaAaXHEn",
//       publicKey: "02d76e63231c59c216550ef886d362d58ba96ee30eb56caa99f5cdaf651b9a9a6e",
//       path: MOCK_COMMON_DERIVATION_PATH.testnet.legacy,
//     },
//     segWit: {
//       ...MOCK_COMMON_TESTNET_SEGWIT_ADDRESS_DATA.native,
//       address: "2NDrscWiWSvuxUmQp3stwgauM7PLXyA5Jba",
//     },
//     nativeSegWit: {
//       mnemonic: MNEMONIC,
//       address: "tb1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlwsvuf7",
//       privateKey: "cU7MwjFKfWjDPkaKhEJmsbG6DwPjSZs6WLY4BYXiSzeGRnd232i3",
//       publicKey: "03d5f0a7cc993f8a296111637c6dd2d80ab917ebeedcb6ed30a600cef49a4d63a1",
//       path: "m/84'/1'/0'/0/0",
//     },
//     taproot: {
//       mnemonic: MNEMONIC,
//       address: "tb1p0q0ya6q34wml2h2katjm8486f27czctx7vghcvh08pmvhu9zdvlq7ne7zu",
//       privateKey: "cPQEyhkUdfSCTZfEcWsFm5JLBo2ysAvsTzsYJ9Vv1mYTJmSZAj8A",
//       publicKey: "5b0e1610c136eaa57159acd0bd602278b5de45f9664691b9c39ed244a4d46dd7",
//       path: "m/86'/1'/0'/0/0",
//     },
//     p2wsh: {
//       ...MOCK_COMMON_TESTNET_SEGWIT_ADDRESS_DATA.native,
//       address: "tb1qaan4la2jzw7ww7f8f2uqrmcyyfyfqcmlxvn7r2dtc4gfhy2gl7fseyq9wd",
//     },
//     p2wshInP2sh: {
//       ...MOCK_COMMON_TESTNET_SEGWIT_ADDRESS_DATA.native,
//       address: "2NFcaS5rkUcss4LrN9SKwN2FkBTaLtfEaiL",
//     },
//   },
//   nonNative: {
//     legacy: {
//       mnemonic: EMPTY_MNEMONIC,
//       address: "n48G9HDQafyjS2fbPstLGt4n1dSR1NESS8",
//       privateKey: "cNR3CCytyuoqq9oK9iALZ1E6Q2brp2izuQ3ZWQApa3GposUD4bhN",
//       publicKey: "03d57fe1f3989eda6bc663cf844cb3804db972d309ebd56f7ef5536b338d2756a8",
//       path: MOCK_COMMON_DERIVATION_PATH.testnet.legacy,
//     },
//     segWit: {
//       ...MOCK_COMMON_TESTNET_SEGWIT_ADDRESS_DATA.nonNative,
//       address: "2MwFm1ozdLiXfc1PMP7u7D7vQojWxXTGXsr",
//     },
//     nativeSegWit: {
//       mnemonic: EMPTY_MNEMONIC,
//       address: "tb1qe8deaenmchr00kr7r2vt9dmp55zjyagtr3safk",
//       privateKey: "cUVDbb4yxqEZ2iQ2by2H2YiYUXUtc5FTBtk4v2EGz1Aza2LjxXUy",
//       publicKey: "02c55122c6123a5cacfa827756eb4e989a218182da09080b1749ceb168a3b2fb6d",
//       path: MOCK_COMMON_DERIVATION_PATH.testnet.nativeSegWit,
//     },
//     taproot: {
//       mnemonic: EMPTY_MNEMONIC,
//       address: "tb1pdc89mkscf59pctu2q70vkx7569p4fh8vk54jxdng9qugeyf4slzqeresaf",
//       privateKey: "cRxhDCSgAgYupdH6XGmBdHhbwDhqkjyRtKbYYC7U99ywddBDZPQ1",
//       publicKey: "069522ff55becbb9a056ba1eb892c8c83c16db8a6de54fe22752daa4d74f58fe",
//       path: MOCK_COMMON_DERIVATION_PATH.testnet.taproot,
//     },
//     p2wsh: {
//       ...MOCK_COMMON_TESTNET_SEGWIT_ADDRESS_DATA.nonNative,
//       address: "tb1qr7nx25twp7awuat8k3d65vk8kr0lqmey9p8qjvgmtufux9fp0xfsujxkm8",
//     },
//     p2wshInP2sh: {
//       ...MOCK_COMMON_TESTNET_SEGWIT_ADDRESS_DATA.nonNative,
//       address: "2NFSbMft1JJLzJxsri6pqTUb1PTEo2NGKQA",
//     },
//   },
// };

// const MOCK_REGTEST_ADDRESS_DATA = {
//   native: {
//     legacy: {
//       ...MOCK_TESTNET_ADDRESS_DATA.native.legacy,
//     },
//     segWit: {
//       ...MOCK_TESTNET_ADDRESS_DATA.native.segWit,
//     },
//     nativeSegWit: {
//       ...MOCK_TESTNET_ADDRESS_DATA.native.nativeSegWit,
//       address: "bcrt1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlve437h",
//     },
//     taproot: {
//       ...MOCK_TESTNET_ADDRESS_DATA.native.taproot,
//       address: "bcrt1p0q0ya6q34wml2h2katjm8486f27czctx7vghcvh08pmvhu9zdvlqn2nchx",
//     },
//     p2wsh: {
//       ...MOCK_TESTNET_ADDRESS_DATA.native.p2wsh,
//       address: "bcrt1qaan4la2jzw7ww7f8f2uqrmcyyfyfqcmlxvn7r2dtc4gfhy2gl7fs5a2rmh",
//     },
//     p2wshInP2sh: {
//       ...MOCK_TESTNET_ADDRESS_DATA.native.p2wshInP2sh,
//     },
//   },
//   nonNative: {
//     legacy: {
//       ...MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy,
//     },
//     segWit: {
//       ...MOCK_TESTNET_ADDRESS_DATA.nonNative.segWit,
//     },
//     nativeSegWit: {
//       ...MOCK_TESTNET_ADDRESS_DATA.nonNative.nativeSegWit,
//       address: "bcrt1qe8deaenmchr00kr7r2vt9dmp55zjyagtpcfs7l",
//     },
//     taproot: {
//       ...MOCK_TESTNET_ADDRESS_DATA.nonNative.taproot,
//       address: "bcrt1pdc89mkscf59pctu2q70vkx7569p4fh8vk54jxdng9qugeyf4slzq56nkgn",
//     },
//     p2wsh: {
//       ...MOCK_TESTNET_ADDRESS_DATA.nonNative.p2wsh,
//       address: "bcrt1qr7nx25twp7awuat8k3d65vk8kr0lqmey9p8qjvgmtufux9fp0xfs3tvswa",
//     },
//     p2wshInP2sh: {
//       ...MOCK_TESTNET_ADDRESS_DATA.nonNative.p2wshInP2sh,
//     },
//   },
// };

// let mnemonic: Mnemonic;
// let bitcoinMainnet: Bitcoin;
// let bitcoinTestnet: Bitcoin;
// let bitcoinRegtest: Bitcoin;

// beforeEach(() => {
//   mnemonic = new Mnemonic(MNEMONIC);
//   bitcoinMainnet = new Bitcoin(mnemonic, "mainnet");
//   bitcoinTestnet = new Bitcoin(mnemonic, "testnet");
//   bitcoinRegtest = new Bitcoin(mnemonic, "regtest");
// });

// describe("Bitcoin", () => {
//   describe("mainnet", () => {
//     describe("derive", () => {
//       it("Derives correct legacy item", () => {
//         const derivedItem = bitcoinMainnet.derive(
//           MOCK_MAINNET_ADDRESS_DATA.native.legacy.path,
//           "legacy"
//         );

//         expect(MOCK_MAINNET_ADDRESS_DATA.native.legacy).toEqual(derivedItem);
//       });

//       it("Derives correct segWit item", () => {
//         const derivedItem = bitcoinMainnet.derive(
//           MOCK_MAINNET_ADDRESS_DATA.native.segWit.path,
//           "segWit"
//         );

//         expect(MOCK_MAINNET_ADDRESS_DATA.native.segWit).toEqual(derivedItem);
//       });

//       it("Derives correct native segWit item", () => {
//         const derivedItem = bitcoinMainnet.derive(
//           MOCK_MAINNET_ADDRESS_DATA.native.nativeSegWit.path,
//           "nativeSegWit"
//         );

//         expect(MOCK_MAINNET_ADDRESS_DATA.native.nativeSegWit).toEqual(derivedItem);
//       });

//       it("Derives correct taproot item", () => {
//         const derivedItem = bitcoinMainnet.derive(
//           MOCK_MAINNET_ADDRESS_DATA.native.taproot.path,
//           "taproot"
//         );

//         expect(MOCK_MAINNET_ADDRESS_DATA.native.taproot).toEqual(derivedItem);
//       });

//       it("Derives correct p2wsh (1-of-1 multisig) item", () => {
//         const derivedItem = bitcoinMainnet.derive(
//           MOCK_MAINNET_ADDRESS_DATA.native.p2wsh.path,
//           "p2wsh"
//         );

//         expect(MOCK_MAINNET_ADDRESS_DATA.native.p2wsh).toEqual(derivedItem);
//       });

//       it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
//         const derivedItem = bitcoinMainnet.derive(
//           MOCK_MAINNET_ADDRESS_DATA.native.p2wshInP2sh.path,
//           "p2wshInP2sh"
//         );

//         expect(MOCK_MAINNET_ADDRESS_DATA.native.p2wshInP2sh).toEqual(derivedItem);
//       });
//     });

//     describe("importByPrivateKey", () => {
//       describe("Import from a native mnemonic", () => {
//         it("Imports correct legacy item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.native.legacy.path,
//             MOCK_MAINNET_ADDRESS_DATA.native.legacy.privateKey,
//             "legacy"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.legacy);
//         });

//         it("Imports correct segWit item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.native.segWit.path,
//             MOCK_MAINNET_ADDRESS_DATA.native.segWit.privateKey,
//             "segWit"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.segWit);
//         });

//         it("Imports correct native segWit item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.native.nativeSegWit.path,
//             MOCK_MAINNET_ADDRESS_DATA.native.nativeSegWit.privateKey,
//             "nativeSegWit"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.nativeSegWit);
//         });

//         it("Imports correct taproot item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.native.taproot.path,
//             MOCK_MAINNET_ADDRESS_DATA.native.taproot.privateKey,
//             "taproot"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.taproot);
//         });

//         it("Imports correct p2wsh (1-of-1 multisig) item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.native.p2wsh.path,
//             MOCK_MAINNET_ADDRESS_DATA.native.p2wsh.privateKey,
//             "p2wsh"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.p2wsh);
//         });

//         it("Imports correct p2wsh in p2sh (1-of-1 multisig) item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.native.p2wshInP2sh.path,
//             MOCK_MAINNET_ADDRESS_DATA.native.p2wshInP2sh.privateKey,
//             "p2wshInP2sh"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.p2wshInP2sh);
//         });
//       });

//       describe("Import from a non-native mnemonic", () => {
//         it("Imports correct legacy item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.legacy.path,
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.legacy.privateKey,
//             "legacy"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.legacy);
//         });

//         it("Imports correct segWit item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.segWit.path,
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.segWit.privateKey,
//             "segWit"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.segWit);
//         });

//         it("Imports correct native segWit item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.nativeSegWit.path,
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.nativeSegWit.privateKey,
//             "nativeSegWit"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.nativeSegWit);
//         });

//         it("Imports correct taproot item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.taproot.path,
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.taproot.privateKey,
//             "taproot"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.taproot);
//         });

//         it("Imports correct p2wsh (1-of-1 multisig) item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.p2wsh.path,
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.p2wsh.privateKey,
//             "p2wsh"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.p2wsh);
//         });

//         it("Imports correct p2wsh in p2sh (1-of-1 multisig) item", () => {
//           const credential = bitcoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.p2wshInP2sh.path,
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.p2wshInP2sh.privateKey,
//             "p2wshInP2sh"
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.p2wshInP2sh);
//         });
//       });
//     });
//   });

//   describe("testnet", () => {
//     describe("derive", () => {
//       it("Derives correct legacy item", () => {
//         const derivedItem = bitcoinTestnet.derive(
//           MOCK_TESTNET_ADDRESS_DATA.native.legacy.path,
//           "legacy"
//         );

//         expect(MOCK_TESTNET_ADDRESS_DATA.native.legacy).toEqual(derivedItem);
//       });

//       it("Derives correct segWit item", () => {
//         const derivedItem = bitcoinTestnet.derive(
//           MOCK_TESTNET_ADDRESS_DATA.native.segWit.path,
//           "segWit"
//         );

//         expect(MOCK_TESTNET_ADDRESS_DATA.native.segWit).toEqual(derivedItem);
//       });

//       it("Derives correct native segWit item", () => {
//         const derivedItem = bitcoinTestnet.derive(
//           MOCK_TESTNET_ADDRESS_DATA.native.nativeSegWit.path,
//           "nativeSegWit"
//         );

//         expect(MOCK_TESTNET_ADDRESS_DATA.native.nativeSegWit).toEqual(derivedItem);
//       });

//       it("Derives correct taproot item", () => {
//         const derivedItem = bitcoinTestnet.derive(
//           MOCK_TESTNET_ADDRESS_DATA.native.taproot.path,
//           "taproot"
//         );

//         expect(MOCK_TESTNET_ADDRESS_DATA.native.taproot).toEqual(derivedItem);
//       });

//       it("Derives correct p2wsh (1-of-1 multisig) item", () => {
//         const derivedItem = bitcoinTestnet.derive(
//           MOCK_TESTNET_ADDRESS_DATA.native.p2wsh.path,
//           "p2wsh"
//         );

//         expect(MOCK_TESTNET_ADDRESS_DATA.native.p2wsh).toEqual(derivedItem);
//       });

//       it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
//         const derivedItem = bitcoinTestnet.derive(
//           MOCK_TESTNET_ADDRESS_DATA.native.p2wshInP2sh.path,
//           "p2wshInP2sh"
//         );

//         expect(MOCK_TESTNET_ADDRESS_DATA.native.p2wshInP2sh).toEqual(derivedItem);
//       });
//     });

//     describe("importByPrivateKey", () => {
//       describe("Import from a native mnemonic", () => {
//         it("Imports correct legacy item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.native.legacy.path,
//             MOCK_TESTNET_ADDRESS_DATA.native.legacy.privateKey,
//             "legacy"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.native.legacy);
//         });

//         it("Imports correct segWit item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.native.segWit.path,
//             MOCK_TESTNET_ADDRESS_DATA.native.segWit.privateKey,
//             "segWit"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.native.segWit);
//         });

//         it("Imports correct native segWit item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.native.nativeSegWit.path,
//             MOCK_TESTNET_ADDRESS_DATA.native.nativeSegWit.privateKey,
//             "nativeSegWit"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.native.nativeSegWit);
//         });

//         it("Imports correct taproot item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.native.taproot.path,
//             MOCK_TESTNET_ADDRESS_DATA.native.taproot.privateKey,
//             "taproot"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.native.taproot);
//         });

//         it("Imports correct p2wsh (1-of-1 multisig) item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.native.p2wsh.path,
//             MOCK_TESTNET_ADDRESS_DATA.native.p2wsh.privateKey,
//             "p2wsh"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.native.p2wsh);
//         });

//         it("Imports correct p2wsh in p2sh (1-of-1 multisig) item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.native.p2wshInP2sh.path,
//             MOCK_TESTNET_ADDRESS_DATA.native.p2wshInP2sh.privateKey,
//             "p2wshInP2sh"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.native.p2wshInP2sh);
//         });
//       });
//       describe("Import from a non-native mnemonic", () => {
//         it("Imports correct legacy item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy.path,
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy.privateKey,
//             "legacy"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy);
//         });

//         it("Imports correct segWit item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.segWit.path,
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.segWit.privateKey,
//             "segWit"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative.segWit);
//         });

//         it("Imports correct native segWit item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.nativeSegWit.path,
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.nativeSegWit.privateKey,
//             "nativeSegWit"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative.nativeSegWit);
//         });

//         it("Imports correct taproot item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.taproot.path,
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.taproot.privateKey,
//             "taproot"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative.taproot);
//         });

//         it("Imports correct p2wsh (1-of-1 multisig) item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.p2wsh.path,
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.p2wsh.privateKey,
//             "p2wsh"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative.p2wsh);
//         });

//         it("Imports correct p2wsh in p2sh (1-of-1 multisig) item", () => {
//           const credential = bitcoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.p2wshInP2sh.path,
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.p2wshInP2sh.privateKey,
//             "p2wshInP2sh"
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative.p2wshInP2sh);
//         });
//       });
//     });
//   });

//   describe("regtest", () => {
//     describe("derive", () => {
//       it("Derives correct legacy item", () => {
//         const derivedItem = bitcoinRegtest.derive(
//           MOCK_REGTEST_ADDRESS_DATA.native.legacy.path,
//           "legacy"
//         );

//         expect(MOCK_REGTEST_ADDRESS_DATA.native.legacy).toEqual(derivedItem);
//       });

//       it("Derives correct segWit item", () => {
//         const derivedItem = bitcoinRegtest.derive(
//           MOCK_REGTEST_ADDRESS_DATA.native.segWit.path,
//           "segWit"
//         );

//         expect(MOCK_REGTEST_ADDRESS_DATA.native.segWit).toEqual(derivedItem);
//       });

//       it("Derives correct native segWit item", () => {
//         const derivedItem = bitcoinRegtest.derive(
//           MOCK_REGTEST_ADDRESS_DATA.native.nativeSegWit.path,
//           "nativeSegWit"
//         );

//         expect(MOCK_REGTEST_ADDRESS_DATA.native.nativeSegWit).toEqual(derivedItem);
//       });

//       it("Derives correct taproot item", () => {
//         const derivedItem = bitcoinRegtest.derive(
//           MOCK_REGTEST_ADDRESS_DATA.native.taproot.path,
//           "taproot"
//         );

//         expect(MOCK_REGTEST_ADDRESS_DATA.native.taproot).toEqual(derivedItem);
//       });

//       it("Derives correct p2wsh (1-of-1 multisig) item", () => {
//         const derivedItem = bitcoinRegtest.derive(
//           MOCK_REGTEST_ADDRESS_DATA.native.p2wsh.path,
//           "p2wsh"
//         );

//         expect(MOCK_REGTEST_ADDRESS_DATA.native.p2wsh).toEqual(derivedItem);
//       });

//       it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
//         const derivedItem = bitcoinRegtest.derive(
//           MOCK_REGTEST_ADDRESS_DATA.native.p2wshInP2sh.path,
//           "p2wshInP2sh"
//         );

//         expect(MOCK_REGTEST_ADDRESS_DATA.native.p2wshInP2sh).toEqual(derivedItem);
//       });
//     });

//     describe("importByPrivateKey", () => {
//       describe("Import from a native mnemonic", () => {
//         it("Imports correct legacy item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.native.legacy.path,
//             MOCK_REGTEST_ADDRESS_DATA.native.legacy.privateKey,
//             "legacy"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.native.legacy);
//         });

//         it("Imports correct segWit item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.native.segWit.path,
//             MOCK_REGTEST_ADDRESS_DATA.native.segWit.privateKey,
//             "segWit"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.native.segWit);
//         });

//         it("Imports correct native segWit item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.native.nativeSegWit.path,
//             MOCK_REGTEST_ADDRESS_DATA.native.nativeSegWit.privateKey,
//             "nativeSegWit"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.native.nativeSegWit);
//         });

//         it("Imports correct taproot item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.native.taproot.path,
//             MOCK_REGTEST_ADDRESS_DATA.native.taproot.privateKey,
//             "taproot"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.native.taproot);
//         });

//         it("Imports correct p2wsh (1-of-1 multisig) item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.native.p2wsh.path,
//             MOCK_REGTEST_ADDRESS_DATA.native.p2wsh.privateKey,
//             "p2wsh"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.native.p2wsh);
//         });

//         it("Imports correct p2wsh in p2sh (1-of-1 multisig) item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.native.p2wshInP2sh.path,
//             MOCK_REGTEST_ADDRESS_DATA.native.p2wshInP2sh.privateKey,
//             "p2wshInP2sh"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.native.p2wshInP2sh);
//         });
//       });

//       describe("Import from a non-native mnemonic", () => {
//         it("Imports correct legacy item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.legacy.path,
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.legacy.privateKey,
//             "legacy"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative.legacy);
//         });

//         it("Imports correct segWit item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.segWit.path,
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.segWit.privateKey,
//             "segWit"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative.segWit);
//         });

//         it("Imports correct native segWit item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.nativeSegWit.path,
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.nativeSegWit.privateKey,
//             "nativeSegWit"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative.nativeSegWit);
//         });

//         it("Imports correct taproot item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.taproot.path,
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.taproot.privateKey,
//             "taproot"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative.taproot);
//         });

//         it("Imports correct p2wsh (1-of-1 multisig) item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.p2wsh.path,
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.p2wsh.privateKey,
//             "p2wsh"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative.p2wsh);
//         });

//         it("Imports correct p2wsh in p2sh (1-of-1 multisig) item", () => {
//           const credential = bitcoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.p2wshInP2sh.path,
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.p2wshInP2sh.privateKey,
//             "p2wshInP2sh"
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative.p2wshInP2sh);
//         });
//       });
//     });
//   });
// });
