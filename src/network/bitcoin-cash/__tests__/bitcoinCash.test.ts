import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { BitcoinCash } from "../bitcoinCash.network.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  legacy: {
    mnemonic: MNEMONIC,
    address: "1P1nxaA36Q63qUo6CvcFqmdHVeQRSECH3Z",
    privateKey: "Kysn6FCsYUwSwYVdUD4c6kdntJeZCZWpPYPj6LjEV2pDPyWNFhjX",
    publicKey: "0333d222cc1fd501e74b6d64cb1e4dd85bbcb28d9ce3fd6a30133f5aa6211a8fc3",
    path: "m/44'/145'/0'/0/0",
  },
  cashAddr: {
    mnemonic: MNEMONIC,
    address: "bitcoincash:qrchjgvn4keqa6qwesjvywyj2fy46x2ex556xmy82u",
    privateKey: "Kysn6FCsYUwSwYVdUD4c6kdntJeZCZWpPYPj6LjEV2pDPyWNFhjX",
    publicKey: "0333d222cc1fd501e74b6d64cb1e4dd85bbcb28d9ce3fd6a30133f5aa6211a8fc3",
    path: "m/44'/145'/0'/0/0",
  },
};

const MOCK_COMMON_TESTNET_ADDRESS_DATA = {
  legacy: {
    ...MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy,
    address: "n3XkFdF1uRXJcbGhvVadfgqcMe18L2M4Tc",
    privateKey: "cQEmZACiyYdi6yxtrcsjU58rWXwxs1cWTaYCCmBjz9UDeiXPuAjp",
  },
  cashAddr: {
    ...MOCK_COMMON_MAINNET_ADDRESS_DATA.cashAddr,
    address: "bchtest:qrchjgvn4keqa6qwesjvywyj2fy46x2ex5sgzuxsdq",
    privateKey: "cQEmZACiyYdi6yxtrcsjU58rWXwxs1cWTaYCCmBjz9UDeiXPuAjp",
  },
};

const MOCK_COMMON_REGTEST_ADDRESS_DATA = {
  legacy: {
    ...MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy,
  },
  cashAddr: {
    ...MOCK_COMMON_TESTNET_ADDRESS_DATA.cashAddr,
    address: "bchreg:qrchjgvn4keqa6qwesjvywyj2fy46x2ex5sgzuxsdq",
  },
};

let mnemonic: Mnemonic;
let bitcoinCashMainnet: BitcoinCash;
let bitcoinCashTestnet: BitcoinCash;
let bitcoinCashRegtest: BitcoinCash;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  bitcoinCashMainnet = new BitcoinCash(mnemonic, "mainnet");
  bitcoinCashTestnet = new BitcoinCash(mnemonic, "testnet");
  bitcoinCashRegtest = new BitcoinCash(mnemonic, "regtest");
});

describe("Bitcoin Cash", () => {
  describe("mainnet", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinCashMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy.path,
          "legacy"
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy).toEqual(addressData);
      });

      it("Generates correct cashAddr address data", () => {
        const addressData = bitcoinCashMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.cashAddr.path,
          "cashAddr"
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.cashAddr).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = bitcoinCashMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy.privateKey,
          "legacy"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy);
      });

      it("Imports correct cashAddr address data", () => {
        const addressData = bitcoinCashMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.cashAddr.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.cashAddr.privateKey,
          "cashAddr"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.cashAddr);
      });
    });
  });

  describe("testnet", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinCashTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy.path,
          "legacy"
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy).toEqual(addressData);
      });

      it("Generates correct cashAddr address data", () => {
        const addressData = bitcoinCashTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.cashAddr.path,
          "cashAddr"
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.cashAddr).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = bitcoinCashTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy.privateKey,
          "legacy"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy);
      });

      it("Imports correct cashAddr address data", () => {
        const addressData = bitcoinCashTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.cashAddr.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.cashAddr.privateKey,
          "cashAddr"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.cashAddr);
      });
    });
  });

  describe("regtest", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinCashRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy.path,
          "legacy"
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy).toEqual(addressData);
      });

      it("Generates correct cashAddr address data", () => {
        const addressData = bitcoinCashRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.cashAddr.path,
          "cashAddr"
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.cashAddr).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = bitcoinCashRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy.privateKey,
          "legacy"
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy);
      });

      it("Imports correct cashAddr address data", () => {
        const addressData = bitcoinCashRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.cashAddr.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.cashAddr.privateKey,
          "cashAddr"
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.cashAddr);
      });
    });
  });
});
