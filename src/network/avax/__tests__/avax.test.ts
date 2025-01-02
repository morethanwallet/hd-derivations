import { Mnemonic } from "@/mnemonic/index.js";
import { Avax } from "../index.js";
import { describe, it, expect } from "vitest";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";

const MOCK_COMMON_ADDRESS_DATA = {
  mnemonic: "drill exotic title fall ivory boy praise unfold search foil surge tip",
  path: "m/44'/9000'/0'/0/0",
  publicKey: "03fe1af122c37da0765c691057f18e3d2810efba796068b2cb710f36710ba8ad3b",
  privateKey: "ae1c060b7d334b62797a911a8478a40c20489124c6c5d84c2391ffddf38b3d16",
};

let mnemonic: Mnemonic;
let avaxMainnet: Avax;
let avaxTestnet: Avax;

beforeEach(() => {
  mnemonic = new Mnemonic(MOCK_COMMON_ADDRESS_DATA.mnemonic);
  avaxMainnet = new Avax(mnemonic, "mainnet");
  avaxTestnet = new Avax(mnemonic, "testnet");
});

describe("Avax network family", () => {
  describe("getAddressData", () => {
    it("Generates correct mainnet Avax-X address data", () => {
      const mockAddressData = {
        ...MOCK_COMMON_ADDRESS_DATA,
        address: "X-avax1ecca9lzv4gj68826c2856ll0zz8aknxfcky982",
      };
      const addressData = avaxMainnet.getAddressData(mockAddressData.path, "X");

      expect(mockAddressData).toEqual(addressData);
    });

    it("Generates correct mainnet Avax-P address data", () => {
      const mockAddressData = {
        ...MOCK_COMMON_ADDRESS_DATA,
        address: "P-avax1ecca9lzv4gj68826c2856ll0zz8aknxfcky982",
      };
      const addressData = avaxMainnet.getAddressData(mockAddressData.path, "P");

      expect(mockAddressData).toEqual(addressData);
    });

    it("Generates correct testnet Avax-X address data", () => {
      const mockAddressData = {
        ...MOCK_COMMON_ADDRESS_DATA,
        address: "X-fuji1ecca9lzv4gj68826c2856ll0zz8aknxf5yq6t4",
      };
      const addressData = avaxTestnet.getAddressData(mockAddressData.path, "X");

      expect(mockAddressData).toEqual(addressData);
    });

    it("Generates correct testnet Avax-P address data", () => {
      const mockAddressData = {
        ...MOCK_COMMON_ADDRESS_DATA,
        address: "P-fuji1ecca9lzv4gj68826c2856ll0zz8aknxf5yq6t4",
      };
      const addressData = avaxTestnet.getAddressData(mockAddressData.path, "P");

      expect(mockAddressData).toEqual(addressData);
    });
  });

  describe("importByPrivateKey", () => {
    describe("Import with a native mnemonic private key", () => {
      it("Imports correct mainnet Avax-X address data", () => {
        const mockAddressData = {
          ...MOCK_COMMON_ADDRESS_DATA,
          address: "X-avax1ecca9lzv4gj68826c2856ll0zz8aknxfcky982",
        };
        const avaxXAddressData = avaxMainnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "X"
        );

        expect(mockAddressData).toEqual(avaxXAddressData);
      });

      it("Imports correct mainnet Avax-P address data", () => {
        const mockAddressData = {
          ...MOCK_COMMON_ADDRESS_DATA,
          address: "P-avax1ecca9lzv4gj68826c2856ll0zz8aknxfcky982",
        };
        const avaxXAddressData = avaxMainnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "P"
        );

        expect(mockAddressData).toEqual(avaxXAddressData);
      });

      it("Imports correct testnet Avax-X address data", () => {
        const mockAddressData = {
          ...MOCK_COMMON_ADDRESS_DATA,
          address: "X-fuji1ecca9lzv4gj68826c2856ll0zz8aknxf5yq6t4",
        };
        const avaxXAddressData = avaxTestnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "X"
        );

        expect(mockAddressData).toEqual(avaxXAddressData);
      });

      it("Imports correct testnet Avax-P address data", () => {
        const mockAddressData = {
          ...MOCK_COMMON_ADDRESS_DATA,
          address: "P-fuji1ecca9lzv4gj68826c2856ll0zz8aknxf5yq6t4",
        };
        const avaxXAddressData = avaxTestnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "P"
        );

        expect(mockAddressData).toEqual(avaxXAddressData);
      });
    });

    describe("Import with a non-native mnemonic private key", () => {
      const mockCommonAddressData = {
        mnemonic: EMPTY_MNEMONIC,
        path: "m/44'/9000'/0'/0/0",
        publicKey: "03db3460d315df5ee81ee8209c53acda36ab567dbc128f1c8313e0a63dd5a29734",
        privateKey: "262723ff31600c88d9ba431cd7ff1d59f13359708f7bf9d426c58f3b508b1b83",
      };

      it("Imports correct mainnet Avax-X address data", () => {
        const mockAddressData = {
          ...mockCommonAddressData,
          address: "X-avax10tkns2y49yy6vpe2reh4hay794yqfmzqxhjtl0",
        };
        const avaxXAddressData = avaxMainnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "X"
        );

        expect(mockAddressData).toEqual(avaxXAddressData);
      });

      it("Imports correct mainnet Avax-P address data", () => {
        const mockAddressData = {
          ...mockCommonAddressData,
          address: "P-avax10tkns2y49yy6vpe2reh4hay794yqfmzqxhjtl0",
        };
        const avaxXAddressData = avaxMainnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "P"
        );

        expect(mockAddressData).toEqual(avaxXAddressData);
      });

      it("Imports correct testnet Avax-X address data", () => {
        const mockAddressData = {
          ...mockCommonAddressData,
          address: "X-fuji10tkns2y49yy6vpe2reh4hay794yqfmzq29k5ns",
        };
        const avaxXAddressData = avaxTestnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "X"
        );

        expect(mockAddressData).toEqual(avaxXAddressData);
      });

      it("Imports correct testnet Avax-P address data", () => {
        const mockAddressData = {
          ...mockCommonAddressData,
          address: "P-fuji10tkns2y49yy6vpe2reh4hay794yqfmzq29k5ns",
        };
        const avaxXAddressData = avaxTestnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "P"
        );

        expect(mockAddressData).toEqual(avaxXAddressData);
      });
    });
  });
});
