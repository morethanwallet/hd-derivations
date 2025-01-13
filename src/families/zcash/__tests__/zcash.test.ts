import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Zcash } from "../zcash.network.js";
import { EMPTY_MNEMONIC } from "@/keyDerivation/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = { mainnet: "m/44'/133'/0'/0/0", testnet: "m/44'/1'/0'/0/0" };

const MOCK_MAINNET_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    address: "t1go5yyUMNUakm8HAnMrvM6aDkvaUZTQzQg",
    privateKey: "L4Mijb5oxci7ow72HqDCi3sn2sqZ86tg3uFVskCYqTQ4QZ3i9Hgw",
    publicKey: "0396a610bdb90fbff9759696ec2e3ad6827107d1e64b0aa1d1c62541b88544e24b",
    path: MOCK_COMMON_DERIVATION_PATH.mainnet,
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    address: "t1efrqPbdbh1irKubpD1VSroiAX2jPdbNxF",
    privateKey: "KxXRpZEhuoBEqKsp8f2UeCU2jm56bsGzUP1gHNbGsGJqqsEa1Vob",
    publicKey: "02fbc76ef4c6a425f182a9d8e2b5e3b5d71c047bade46dcb3f63974a0b6eac1a91",
    path: MOCK_COMMON_DERIVATION_PATH.mainnet,
  },
};

const MOCK_TESTNET_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    address: "tmEE6H8Q1THc2XeyCEjshqJEbKsksdYbi3j",
    privateKey: "cQEPGT34NWGzWnW1JE3d5GKaBcEQJqUsDdxH2jXD97CkXaAaXHEn",
    publicKey: "02d76e63231c59c216550ef886d362d58ba96ee30eb56caa99f5cdaf651b9a9a6e",
    path: MOCK_COMMON_DERIVATION_PATH.testnet,
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    address: "tmQJMhbX96k3tFm3VnDMPCDBdLSSFvttqcn",
    privateKey: "cPS2rfjHVcJxNCTnxgoALhzeqCFFHadE4tButfB4L2aoowkMP4m7",
    publicKey: "028db811636159b5b3e2b949e70630ef75dabab371c56f5ebd8f86677a24c5c2ee",
    path: MOCK_COMMON_DERIVATION_PATH.testnet,
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
    describe("derive", () => {
      it("Derives correct transparent item", () => {
        const derivedItem = zcashMainnet.derive(MOCK_MAINNET_ADDRESS_DATA.native.path);

        expect(MOCK_MAINNET_ADDRESS_DATA.native).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct transparent item", () => {
          const credential = zcashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.path,
            MOCK_MAINNET_ADDRESS_DATA.native.privateKey
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct transparent item", () => {
          const credential = zcashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.path,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.privateKey
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("derive", () => {
      it("Derives correct transparent item", () => {
        const derivedItem = zcashTestnet.derive(MOCK_TESTNET_ADDRESS_DATA.native.path);

        expect(derivedItem).toEqual(MOCK_TESTNET_ADDRESS_DATA.native);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct transparent item", () => {
          const credential = zcashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.native.path,
            MOCK_TESTNET_ADDRESS_DATA.native.privateKey
          );

          expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.native);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct transparent item", () => {
          const credential = zcashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.nonNative.path,
            MOCK_TESTNET_ADDRESS_DATA.nonNative.privateKey
          );

          expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative);
        });
      });
    });
  });

  describe("regtest", () => {
    describe("derive", () => {
      it("Derives correct transparent item", () => {
        const derivedItem = zcashRegtest.derive(MOCK_REGTEST_ADDRESS_DATA.native.path);

        expect(derivedItem).toEqual(MOCK_REGTEST_ADDRESS_DATA.native);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct transparent item", () => {
          const credential = zcashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.native.path,
            MOCK_REGTEST_ADDRESS_DATA.native.privateKey
          );

          expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.native);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct transparent item", () => {
          const credential = zcashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.nonNative.path,
            MOCK_REGTEST_ADDRESS_DATA.nonNative.privateKey
          );

          expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative);
        });
      });
    });
  });
});
