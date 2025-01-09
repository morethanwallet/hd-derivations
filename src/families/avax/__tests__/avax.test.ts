import { Mnemonic } from "@/mnemonic/index.js";
import { Avax } from "../index.js";
import { describe, it, expect } from "vitest";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = "m/44'/9000'/0'/0/0";

const MOCK_COMMON_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    path: MOCK_COMMON_DERIVATION_PATH,
    publicKey: "03fe1af122c37da0765c691057f18e3d2810efba796068b2cb710f36710ba8ad3b",
    privateKey: "ae1c060b7d334b62797a911a8478a40c20489124c6c5d84c2391ffddf38b3d16",
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    path: MOCK_COMMON_DERIVATION_PATH,
    publicKey: "03db3460d315df5ee81ee8209c53acda36ab567dbc128f1c8313e0a63dd5a29734",
    privateKey: "262723ff31600c88d9ba431cd7ff1d59f13359708f7bf9d426c58f3b508b1b83",
  },
};

const MOCK_MAINNET_ADDRESS_DATA = {
  native: {
    x: {
      ...MOCK_COMMON_ADDRESS_DATA.native,
      address: "X-avax1ecca9lzv4gj68826c2856ll0zz8aknxfcky982",
    },
    p: {
      ...MOCK_COMMON_ADDRESS_DATA.native,
      address: "P-avax1ecca9lzv4gj68826c2856ll0zz8aknxfcky982",
    },
  },
  nonNative: {
    x: {
      ...MOCK_COMMON_ADDRESS_DATA.nonNative,
      address: "X-avax10tkns2y49yy6vpe2reh4hay794yqfmzqxhjtl0",
    },
    p: {
      ...MOCK_COMMON_ADDRESS_DATA.nonNative,
      address: "P-avax10tkns2y49yy6vpe2reh4hay794yqfmzqxhjtl0",
    },
  },
};

const MOCK_TESTNET_ADDRESS_DATA = {
  native: {
    x: {
      ...MOCK_MAINNET_ADDRESS_DATA.native.x,
      address: "X-fuji1ecca9lzv4gj68826c2856ll0zz8aknxf5yq6t4",
    },
    p: {
      ...MOCK_MAINNET_ADDRESS_DATA.native.p,
      address: "P-fuji1ecca9lzv4gj68826c2856ll0zz8aknxf5yq6t4",
    },
  },
  nonNative: {
    x: {
      ...MOCK_MAINNET_ADDRESS_DATA.nonNative.x,
      address: "X-fuji10tkns2y49yy6vpe2reh4hay794yqfmzq29k5ns",
    },
    p: {
      ...MOCK_MAINNET_ADDRESS_DATA.nonNative.p,
      address: "P-fuji10tkns2y49yy6vpe2reh4hay794yqfmzq29k5ns",
    },
  },
};

let mnemonic: Mnemonic;
let avaxMainnet: Avax;
let avaxTestnet: Avax;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  avaxMainnet = new Avax(mnemonic, "mainnet");
  avaxTestnet = new Avax(mnemonic, "testnet");
});

describe("Avax", () => {
  describe("mainnet", () => {
    describe("derive", () => {
      it("Derives correct Avax-X item", () => {
        const derivedItem = avaxMainnet.derive(MOCK_MAINNET_ADDRESS_DATA.native.x.path, "X");

        expect(MOCK_MAINNET_ADDRESS_DATA.native.x).toEqual(derivedItem);
      });

      it("Derives correct Avax-P item", () => {
        const derivedItem = avaxMainnet.derive(MOCK_MAINNET_ADDRESS_DATA.native.p.path, "P");

        expect(MOCK_MAINNET_ADDRESS_DATA.native.p).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct Avax-X item", () => {
          const credential = avaxMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.x.path,
            MOCK_MAINNET_ADDRESS_DATA.native.x.privateKey,
            "X"
          );

          expect(MOCK_MAINNET_ADDRESS_DATA.native.x).toEqual(credential);
        });

        it("Imports correct Avax-P item", () => {
          const credential = avaxMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.p.path,
            MOCK_MAINNET_ADDRESS_DATA.native.p.privateKey,
            "P"
          );

          expect(MOCK_MAINNET_ADDRESS_DATA.native.p).toEqual(credential);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct Avax-X item", () => {
          const credential = avaxMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.x.path,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.x.privateKey,
            "X"
          );

          expect(MOCK_MAINNET_ADDRESS_DATA.nonNative.x).toEqual(credential);
        });

        it("Imports correct Avax-P item", () => {
          const credential = avaxMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.p.path,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.p.privateKey,
            "P"
          );

          expect(MOCK_MAINNET_ADDRESS_DATA.nonNative.p).toEqual(credential);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("derive", () => {
      it("Derives correct Avax-X item", () => {
        const derivedItem = avaxTestnet.derive(MOCK_TESTNET_ADDRESS_DATA.native.x.path, "X");

        expect(MOCK_TESTNET_ADDRESS_DATA.native.x).toEqual(derivedItem);
      });

      it("Derives correct Avax-P item", () => {
        const derivedItem = avaxTestnet.derive(MOCK_TESTNET_ADDRESS_DATA.native.p.path, "P");

        expect(MOCK_TESTNET_ADDRESS_DATA.native.p).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct Avax-X item", () => {
          const credential = avaxTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.native.x.path,
            MOCK_TESTNET_ADDRESS_DATA.native.x.privateKey,
            "X"
          );

          expect(MOCK_TESTNET_ADDRESS_DATA.native.x).toEqual(credential);
        });

        it("Imports correct Avax-P item", () => {
          const credential = avaxTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.native.p.path,
            MOCK_TESTNET_ADDRESS_DATA.native.p.privateKey,
            "P"
          );

          expect(MOCK_TESTNET_ADDRESS_DATA.native.p).toEqual(credential);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct Avax-X item", () => {
          const credential = avaxTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.nonNative.x.path,
            MOCK_TESTNET_ADDRESS_DATA.nonNative.x.privateKey,
            "X"
          );

          expect(MOCK_TESTNET_ADDRESS_DATA.nonNative.x).toEqual(credential);
        });

        it("Imports correct Avax-P item", () => {
          const credential = avaxTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.nonNative.p.path,
            MOCK_TESTNET_ADDRESS_DATA.nonNative.p.privateKey,
            "P"
          );

          expect(MOCK_TESTNET_ADDRESS_DATA.nonNative.p).toEqual(credential);
        });
      });
    });
  });
});
