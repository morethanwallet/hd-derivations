import { Mnemonic } from "@/mnemonic/index.js";
import { Avax } from "../index.js";
import { describe, it, expect } from "vitest";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_MAINNET_ADDRESS_DATA = {
  native: {
    x: {
      mnemonic: MNEMONIC,
      path: "m/44'/9000'/0'/0/0",
      publicKey: "03fe1af122c37da0765c691057f18e3d2810efba796068b2cb710f36710ba8ad3b",
      privateKey: "ae1c060b7d334b62797a911a8478a40c20489124c6c5d84c2391ffddf38b3d16",
      address: "X-avax1ecca9lzv4gj68826c2856ll0zz8aknxfcky982",
    },
    p: {
      mnemonic: MNEMONIC,
      path: "m/44'/9000'/0'/0/0",
      publicKey: "03fe1af122c37da0765c691057f18e3d2810efba796068b2cb710f36710ba8ad3b",
      privateKey: "ae1c060b7d334b62797a911a8478a40c20489124c6c5d84c2391ffddf38b3d16",
      address: "P-avax1ecca9lzv4gj68826c2856ll0zz8aknxfcky982",
    },
  },
  nonNative: {
    x: {
      mnemonic: EMPTY_MNEMONIC,
      path: "m/44'/9000'/0'/0/0",
      publicKey: "03db3460d315df5ee81ee8209c53acda36ab567dbc128f1c8313e0a63dd5a29734",
      privateKey: "262723ff31600c88d9ba431cd7ff1d59f13359708f7bf9d426c58f3b508b1b83",
      address: "X-avax10tkns2y49yy6vpe2reh4hay794yqfmzqxhjtl0",
    },
    p: {
      mnemonic: EMPTY_MNEMONIC,
      path: "m/44'/9000'/0'/0/0",
      publicKey: "03db3460d315df5ee81ee8209c53acda36ab567dbc128f1c8313e0a63dd5a29734",
      privateKey: "262723ff31600c88d9ba431cd7ff1d59f13359708f7bf9d426c58f3b508b1b83",
      address: "P-avax10tkns2y49yy6vpe2reh4hay794yqfmzqxhjtl0",
    },
  },
};

const MOCK_COMMON_ADDRESS_DATA = {
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
    describe("getAddressData", () => {
      it("Generates correct Avax-X address data", () => {
        const addressData = avaxMainnet.getAddressData(
          MOCK_MAINNET_ADDRESS_DATA.native.x.path,
          "X"
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.native.x).toEqual(addressData);
      });

      it("Generates correct Avax-P address data", () => {
        const addressData = avaxMainnet.getAddressData(
          MOCK_MAINNET_ADDRESS_DATA.native.p.path,
          "P"
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.native.p).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct Avax-X address data", () => {
        const avaxXAddressData = avaxMainnet.importByPrivateKey(
          MOCK_MAINNET_ADDRESS_DATA.native.x.path,
          MOCK_MAINNET_ADDRESS_DATA.native.x.privateKey,
          "X"
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.native.x).toEqual(avaxXAddressData);
      });

      it("Imports correct Avax-P address data", () => {
        const avaxXAddressData = avaxMainnet.importByPrivateKey(
          MOCK_MAINNET_ADDRESS_DATA.native.p.path,
          MOCK_MAINNET_ADDRESS_DATA.native.p.privateKey,
          "P"
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.native.p).toEqual(avaxXAddressData);
      });

      it("Imports correct Avax-X address data from a private key from a non-native mnemonic", () => {
        const avaxXAddressData = avaxMainnet.importByPrivateKey(
          MOCK_MAINNET_ADDRESS_DATA.nonNative.x.path,
          MOCK_MAINNET_ADDRESS_DATA.nonNative.x.privateKey,
          "X"
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.nonNative.x).toEqual(avaxXAddressData);
      });

      it("Imports correct Avax-P address data from a private key from a non-native mnemonic", () => {
        const avaxXAddressData = avaxMainnet.importByPrivateKey(
          MOCK_MAINNET_ADDRESS_DATA.nonNative.p.path,
          MOCK_MAINNET_ADDRESS_DATA.nonNative.p.privateKey,
          "P"
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.nonNative.p).toEqual(avaxXAddressData);
      });
    });
  });

  describe("testnet", () => {
    describe("getAddressData", () => {
      it("Generates correct Avax-X address data", () => {
        const addressData = avaxTestnet.getAddressData(MOCK_COMMON_ADDRESS_DATA.native.x.path, "X");

        expect(MOCK_COMMON_ADDRESS_DATA.native.x).toEqual(addressData);
      });

      it("Generates correct Avax-P address data", () => {
        const addressData = avaxTestnet.getAddressData(MOCK_COMMON_ADDRESS_DATA.native.p.path, "P");

        expect(MOCK_COMMON_ADDRESS_DATA.native.p).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct Avax-X address data", () => {
        const avaxXAddressData = avaxTestnet.importByPrivateKey(
          MOCK_COMMON_ADDRESS_DATA.native.x.path,
          MOCK_COMMON_ADDRESS_DATA.native.x.privateKey,
          "X"
        );

        expect(MOCK_COMMON_ADDRESS_DATA.native.x).toEqual(avaxXAddressData);
      });

      it("Imports correct Avax-P address data", () => {
        const avaxXAddressData = avaxTestnet.importByPrivateKey(
          MOCK_COMMON_ADDRESS_DATA.native.p.path,
          MOCK_COMMON_ADDRESS_DATA.native.p.privateKey,
          "P"
        );

        expect(MOCK_COMMON_ADDRESS_DATA.native.p).toEqual(avaxXAddressData);
      });

      it("Imports correct Avax-X address data from a private key from a non-native mnemonic", () => {
        const avaxXAddressData = avaxTestnet.importByPrivateKey(
          MOCK_COMMON_ADDRESS_DATA.nonNative.x.path,
          MOCK_COMMON_ADDRESS_DATA.nonNative.x.privateKey,
          "X"
        );

        expect(MOCK_COMMON_ADDRESS_DATA.nonNative.x).toEqual(avaxXAddressData);
      });

      it("Imports correct Avax-P address data from a private key from a non-native mnemonic", () => {
        const avaxXAddressData = avaxTestnet.importByPrivateKey(
          MOCK_COMMON_ADDRESS_DATA.nonNative.p.path,
          MOCK_COMMON_ADDRESS_DATA.nonNative.p.privateKey,
          "P"
        );

        expect(MOCK_COMMON_ADDRESS_DATA.nonNative.p).toEqual(avaxXAddressData);
      });
    });
  });
});
