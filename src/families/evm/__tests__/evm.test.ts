import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Evm } from "../evm.network.js";
import { EMPTY_MNEMONIC } from "@/keyDerivation/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = {
  ethCompatible: "m/44'/60'/0'/0/0",
  etc: "m/44'/61'/0'/0/0",
  coinomiEth: "m/44'/60'/0'/0",
  coinomiEtc: "m/44'/61'/0'/0",
};

const MOCK_ADDRESS_DATA = {
  native: {
    ethCompatible: {
      mnemonic: MNEMONIC,
      address: "0xe2052Bf288Ef2cE6169Ac6C093393Aa7e295d85F",
      privateKey: "0xd98df20e93f62d5a49a8d68ef1f62b0ea5a6e464c96990100c4ddad98ee98ec1",
      publicKey: "0x022a0a4834e8c570137875e5c778d07e54b2650fb06571f5bf38273b87d803f14d",
      path: MOCK_COMMON_DERIVATION_PATH.ethCompatible,
    },
    etc: {
      mnemonic: MNEMONIC,
      address: "0xFDd33f0319579E7eF575AaE61dD3248d7bB39072",
      privateKey: "0x21464359ede2d6afc3cec9e6b4424b66128701aa824d51fa59b1a09cde902f36",
      publicKey: "0x036db722271cb407addc53cb17af7086ac9538a9e4e19217d4b842c4286468c727",
      path: MOCK_COMMON_DERIVATION_PATH.etc,
    },
    coinomiEth: {
      mnemonic: MNEMONIC,
      address: "0xDE258AEbc7C1566Eed1558204F159F13B8EDD86c",
      privateKey: "0x8e1b4aac6cdd6ded8fc7150aa104f7cbde9c3cec3691c28daa41e9e875925617",
      publicKey: "0x021418e69bc18c8235ed37330a4cc02d1fdc22227f74113bb44d58687dce775476",
      path: MOCK_COMMON_DERIVATION_PATH.coinomiEth,
    },
    coinomiEtc: {
      mnemonic: MNEMONIC,
      address: "0x319B9b87246b67f13AD7C79294d8017baB1AB006",
      privateKey: "0x02d8b0735f531ebac67015917432964d6c8a29cf4a8957775eadacedd16da0cb",
      publicKey: "0x0256ab3b98cfbfb88ae1d0675402f96774260e9828de64e60fd1173c591182929d",
      path: MOCK_COMMON_DERIVATION_PATH.coinomiEtc,
    },
  },
  nonNative: {
    ethCompatible: {
      mnemonic: EMPTY_MNEMONIC,
      address: "0xdd484a507E85fEf39d1e064871D6f7A4794FEf74",
      privateKey: "0x72ee340cc3613e52031a24877cd134e20194d96fb85c50dfbb7035d6b8ac08d0",
      publicKey: "0x0391cbb2e07e8af2ffc7a4c9fa4bdd9b2882689e023c7a8c3cd79ee31485a3ebea",
      path: MOCK_COMMON_DERIVATION_PATH.ethCompatible,
    },
    etc: {
      mnemonic: EMPTY_MNEMONIC,
      address: "0x514eab62C63E968FAc8fa8440639b149aDcA3212",
      privateKey: "0x092535b9f32ccde35d2f6693126d380e6b7269d0344bfdb0ca3e2bc5ab7551dc",
      publicKey: "0x02c145135b47bfaf296ba111b3fb726f4765ff3719c7b19f7631d9512d4bca5230",
      path: MOCK_COMMON_DERIVATION_PATH.etc,
    },
    coinomiEth: {
      mnemonic: EMPTY_MNEMONIC,
      address: "0xbBDAf3469d04e72105fE6AC07d7d8910Bab1d8b9",
      privateKey: "0x7750b3847811b4612cfb4f4c7f962632593b3bb776fa385e86a7f3c18f9280f9",
      publicKey: "0x02d80ec29bd82c3e1bb8c976716cb2f2f96faa8d7861970366d733f1e9bd7e8f8d",
      path: MOCK_COMMON_DERIVATION_PATH.coinomiEth,
    },
    coinomiEtc: {
      mnemonic: EMPTY_MNEMONIC,
      address: "0xb185C61F78E3851b77d44C5F5E187F5E1614300E",
      privateKey: "0x32e7c1d1418bb32d5cf0b83b0c19b727c92a12bc0681334ce11b591d2cd42891",
      publicKey: "0x038e426908e7c6ecdcd895b6113bb8715cb931a0220273df54618f2d3303d8dd35",
      path: MOCK_COMMON_DERIVATION_PATH.coinomiEtc,
    },
  },
};

let mnemonic: Mnemonic;
let evm: Evm;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  evm = new Evm(mnemonic);
});

describe("Evm", () => {
  describe("derive", () => {
    it("Derives correct Ethereum compatible item", () => {
      const derivedItem = evm.derive(MOCK_ADDRESS_DATA.native.ethCompatible.path);

      expect(derivedItem).toEqual(MOCK_ADDRESS_DATA.native.ethCompatible);
    });

    it("Derives correct Coinomi-ETH item", () => {
      const derivedItem = evm.derive(MOCK_ADDRESS_DATA.native.coinomiEth.path);

      expect(derivedItem).toEqual(MOCK_ADDRESS_DATA.native.coinomiEth);
    });

    it("Derives correct ETC item", () => {
      const derivedItem = evm.derive(MOCK_ADDRESS_DATA.native.etc.path);

      expect(derivedItem).toEqual(MOCK_ADDRESS_DATA.native.etc);
    });

    it("Derives correct Coinomi-ETC item", () => {
      const derivedItem = evm.derive(MOCK_ADDRESS_DATA.native.coinomiEtc.path);

      expect(derivedItem).toEqual(MOCK_ADDRESS_DATA.native.coinomiEtc);
    });
  });

  describe("importByPrivateKey", () => {
    describe("Import from a native mnemonic", () => {
      it("Imports correct Ethereum compatible item", () => {
        const credential = evm.importByPrivateKey(
          MOCK_ADDRESS_DATA.native.ethCompatible.path,
          MOCK_ADDRESS_DATA.native.ethCompatible.privateKey
        );

        expect(credential).toEqual(MOCK_ADDRESS_DATA.native.ethCompatible);
      });

      it("Imports correct Coinomi-ETH item", () => {
        const credential = evm.importByPrivateKey(
          MOCK_ADDRESS_DATA.native.coinomiEth.path,
          MOCK_ADDRESS_DATA.native.coinomiEth.privateKey
        );

        expect(credential).toEqual(MOCK_ADDRESS_DATA.native.coinomiEth);
      });

      it("Imports correct ETC item", () => {
        const credential = evm.importByPrivateKey(
          MOCK_ADDRESS_DATA.native.etc.path,
          MOCK_ADDRESS_DATA.native.etc.privateKey
        );

        expect(credential).toEqual(MOCK_ADDRESS_DATA.native.etc);
      });

      it("Imports correct Coinomi-ETC item", () => {
        const credential = evm.importByPrivateKey(
          MOCK_ADDRESS_DATA.native.coinomiEtc.path,
          MOCK_ADDRESS_DATA.native.coinomiEtc.privateKey
        );

        expect(credential).toEqual(MOCK_ADDRESS_DATA.native.coinomiEtc);
      });
    });

    describe("Import from a non-native mnemonic", () => {
      it("Imports correct Ethereum compatible item", () => {
        const credential = evm.importByPrivateKey(
          MOCK_ADDRESS_DATA.nonNative.ethCompatible.path,
          MOCK_ADDRESS_DATA.nonNative.ethCompatible.privateKey
        );

        expect(credential).toEqual(MOCK_ADDRESS_DATA.nonNative.ethCompatible);
      });

      it("Imports correct Coinomi-ETH item", () => {
        const credential = evm.importByPrivateKey(
          MOCK_ADDRESS_DATA.nonNative.coinomiEth.path,
          MOCK_ADDRESS_DATA.nonNative.coinomiEth.privateKey
        );

        expect(credential).toEqual(MOCK_ADDRESS_DATA.nonNative.coinomiEth);
      });

      it("Imports correct ETC item", () => {
        const credential = evm.importByPrivateKey(
          MOCK_ADDRESS_DATA.nonNative.etc.path,
          MOCK_ADDRESS_DATA.nonNative.etc.privateKey
        );

        expect(credential).toEqual(MOCK_ADDRESS_DATA.nonNative.etc);
      });

      it("Imports correct Coinomi-ETC item", () => {
        const credential = evm.importByPrivateKey(
          MOCK_ADDRESS_DATA.nonNative.coinomiEtc.path,
          MOCK_ADDRESS_DATA.nonNative.coinomiEtc.privateKey
        );

        expect(credential).toEqual(MOCK_ADDRESS_DATA.nonNative.coinomiEtc);
      });
    });
  });
});
