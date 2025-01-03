import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Solana } from "../solana.network.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  mnemonic: MNEMONIC,
  address: "DAZg25rW4ntdn4TVya9hCdNpsxsfyMUrF2RSitrpKFGF",
  privateKey:
    "4w2nErAfyJXymM3P4VKqY6ZPTXACerLYHjhuW8pB4NW2pt4JMR8rqXxRZzmAfjaAGFMvZyVp7kGA7ra1q7QNhqkX",
  publicKey: "DAZg25rW4ntdn4TVya9hCdNpsxsfyMUrF2RSitrpKFGF",
  path: "m/44'/501'/0'/0'",
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
      const addressData = solana.getAddressData(MOCK_COMMON_MAINNET_ADDRESS_DATA.path);

      expect(MOCK_COMMON_MAINNET_ADDRESS_DATA).toEqual(addressData);
    });
  });

  describe("importByPrivateKey", () => {
    it("Imports correct address data", () => {
      const addressData = solana.importByPrivateKey(
        MOCK_COMMON_MAINNET_ADDRESS_DATA.path,
        MOCK_COMMON_MAINNET_ADDRESS_DATA.privateKey
      );

      expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA);
    });
  });
});
