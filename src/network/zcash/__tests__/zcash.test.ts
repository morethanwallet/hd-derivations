import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Zcash } from "../zcash.network.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  mnemonic: MNEMONIC,
  address: "t1go5yyUMNUakm8HAnMrvM6aDkvaUZTQzQg",
  privateKey: "L4Mijb5oxci7ow72HqDCi3sn2sqZ86tg3uFVskCYqTQ4QZ3i9Hgw",
  publicKey: "0396a610bdb90fbff9759696ec2e3ad6827107d1e64b0aa1d1c62541b88544e24b",
  path: "m/44'/133'/0'/0/0",
};

const MOCK_COMMON_TESTNET_ADDRESS_DATA = {
  ...MOCK_COMMON_MAINNET_ADDRESS_DATA,
  address: "tmYdqJoxkm96FuNUcT6AfCmEyMufJ655nBL",
  privateKey: "cUiiCW5fPgQNyNaHgF2L5NNqf78xnYzN7wPxzAf4La44fJ5JophX",
};

const MOCK_COMMON_REGTEST_ADDRESS_DATA = {
  ...MOCK_COMMON_TESTNET_ADDRESS_DATA,
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
      it("Generates correct legacy address data", () => {
        const addressData = zcashMainnet.getAddressData(MOCK_COMMON_MAINNET_ADDRESS_DATA.path);

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = zcashMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.privateKey
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA);
      });
    });
  });

  describe("testnet", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = zcashTestnet.getAddressData(MOCK_COMMON_TESTNET_ADDRESS_DATA.path);

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = zcashTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.privateKey
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA);
      });
    });
  });

  describe("regtest", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = zcashRegtest.getAddressData(MOCK_COMMON_REGTEST_ADDRESS_DATA.path);

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = zcashRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.privateKey
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA);
      });
    });
  });
});
