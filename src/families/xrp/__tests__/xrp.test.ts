// import { Mnemonic } from "@/mnemonic/index.js";
// import { describe, it, expect } from "vitest";
// import { Xrp } from "../xrp.network.js";
// import { EMPTY_MNEMONIC } from "@/keyDerivation/constants/index.js";
// import { AddressList } from "@/keyDerivation/index.js";

// const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

// const MOCK_COMMON_DERIVATION_PATH = "m/44'/144'/0'/0/0";

// const MOCK_COMMON_ADDRESS_DATA = {
//   native: {
//     mnemonic: MNEMONIC,
//     privateKey: "13bd9e44ec2266a37f4a5a54e912411c0143a3bfd2df39b94d52cf9aedb15f19",
//     publicKey: "026a71c1a6598d85a4c6eacfe5afe8a1efef8b59b903ce23626209a738c712ee86",
//     path: MOCK_COMMON_DERIVATION_PATH,
//   },
//   nonNative: {
//     mnemonic: EMPTY_MNEMONIC,
//     privateKey: "db74e35f96fe918731cd09d89aa344d20fe70bca821606eb4bc26768c08146aa",
//     publicKey: "02aaa6d76cf6e6d016cc081dcba4e7c49c32d601a2b13af1fb5e7d72faa99d3f66",
//     path: MOCK_COMMON_DERIVATION_PATH,
//   },
// };

// const MOCK_MAINNET_ADDRESS_DATA = {
//   native: {
//     base: {
//       ...MOCK_COMMON_ADDRESS_DATA.native,
//       address: "rLU7u4B8DgWxkApKZojJ2JSW1mct88XfwU",
//     },
//     x: {
//       ...MOCK_COMMON_ADDRESS_DATA.native,
//       address: "XVYf9VURTnYU7gYKaKsvAKcNex2ZVLYyUY6EQVyNypzVKm1",
//     },
//   },
//   nonNative: {
//     base: {
//       ...MOCK_COMMON_ADDRESS_DATA.nonNative,
//       address: "rhDFuwM5vvdjTURRJuzNa9Puf7AvzCXiRF",
//     },
//     x: {
//       ...MOCK_COMMON_ADDRESS_DATA.nonNative,
//       address: "X7esb6VX9hdijia1enmteBFedewutcoZTygthnfoSVeWTZA",
//     },
//   },
// };

// const MOCK_TESTNET_ADDRESS_DATA = {
//   native: {
//     x: {
//       ...MOCK_COMMON_ADDRESS_DATA.native,
//       address: "TVTdZbMQKsaDvUJv4f86qK493QfMzvDr95e65BUmZZYp6PW",
//     },
//   },
//   nonNative: {
//     x: {
//       ...MOCK_COMMON_ADDRESS_DATA.nonNative,
//       address: "T7Z2roeWrpBtBM17utWCYB2Zfn65QUTbR9eLMkMLssUnEkL",
//     },
//   },
// };

// let mnemonic: Mnemonic;
// let xrpMainnet: Xrp;
// let xrpTestnet: Xrp;

// beforeEach(() => {
//   mnemonic = new Mnemonic(MNEMONIC);
//   xrpMainnet = new Xrp(mnemonic, "mainnet");
//   xrpTestnet = new Xrp(mnemonic, "testnet");
// });

// describe("Xrp", () => {
//   describe("mainnet", () => {
//     describe("derive", () => {
//       it("Derives correct base item", () => {
//         const derivedItem = xrpMainnet.derive({
//           derivationPath: MOCK_MAINNET_ADDRESS_DATA.native.base.path,
//           addressType: AddressList.XRP_BASE,
//         });

//         expect(MOCK_MAINNET_ADDRESS_DATA.native.base).toEqual(derivedItem);
//       });

//       it("Derives correct X item", () => {
//         const derivedItem = xrpMainnet.derive({
//           derivationPath: MOCK_MAINNET_ADDRESS_DATA.native.x.path,
//           addressType: AddressList.XRP_X,
//         });

//         expect(MOCK_MAINNET_ADDRESS_DATA.native.x).toEqual(derivedItem);
//       });
//     });

//     describe("importByPrivateKey", () => {
//       describe("Import from a native mnemonic", () => {
//         it("Imports correct base item", () => {
//           const credential = xrpMainnet.importByPrivateKey({
//             derivationPath: MOCK_MAINNET_ADDRESS_DATA.native.base.path,
//             privateKey: MOCK_MAINNET_ADDRESS_DATA.native.base.privateKey,
//             addressType: AddressList.XRP_BASE,
//           });

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.base);
//         });

//         it("Imports correct X item", () => {
//           const credential = xrpMainnet.importByPrivateKey({
//             derivationPath: MOCK_MAINNET_ADDRESS_DATA.native.x.path,
//             privateKey: MOCK_MAINNET_ADDRESS_DATA.native.x.privateKey,
//             addressType: AddressList.XRP_X,
//           });

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.x);
//         });
//       });

//       describe("Import from a non-native mnemonic", () => {
//         it("Imports correct base item", () => {
//           const credential = xrpMainnet.importByPrivateKey({
//             derivationPath: MOCK_MAINNET_ADDRESS_DATA.nonNative.base.path,
//             privateKey: MOCK_MAINNET_ADDRESS_DATA.nonNative.base.privateKey,
//             addressType: AddressList.XRP_BASE,
//           });

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.base);
//         });

//         it("Imports correct X item", () => {
//           const credential = xrpMainnet.importByPrivateKey({
//             derivationPath: MOCK_MAINNET_ADDRESS_DATA.nonNative.x.path,
//             privateKey: MOCK_MAINNET_ADDRESS_DATA.nonNative.x.privateKey,
//             addressType: AddressList.XRP_X,
//           });

//           expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.x);
//         });
//       });
//     });
//   });

//   describe("testnet", () => {
//     describe("derive", () => {
//       it("Derives correct X item", () => {
//         const derivedItem = xrpTestnet.derive({
//           derivationPath: MOCK_TESTNET_ADDRESS_DATA.native.x.path,
//           addressType: AddressList.XRP_X,
//         });

//         expect(MOCK_TESTNET_ADDRESS_DATA.native.x).toEqual(derivedItem);
//       });
//     });

//     describe("importByPrivateKey", () => {
//       describe("Import from a native mnemonic", () => {
//         it("Imports correct X item", () => {
//           const credential = xrpTestnet.importByPrivateKey({
//             derivationPath: MOCK_TESTNET_ADDRESS_DATA.native.x.path,
//             privateKey: MOCK_TESTNET_ADDRESS_DATA.native.x.privateKey,
//             addressType: AddressList.XRP_X,
//           });

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.native.x);
//         });
//       });

//       describe("Import from a non-native mnemonic", () => {
//         it("Imports correct X item", () => {
//           const credential = xrpTestnet.importByPrivateKey({
//             derivationPath: MOCK_TESTNET_ADDRESS_DATA.nonNative.x.path,
//             privateKey: MOCK_TESTNET_ADDRESS_DATA.nonNative.x.privateKey,
//             addressType: AddressList.XRP_X,
//           });

//           expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative.x);
//         });
//       });
//     });
//   });
// });
