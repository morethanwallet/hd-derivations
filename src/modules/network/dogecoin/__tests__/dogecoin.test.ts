// import { Mnemonic } from "@/mnemonic/index.js";
// import { describe, it, expect } from "vitest";
// import { Dogecoin } from "../dogecoin.network.js";
// import { EMPTY_MNEMONIC } from "@/keyDerivation/constants/index.js";

// const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

// const MOCK_COMMON_DERIVATION_PATH = { mainnet: "m/44'/3'/0'/0/0", testnet: "m/44'/1'/0'/0/0" };

// const MOCK_MAINNET_ADDRESS_DATA = {
//   native: {
//     mnemonic: MNEMONIC,
//     address: "DTdPxCi432Vu2yQZqQYAeFBtJMsATtFeyc",
//     privateKey: "QSziipfZmwGTd67cn9qQ5xCGpF8tC8bU2JeVVd2HwLWBdkMWVVqC",
//     publicKey: "03ba5622f900d6eda980366d9b6f3eb319681727870d5e520df1d4964c5f6f1020",
//     path: MOCK_COMMON_DERIVATION_PATH.mainnet,
//   },
//   nonNative: {
//     mnemonic: EMPTY_MNEMONIC,
//     address: "DMgym4pWdstBAgK6jCTe76sM6YTftznm19",
//     privateKey: "QUUWv51Jn4XyzD3p1tFQpt12ezFDNt6WgTtaCbdTMXQy284vHCD7",
//     publicKey: "0309080b819078aee24872876349d2f3b3272e8f94bea5686da70e1f331e6c8c7b",
//     path: MOCK_COMMON_DERIVATION_PATH.mainnet,
//   },
// };

// const MOCK_TESTNET_ADDRESS_DATA = {
//   native: {
//     ...MOCK_MAINNET_ADDRESS_DATA.native,
//     address: "nYhuDEB2KgfwCkUePzPrdzDpbEbZmwtvvu",
//     privateKey: "chPeQmkrip7GTpXYQNqQfcWYgUdhyg2KYXCY9eDQ84iB6EYq6JSJ",
//     publicKey: "02d76e63231c59c216550ef886d362d58ba96ee30eb56caa99f5cdaf651b9a9a6e",
//     path: MOCK_COMMON_DERIVATION_PATH.testnet,
//   },
//   nonNative: {
//     ...MOCK_MAINNET_ADDRESS_DATA.nonNative,
//     address: "ninAdhJ9y97nvrYwwTsXzuArboGwzufapE",
//     privateKey: "cgbHzzT5qv9EKEVL4qaww4BdL4eYxRAgPmSB1ZsFJz6ENc7e33Ru",
//     publicKey: "028db811636159b5b3e2b949e70630ef75dabab371c56f5ebd8f86677a24c5c2ee",
//     path: MOCK_COMMON_DERIVATION_PATH.testnet,
//   },
// };

// const MOCK_REGTEST_ADDRESS_DATA = {
//   native: {
//     ...MOCK_TESTNET_ADDRESS_DATA.native,
//     address: "mk2hF1aSuKkBZtCUM9jDfjgFLE5gGJ8U8c",
//     privateKey: "cQEPGT34NWGzWnW1JE3d5GKaBcEQJqUsDdxH2jXD97CkXaAaXHEn",
//   },
//   nonNative: {
//     ...MOCK_TESTNET_ADDRESS_DATA.nonNative,
//     address: "mv6xfUhaYnC3HzGmtdCu2edHLnm4VHUyxi",
//     privateKey: "cPS2rfjHVcJxNCTnxgoALhzeqCFFHadE4tButfB4L2aoowkMP4m7",
//   },
// };

// let mnemonic: Mnemonic;
// let dogecoinMainnet: Dogecoin;
// let dogecoinTestnet: Dogecoin;
// let dogecoinRegtest: Dogecoin;

// beforeEach(() => {
//   mnemonic = new Mnemonic(MNEMONIC);
//   dogecoinMainnet = new Dogecoin(mnemonic, "mainnet");
//   dogecoinTestnet = new Dogecoin(mnemonic, "testnet");
//   dogecoinRegtest = new Dogecoin(mnemonic, "regtest");
// });

// describe("Dogecoin", () => {
//   describe("mainnet", () => {
//     describe("derive", () => {
//       it("Derives correct item", () => {
//         const derivedItem = dogecoinMainnet.derive(MOCK_MAINNET_ADDRESS_DATA.native.path);

//         expect(derivedItem).toEqual(MOCK_MAINNET_ADDRESS_DATA.native);
//       });
//     });

//     describe("importByPrivateKey", () => {
//       describe("Import from a native mnemonic", () => {
//         it("Imports correct item", () => {
//           const credential = dogecoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.native.path,
//             MOCK_MAINNET_ADDRESS_DATA.native.privateKey
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native);
//         });
//       });
//       describe("Import from a non-native mnemonic", () => {
//         it("Imports correct item", () => {
//           const credential = dogecoinMainnet.importByPrivateKey(
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.path,
//             MOCK_MAINNET_ADDRESS_DATA.nonNative.privateKey
//           );

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative);
//         });
//       });
//     });
//   });

//   describe("testnet", () => {
//     describe("derive", () => {
//       it("Derives correct item", () => {
//         const derivedItem = dogecoinTestnet.derive(MOCK_TESTNET_ADDRESS_DATA.native.path);

//         expect(derivedItem).toEqual(MOCK_TESTNET_ADDRESS_DATA.native);
//       });
//     });

//     describe("importByPrivateKey", () => {
//       describe("Import from a native mnemonic", () => {
//         it("Imports correct item", () => {
//           const credential = dogecoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.native.path,
//             MOCK_TESTNET_ADDRESS_DATA.native.privateKey
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.native);
//         });
//       });

//       describe("Import from a non-native mnemonic", () => {
//         it("Imports correct item", () => {
//           const credential = dogecoinTestnet.importByPrivateKey(
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.path,
//             MOCK_TESTNET_ADDRESS_DATA.nonNative.privateKey
//           );

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative);
//         });
//       });
//     });
//   });

//   describe("regtest", () => {
//     describe("derive", () => {
//       it("Derives correct item", () => {
//         const derivedItem = dogecoinRegtest.derive(MOCK_REGTEST_ADDRESS_DATA.native.path);

//         expect(derivedItem).toEqual(MOCK_REGTEST_ADDRESS_DATA.native);
//       });
//     });

//     describe("importByPrivateKey", () => {
//       describe("Import from a native mnemonic", () => {
//         it("Imports correct item", () => {
//           const credential = dogecoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.native.path,
//             MOCK_REGTEST_ADDRESS_DATA.native.privateKey
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.native);
//         });
//       });

//       describe("Import from a non-native mnemonic", () => {
//         it("Imports correct item", () => {
//           const credential = dogecoinRegtest.importByPrivateKey(
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.path,
//             MOCK_REGTEST_ADDRESS_DATA.nonNative.privateKey
//           );

//           expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative);
//         });
//       });
//     });
//   });
// });
