import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Evm } from "../evm.network.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_ADDRESS_DATA = {
  mnemonic: MNEMONIC,
  address: "0xe2052Bf288Ef2cE6169Ac6C093393Aa7e295d85F",
  privateKey: "0xd98df20e93f62d5a49a8d68ef1f62b0ea5a6e464c96990100c4ddad98ee98ec1",
  publicKey: "0x022a0a4834e8c570137875e5c778d07e54b2650fb06571f5bf38273b87d803f14d",
  path: "m/44'/60'/0'/0/0",
};

const MOCK_COMMON_ETC_ADDRESS_DATA = {
  mnemonic: MNEMONIC,
  address: "0xFDd33f0319579E7eF575AaE61dD3248d7bB39072",
  privateKey: "0x21464359ede2d6afc3cec9e6b4424b66128701aa824d51fa59b1a09cde902f36",
  publicKey: "0x036db722271cb407addc53cb17af7086ac9538a9e4e19217d4b842c4286468c727",
  path: "m/44'/61'/0'/0/0",
};

const MOCK_COMMON_COINOMI_ETH_ADDRESS_DATA = {
  mnemonic: MNEMONIC,
  address: "0xDE258AEbc7C1566Eed1558204F159F13B8EDD86c",
  privateKey: "0x8e1b4aac6cdd6ded8fc7150aa104f7cbde9c3cec3691c28daa41e9e875925617",
  publicKey: "0x021418e69bc18c8235ed37330a4cc02d1fdc22227f74113bb44d58687dce775476",
  path: "m/44'/60'/0'/0",
};

const MOCK_COMMON_COINOMI_ETC_ADDRESS_DATA = {
  mnemonic: MNEMONIC,
  address: "0x319B9b87246b67f13AD7C79294d8017baB1AB006",
  privateKey: "0x02d8b0735f531ebac67015917432964d6c8a29cf4a8957775eadacedd16da0cb",
  publicKey: "0x0256ab3b98cfbfb88ae1d0675402f96774260e9828de64e60fd1173c591182929d",
  path: "m/44'/61'/0'/0",
};

let mnemonic: Mnemonic;
let evm: Evm;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  evm = new Evm(mnemonic);
});

describe("Evm", () => {
  describe("getAddressData", () => {
    it("Generates correct Ethereum compatible address data", () => {
      const addressData = evm.getAddressData(MOCK_COMMON_ADDRESS_DATA.path);

      expect(MOCK_COMMON_ADDRESS_DATA).toEqual(addressData);
    });

    it("Generates correct Coinomi-ETH address data", () => {
      const addressData = evm.getAddressData(MOCK_COMMON_COINOMI_ETH_ADDRESS_DATA.path);

      expect(MOCK_COMMON_COINOMI_ETH_ADDRESS_DATA).toEqual(addressData);
    });

    it("Generates correct ETC address data", () => {
      const addressData = evm.getAddressData(MOCK_COMMON_ETC_ADDRESS_DATA.path);

      expect(MOCK_COMMON_ETC_ADDRESS_DATA).toEqual(addressData);
    });

    it("Generates correct Coinomi-ETC address data", () => {
      const addressData = evm.getAddressData(MOCK_COMMON_COINOMI_ETC_ADDRESS_DATA.path);

      expect(MOCK_COMMON_COINOMI_ETC_ADDRESS_DATA).toEqual(addressData);
    });
  });

  describe("importByPrivateKey", () => {
    it("Imports correct Ethereum compatible address data", () => {
      const addressData = evm.importByPrivateKey(
        MOCK_COMMON_ADDRESS_DATA.path,
        MOCK_COMMON_ADDRESS_DATA.privateKey
      );

      expect(addressData).toEqual(MOCK_COMMON_ADDRESS_DATA);
    });

    it("Imports correct Coinomi-ETH address data", () => {
      const addressData = evm.importByPrivateKey(
        MOCK_COMMON_COINOMI_ETH_ADDRESS_DATA.path,
        MOCK_COMMON_COINOMI_ETH_ADDRESS_DATA.privateKey
      );

      expect(addressData).toEqual(MOCK_COMMON_COINOMI_ETH_ADDRESS_DATA);
    });

    it("Imports correct ETC address data", () => {
      const addressData = evm.importByPrivateKey(
        MOCK_COMMON_ETC_ADDRESS_DATA.path,
        MOCK_COMMON_ETC_ADDRESS_DATA.privateKey
      );

      expect(addressData).toEqual(MOCK_COMMON_ETC_ADDRESS_DATA);
    });

    it("Imports correct Coinomi-ETC address data", () => {
      const addressData = evm.importByPrivateKey(
        MOCK_COMMON_COINOMI_ETC_ADDRESS_DATA.path,
        MOCK_COMMON_COINOMI_ETC_ADDRESS_DATA.privateKey
      );

      expect(addressData).toEqual(MOCK_COMMON_COINOMI_ETC_ADDRESS_DATA);
    });
  });
});
