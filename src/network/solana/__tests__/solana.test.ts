import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Solana } from "../solana.network.js";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = "m/44'/501'/0'/0'";

const MOCK_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    address: "DAZg25rW4ntdn4TVya9hCdNpsxsfyMUrF2RSitrpKFGF",
    privateKey:
      "4w2nErAfyJXymM3P4VKqY6ZPTXACerLYHjhuW8pB4NW2pt4JMR8rqXxRZzmAfjaAGFMvZyVp7kGA7ra1q7QNhqkX",
    publicKey: "DAZg25rW4ntdn4TVya9hCdNpsxsfyMUrF2RSitrpKFGF",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    address: "GcGtjMQGmWmw5dSkzTcsX44H5fE4xNywzrnzKpfxdhdJ",
    privateKey:
      "2kGgMTsQbm2HwZtXFBoiB61ysVLFtokWSuhcCwPN3Nr2G5EChbuHgCsm4fegZYXKwx27YQczzcA3WePrkuvJZSn4",
    publicKey: "GcGtjMQGmWmw5dSkzTcsX44H5fE4xNywzrnzKpfxdhdJ",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
};

let mnemonic: Mnemonic;
let solana: Solana;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  solana = new Solana(mnemonic);
});

describe("Solana", () => {
  describe("getAddressData", () => {
    it("Generates correct address data", () => {
      const addressData = solana.getAddressData(MOCK_ADDRESS_DATA.native.path);
      expect(MOCK_ADDRESS_DATA.native).toEqual(addressData);
    });
  });

  describe("importByPrivateKey", () => {
    describe("Import from a native mnemonic", () => {
      it("Imports correct address data", () => {
        const addressData = solana.importByPrivateKey(
          MOCK_ADDRESS_DATA.native.path,
          MOCK_ADDRESS_DATA.native.privateKey
        );

        expect(addressData).toEqual(MOCK_ADDRESS_DATA.native);
      });
    });
  });
  describe("Import from a non-native mnemonic", () => {
    it("Imports correct address data", () => {
      const addressData = solana.importByPrivateKey(
        MOCK_ADDRESS_DATA.nonNative.path,
        MOCK_ADDRESS_DATA.nonNative.privateKey
      );

      expect(addressData).toEqual(MOCK_ADDRESS_DATA.nonNative);
    });
  });
});
