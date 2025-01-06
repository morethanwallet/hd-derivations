import { Mnemonic } from "@/mnemonic/index.js";
import { MultiBitHd } from "../index.js";
import { describe, it, expect } from "vitest";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";

const MNEMONIC = "wheel buffalo audit boost fetch science rib erosion spoon soldier glance okay";

const MOCK_COMMON_DERIVATION_PATH = "m/0'/0/0";

const MOCK_MAINNET_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    address: "15bnzW95e5QWn398wt2d1AyE8woQqxyaa3",
    privateKey: "KxfHNzLerWGSruPnt7G4Gs6YWbiT2mgAyRhBpzYdDQB1oCVVSjyZ",
    publicKey: "02a52efd339524a4eac69de521d1a16aeae1e505719ca67384fb3bc2ec63865abf",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    address: "1M69joMANttJVHkQbLYzzR47yxzVkk7Ywu",
    privateKey: "KzuqHJwB21S1AL8QSPgBWvwfRg41uJ75aPFLsk275GbStLnoRRwk",
    publicKey: "02c1825b52c4a16f3260ad0a064f11be2b71ef78424d2167ef92da27fe9ee27d14",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
};

const MOCK_TESTNET_ADDRESS_DATA = {
  native: {
    ...MOCK_MAINNET_ADDRESS_DATA.native,
    mnemonic: MNEMONIC,
    address: "mk7kHZE4T6qmZ9ckfSzzq6BYzwQ7egmN7D",
    privateKey: "cP2GquLWHZxi2Ls4GX5BeBbc8q1rhDms3TqewR18iWq23wXpimJi",
  },
  nonNative: {
    ...MOCK_MAINNET_ADDRESS_DATA.nonNative,
    mnemonic: EMPTY_MNEMONIC,
    address: "n1c72rS9BvKZGQE2JuXNpLGSqxbCaXJdcx",
    privateKey: "cRGpkDw2T58GKmbfpoVJtFSj3uMRZkCmeRPozAUcaPFT95u6xoDj",
  },
};

const MOCK_REGTEST_ADDRESS_DATA = {
  native: { ...MOCK_TESTNET_ADDRESS_DATA.native },
  nonNative: { ...MOCK_TESTNET_ADDRESS_DATA.nonNative },
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
      it("Generates correct address data", () => {
        const addressData = multiBitHdMainnet.getAddressData(MOCK_MAINNET_ADDRESS_DATA.native.path);

        expect(MOCK_MAINNET_ADDRESS_DATA.native).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a private key from a native mnemonic", () => {
        it("Imports correct address data", () => {
          const addressData = multiBitHdMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.path,
            MOCK_MAINNET_ADDRESS_DATA.native.privateKey
          );

          expect(addressData).toEqual(MOCK_MAINNET_ADDRESS_DATA.native);
        });
      });

      describe("Import from a private key from a non-native mnemonic", () => {
        it("Imports correct address data", () => {
          const addressData = multiBitHdMainnet.importByPrivateKey(
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
      it("Generates correct address data", () => {
        const addressData = multiBitHdTestnet.getAddressData(MOCK_TESTNET_ADDRESS_DATA.native.path);

        expect(MOCK_TESTNET_ADDRESS_DATA.native).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a private key from a native mnemonic", () => {
        it("Imports correct address data", () => {
          const addressData = multiBitHdTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.native.path,
            MOCK_TESTNET_ADDRESS_DATA.native.privateKey
          );

          expect(addressData).toEqual(MOCK_TESTNET_ADDRESS_DATA.native);
        });
      });

      describe("Import from a private key from a non-native mnemonic", () => {
        it("Imports correct address data", () => {
          const addressData = multiBitHdTestnet.importByPrivateKey(
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
      it("Generates correct address data", () => {
        const addressData = multiBitHdRegtest.getAddressData(MOCK_REGTEST_ADDRESS_DATA.native.path);

        expect(MOCK_REGTEST_ADDRESS_DATA.native).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a private key from a native mnemonic", () => {
        it("Imports correct address data", () => {
          const addressData = multiBitHdRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.native.path,
            MOCK_REGTEST_ADDRESS_DATA.native.privateKey
          );

          expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.native);
        });
      });
    });

    describe("Import from a private key from a non-native mnemonic", () => {
      it("Imports correct address data", () => {
        const addressData = multiBitHdRegtest.importByPrivateKey(
          MOCK_REGTEST_ADDRESS_DATA.nonNative.path,
          MOCK_REGTEST_ADDRESS_DATA.nonNative.privateKey
        );

        expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative);
      });
    });
  });
});
