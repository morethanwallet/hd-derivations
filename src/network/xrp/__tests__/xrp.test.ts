import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Xrp } from "../xrp.network.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  base: {
    mnemonic: MNEMONIC,
    address: "rLU7u4B8DgWxkApKZojJ2JSW1mct88XfwU",
    privateKey: "13bd9e44ec2266a37f4a5a54e912411c0143a3bfd2df39b94d52cf9aedb15f19",
    publicKey: "026a71c1a6598d85a4c6eacfe5afe8a1efef8b59b903ce23626209a738c712ee86",
    path: "m/44'/144'/0'/0/0",
  },
  x: {
    mnemonic: MNEMONIC,
    address: "XVYf9VURTnYU7gYKaKsvAKcNex2ZVLYyUY6EQVyNypzVKm1",
    privateKey: "13bd9e44ec2266a37f4a5a54e912411c0143a3bfd2df39b94d52cf9aedb15f19",
    publicKey: "026a71c1a6598d85a4c6eacfe5afe8a1efef8b59b903ce23626209a738c712ee86",
    path: "m/44'/144'/0'/0/0",
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
      const addressData = xrp.getAddressData(MOCK_COMMON_MAINNET_ADDRESS_DATA.base.path, "base");

      expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.base).toEqual(addressData);
    });

    it("Generates correct X address data", () => {
      const addressData = xrp.getAddressData(MOCK_COMMON_MAINNET_ADDRESS_DATA.x.path, "x");

      expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.x).toEqual(addressData);
    });

    describe("importByPrivateKey", () => {
      it("Imports correct base address data", () => {
        const addressData = xrp.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.base.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.base.privateKey,
          "base"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.base);
      });

      it("Imports correct X address data", () => {
        const addressData = xrp.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.x.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.x.privateKey,
          "x"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.x);
      });
    });
  });
});
