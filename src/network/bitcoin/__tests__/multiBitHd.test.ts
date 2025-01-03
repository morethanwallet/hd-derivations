import { Mnemonic } from "@/mnemonic/index.js";
import { MultiBitHd } from "../index.js";
import { describe, it, expect } from "vitest";

const MNEMONIC = "wheel buffalo audit boost fetch science rib erosion spoon soldier glance okay";

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  mnemonic: MNEMONIC,
  address: "15bnzW95e5QWn398wt2d1AyE8woQqxyaa3",
  privateKey: "KxfHNzLerWGSruPnt7G4Gs6YWbiT2mgAyRhBpzYdDQB1oCVVSjyZ",
  publicKey: "02a52efd339524a4eac69de521d1a16aeae1e505719ca67384fb3bc2ec63865abf",
  path: "m/0'/0/0",
};

const MOCK_COMMON_TESTNET_ADDRESS_DATA = {
  ...MOCK_COMMON_MAINNET_ADDRESS_DATA,
  address: "mk7kHZE4T6qmZ9ckfSzzq6BYzwQ7egmN7D",
  privateKey: "cP2GquLWHZxi2Ls4GX5BeBbc8q1rhDms3TqewR18iWq23wXpimJi",
};

const MOCK_COMMON_REGTEST_ADDRESS_DATA = {
  ...MOCK_COMMON_TESTNET_ADDRESS_DATA,
};

let mnemonic: Mnemonic;
let multiBitHdMainnet: MultiBitHd;
let multiBitHdTestnet: MultiBitHd;
let multiBitHdRegtest: MultiBitHd;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  multiBitHdMainnet = new MultiBitHd(mnemonic, "mainnet");
  multiBitHdTestnet = new MultiBitHd(mnemonic, "testnet");
  multiBitHdRegtest = new MultiBitHd(mnemonic, "regtest");
});

describe("MultiBit HD", () => {
  describe("mainnet", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = multiBitHdMainnet.getAddressData(MOCK_COMMON_MAINNET_ADDRESS_DATA.path);

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA).toEqual(addressData);
      });

      describe("importByPrivateKey", () => {
        it("Imports correct legacy address data", () => {
          const addressData = multiBitHdMainnet.importByPrivateKey(
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
          const addressData = multiBitHdTestnet.getAddressData(
            MOCK_COMMON_TESTNET_ADDRESS_DATA.path
          );

          expect(MOCK_COMMON_TESTNET_ADDRESS_DATA).toEqual(addressData);
        });
      });

      describe("importByPrivateKey", () => {
        it("Imports correct legacy address data", () => {
          const addressData = multiBitHdTestnet.importByPrivateKey(
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
          const addressData = multiBitHdRegtest.getAddressData(
            MOCK_COMMON_REGTEST_ADDRESS_DATA.path
          );

          expect(MOCK_COMMON_REGTEST_ADDRESS_DATA).toEqual(addressData);
        });
      });

      describe("importByPrivateKey", () => {
        it("Imports correct legacy address data", () => {
          const addressData = multiBitHdRegtest.importByPrivateKey(
            MOCK_COMMON_REGTEST_ADDRESS_DATA.path,
            MOCK_COMMON_REGTEST_ADDRESS_DATA.privateKey
          );

          expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA);
        });
      });
    });
  });
});
