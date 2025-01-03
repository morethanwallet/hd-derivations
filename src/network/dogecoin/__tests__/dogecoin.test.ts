import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Dogecoin } from "../dogecoin.network.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  mnemonic: MNEMONIC,
  address: "DTdPxCi432Vu2yQZqQYAeFBtJMsATtFeyc",
  privateKey: "QSziipfZmwGTd67cn9qQ5xCGpF8tC8bU2JeVVd2HwLWBdkMWVVqC",
  publicKey: "03ba5622f900d6eda980366d9b6f3eb319681727870d5e520df1d4964c5f6f1020",
  path: "m/44'/3'/0'/0/0",
};

const MOCK_COMMON_TESTNET_ADDRESS_DATA = {
  ...MOCK_COMMON_MAINNET_ADDRESS_DATA,
  address: "nrgTgDSxxzxcuwyksEBctenBYEFTS3suSn",
  privateKey: "cj84BDaEJhJsW3DNgSbXAQ3hUJp2Us6oXyMJwKn9h44G1Dob6ALp",
};

const MOCK_COMMON_REGTEST_ADDRESS_DATA = {
  ...MOCK_COMMON_MAINNET_ADDRESS_DATA,
  address: "n41FhzrPYe2sH5hapPWyvQEcHDja1MvsS8",
  privateKey: "cRxo2trRxPUbZ1BqaHoja3riySQip2ZMD673pR5xi6YqSZTxTcsK",
};

let mnemonic: Mnemonic;
let dogecoinMainnet: Dogecoin;
let dogecoinTestnet: Dogecoin;
let dogecoinRegtest: Dogecoin;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  dogecoinMainnet = new Dogecoin(mnemonic, "mainnet");
  dogecoinTestnet = new Dogecoin(mnemonic, "testnet");
  dogecoinRegtest = new Dogecoin(mnemonic, "regtest");
});

describe("Dogecoin", () => {
  describe("mainnet", () => {
    describe("getAddressData", () => {
      it("Generates correct address data", () => {
        const addressData = dogecoinMainnet.getAddressData(MOCK_COMMON_MAINNET_ADDRESS_DATA.path);

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct address data", () => {
        const addressData = dogecoinMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.privateKey
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA);
      });
    });
  });

  describe("testnet", () => {
    describe("getAddressData", () => {
      it("Generates correct address data", () => {
        const addressData = dogecoinTestnet.getAddressData(MOCK_COMMON_TESTNET_ADDRESS_DATA.path);

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct address data", () => {
        const addressData = dogecoinTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.privateKey
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA);
      });
    });
  });

  describe("regtest", () => {
    describe("getAddressData", () => {
      it("Generates correct address data", () => {
        const addressData = dogecoinRegtest.getAddressData(MOCK_COMMON_REGTEST_ADDRESS_DATA.path);

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct address data", () => {
        const addressData = dogecoinRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.privateKey
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA);
      });
    });
  });
});
