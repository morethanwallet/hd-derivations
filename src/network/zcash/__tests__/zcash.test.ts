import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Zcash } from "../zcash.network.js";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = "m/44'/133'/0'/0/0";

const MOCK_MAINNET_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    address: "t1go5yyUMNUakm8HAnMrvM6aDkvaUZTQzQg",
    privateKey: "L4Mijb5oxci7ow72HqDCi3sn2sqZ86tg3uFVskCYqTQ4QZ3i9Hgw",
    publicKey: "0396a610bdb90fbff9759696ec2e3ad6827107d1e64b0aa1d1c62541b88544e24b",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    address: "t1efrqPbdbh1irKubpD1VSroiAX2jPdbNxF",
    privateKey: "KxXRpZEhuoBEqKsp8f2UeCU2jm56bsGzUP1gHNbGsGJqqsEa1Vob",
    publicKey: "02fbc76ef4c6a425f182a9d8e2b5e3b5d71c047bade46dcb3f63974a0b6eac1a91",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
};

const MOCK_TESTNET_ADDRESS_DATA = {
  native: {
    ...MOCK_MAINNET_ADDRESS_DATA.native,
    address: "tmYdqJoxkm96FuNUcT6AfCmEyMufJ655nBL",
    privateKey: "cUiiCW5fPgQNyNaHgF2L5NNqf78xnYzN7wPxzAf4La44fJ5JophX",
  },
  nonNative: {
    ...MOCK_MAINNET_ADDRESS_DATA.nonNative,
    address: "tmWWcAE62zMXDza73UwKEJXUTmW7YxV53UJ",
    privateKey: "cNtRHUEZLrsVzmM5X4qc1Wy6MzNWGKNgYRA9Po3nNNxr6cPJnUHf",
  },
};

const MOCK_REGTEST_ADDRESS_DATA = {
  native: { ...MOCK_TESTNET_ADDRESS_DATA.native },
  nonNative: { ...MOCK_TESTNET_ADDRESS_DATA.nonNative },
};

let mnemonic: Mnemonic;
let zcashMainnet: Zcash;
let zcashTestnet: Zcash;
let zcashRegtest: Zcash;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  zcashMainnet = new Zcash(mnemonic, "mainnet");
  zcashTestnet = new Zcash(mnemonic, "testnet");
  zcashRegtest = new Zcash(mnemonic, "regtest");
});

describe("Zcash", () => {
  describe("mainnet", () => {
    describe("getAddressData", () => {
      it("Generates correct transparent address data", () => {
        const addressData = zcashMainnet.getAddressData(MOCK_MAINNET_ADDRESS_DATA.native.path);

        expect(MOCK_MAINNET_ADDRESS_DATA.native).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct transparent address data", () => {
          const addressData = zcashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.path,
            MOCK_MAINNET_ADDRESS_DATA.native.privateKey
          );

          expect(addressData).toEqual(MOCK_MAINNET_ADDRESS_DATA.native);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct transparent address data", () => {
          const addressData = zcashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.path,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.privateKey
          );

          expect(addressData).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("getAddressData", () => {
      it("Generates correct transparent address data", () => {
        const addressData = zcashTestnet.getAddressData(MOCK_TESTNET_ADDRESS_DATA.native.path);

        expect(addressData).toEqual(MOCK_TESTNET_ADDRESS_DATA.native);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct transparent address data", () => {
          const addressData = zcashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.native.path,
            MOCK_TESTNET_ADDRESS_DATA.native.privateKey
          );

          expect(addressData).toEqual(MOCK_TESTNET_ADDRESS_DATA.native);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct transparent address data", () => {
          const addressData = zcashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.nonNative.path,
            MOCK_TESTNET_ADDRESS_DATA.nonNative.privateKey
          );

          expect(addressData).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative);
        });
      });
    });
  });

  describe("regtest", () => {
    describe("getAddressData", () => {
      it("Generates correct transparent address data", () => {
        const addressData = zcashRegtest.getAddressData(MOCK_REGTEST_ADDRESS_DATA.native.path);

        expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.native);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct transparent address data", () => {
          const addressData = zcashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.native.path,
            MOCK_REGTEST_ADDRESS_DATA.native.privateKey
          );

          expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.native);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct transparent address data", () => {
          const addressData = zcashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.nonNative.path,
            MOCK_REGTEST_ADDRESS_DATA.nonNative.privateKey
          );

          expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative);
        });
      });
    });
  });
});
