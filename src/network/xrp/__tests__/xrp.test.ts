import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Xrp } from "../xrp.network.js";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = "m/44'/144'/0'/0/0";

const MOCK_COMMON_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    privateKey: "13bd9e44ec2266a37f4a5a54e912411c0143a3bfd2df39b94d52cf9aedb15f19",
    publicKey: "026a71c1a6598d85a4c6eacfe5afe8a1efef8b59b903ce23626209a738c712ee86",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    privateKey: "deb16cece84a6a8af309d0c1daa24600bda050262db9e6bc4c70e43cf1b21438",
    publicKey: "02a78a7d670d05afeb33201545c7b4592e37d24bd05f184f8459d8d64bf3d95948",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
};

const MOCK_ADDRESS_DATA = {
  native: {
    base: {
      ...MOCK_COMMON_ADDRESS_DATA.native,
      address: "rLU7u4B8DgWxkApKZojJ2JSW1mct88XfwU",
    },
    x: {
      ...MOCK_COMMON_ADDRESS_DATA.native,
      address: "XVYf9VURTnYU7gYKaKsvAKcNex2ZVLYyUY6EQVyNypzVKm1",
    },
  },
  nonNative: {
    base: {
      ...MOCK_COMMON_ADDRESS_DATA.nonNative,
      address: "r3isM4wfgpbFW9QwiymU8Mhc8WbtiaeNfu",
    },
    x: {
      ...MOCK_COMMON_ADDRESS_DATA.nonNative,
      address: "X7ufba1XvJekUJ8Wj4H8EU9yzYHyvFsc3Jxsdms7Eq25ds1",
    },
  },
};

let mnemonic: Mnemonic;
let xrp: Xrp;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  xrp = new Xrp(mnemonic);
});

describe("Xrp", () => {
  describe("getAddressData", () => {
    it("Generates correct base address data", () => {
      const addressData = xrp.getAddressData(MOCK_ADDRESS_DATA.native.base.path, "base");

      expect(MOCK_ADDRESS_DATA.native.base).toEqual(addressData);
    });

    it("Generates correct X address data", () => {
      const addressData = xrp.getAddressData(MOCK_ADDRESS_DATA.native.x.path, "x");

      expect(MOCK_ADDRESS_DATA.native.x).toEqual(addressData);
    });
  });

  describe("importByPrivateKey", () => {
    describe("Import from a native mnemonic", () => {
      it("Imports correct base address data", () => {
        const addressData = xrp.importByPrivateKey(
          MOCK_ADDRESS_DATA.native.base.path,
          MOCK_ADDRESS_DATA.native.base.privateKey,
          "base"
        );

        expect(addressData).toEqual(MOCK_ADDRESS_DATA.native.base);
      });

      it("Imports correct X address data", () => {
        const addressData = xrp.importByPrivateKey(
          MOCK_ADDRESS_DATA.native.x.path,
          MOCK_ADDRESS_DATA.native.x.privateKey,
          "x"
        );

        expect(addressData).toEqual(MOCK_ADDRESS_DATA.native.x);
      });
    });

    describe("Import from a non-native mnemonic", () => {
      it("Imports correct base address data", () => {
        const addressData = xrp.importByPrivateKey(
          MOCK_ADDRESS_DATA.nonNative.base.path,
          MOCK_ADDRESS_DATA.nonNative.base.privateKey,
          "base"
        );

        expect(addressData).toEqual(MOCK_ADDRESS_DATA.nonNative.base);
      });

      it("Imports correct X address data", () => {
        const addressData = xrp.importByPrivateKey(
          MOCK_ADDRESS_DATA.nonNative.x.path,
          MOCK_ADDRESS_DATA.nonNative.x.privateKey,
          "x"
        );

        expect(addressData).toEqual(MOCK_ADDRESS_DATA.nonNative.x);
      });
    });
  });
});
