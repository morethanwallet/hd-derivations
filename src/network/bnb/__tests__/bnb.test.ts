import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Bnb } from "../bnb.network.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  mnemonic: MNEMONIC,
  address: "bnb1np9fcggud8kecg9s20dm6hqev8qzg87c2tja2u",
  privateKey: "06fe8f9f44307b0c2385003a3541aafacb2ffe987f39372a529418ce4781a41d",
  publicKey:
    "04154c152a64d514a2d79fffc778b4481dd7312a584dee86ea684115ae1c7fd42a2da10f052c7b93e8d2497961a80ba9929dfb2f41892ce482dbc211df9f67f8c9",
  path: "m/44'/714'/0'/0/0",
};

let mnemonic: Mnemonic;
let bnb: Bnb;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  bnb = new Bnb(mnemonic);
});

describe("Bnb", () => {
  describe("getAddressData", () => {
    it("Generates correct address data", () => {
      const addressData = bnb.getAddressData(MOCK_COMMON_MAINNET_ADDRESS_DATA.path);

      expect(MOCK_COMMON_MAINNET_ADDRESS_DATA).toEqual(addressData);
    });
  });

  describe("importByPrivateKey", () => {
    it("Imports correct address data", () => {
      const addressData = bnb.importByPrivateKey(
        MOCK_COMMON_MAINNET_ADDRESS_DATA.path,
        MOCK_COMMON_MAINNET_ADDRESS_DATA.privateKey
      );

      expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA);
    });
  });
});
