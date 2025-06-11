import { describe, it, expect } from "vitest";
import { getNetwork } from "../../get-network/index.js";
import { evmConfig } from "../../libs/modules/config/index.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";

const MOCK_DERIVATION_PATH = {
  eth: "m/44'/60'/0'/0/0",
  etc: "m/44'/61'/0'/0/0",
  coinomiEth: "m/44'/60'/0'/0",
  coinomiEtc: "m/44'/61'/0'/0",
};

const MOCK_DERIVATION_PATH_BATCH_PREFIX = {
  eth: "m/44'/60'/0'/0",
  etc: "m/44'/61'/0'/0",
  coinomiEth: "m/44'/60'/0'",
  coinomiEtc: "m/44'/61'/0'",
};

const MOCK_CREDENTIAL = {
  eth: {
    address: "0xe2052Bf288Ef2cE6169Ac6C093393Aa7e295d85F",
    privateKey: "0xd98df20e93f62d5a49a8d68ef1f62b0ea5a6e464c96990100c4ddad98ee98ec1",
    publicKey: "0x022a0a4834e8c570137875e5c778d07e54b2650fb06571f5bf38273b87d803f14d",
  },
  etc: {
    address: "0xFDd33f0319579E7eF575AaE61dD3248d7bB39072",
    privateKey: "0x21464359ede2d6afc3cec9e6b4424b66128701aa824d51fa59b1a09cde902f36",
    publicKey: "0x036db722271cb407addc53cb17af7086ac9538a9e4e19217d4b842c4286468c727",
  },
  coinomiEth: {
    address: "0xDE258AEbc7C1566Eed1558204F159F13B8EDD86c",
    privateKey: "0x8e1b4aac6cdd6ded8fc7150aa104f7cbde9c3cec3691c28daa41e9e875925617",
    publicKey: "0x021418e69bc18c8235ed37330a4cc02d1fdc22227f74113bb44d58687dce775476",
  },
  coinomiEtc: {
    address: "0x319B9b87246b67f13AD7C79294d8017baB1AB006",
    privateKey: "0x02d8b0735f531ebac67015917432964d6c8a29cf4a8957775eadacedd16da0cb",
    publicKey: "0x0256ab3b98cfbfb88ae1d0675402f96774260e9828de64e60fd1173c591182929d",
  },
};

const MOCK_ITEM = {
  eth: { ...MOCK_CREDENTIAL.eth, derivationPath: MOCK_DERIVATION_PATH.eth },
  etc: { ...MOCK_CREDENTIAL.etc, derivationPath: MOCK_DERIVATION_PATH.etc },
  coinomiEth: { ...MOCK_CREDENTIAL.coinomiEth, derivationPath: MOCK_DERIVATION_PATH.coinomiEth },
  coinomiEtc: { ...MOCK_CREDENTIAL.coinomiEtc, derivationPath: MOCK_DERIVATION_PATH.coinomiEtc },
};

const MOCK_EXTRINSIC_PRIVATE_KEY = {
  eth: { privateKey: "0x72ee340cc3613e52031a24877cd134e20194d96fb85c50dfbb7035d6b8ac08d0" },
  etc: { privateKey: "0x092535b9f32ccde35d2f6693126d380e6b7269d0344bfdb0ca3e2bc5ab7551dc" },
  coinomiEth: { privateKey: "0x7750b3847811b4612cfb4f4c7f962632593b3bb776fa385e86a7f3c18f9280f9" },
  coinomiEtc: { privateKey: "0x32e7c1d1418bb32d5cf0b83b0c19b727c92a12bc0681334ce11b591d2cd42891" },
};

const evmNetworkDerivation = await getNetwork({
  network: "evm",
  mnemonic: MNEMONIC,
});

describe("Evm", () => {
  describe("deriveItemFromMnemonic", () => {
    it("Derives correct eth item", () => {
      const derivedItem = evmNetworkDerivation.deriveItemFromMnemonic({
        derivationPath: MOCK_ITEM.eth.derivationPath,
      });

      expect(MOCK_ITEM.eth).toEqual(derivedItem);
    });

    it("Derives correct etc item", () => {
      const derivedItem = evmNetworkDerivation.deriveItemFromMnemonic({
        derivationPath: MOCK_ITEM.etc.derivationPath,
      });

      expect(MOCK_ITEM.etc).toEqual(derivedItem);
    });

    it("Derives correct coinomiEth item", () => {
      const derivedItem = evmNetworkDerivation.deriveItemFromMnemonic({
        derivationPath: MOCK_ITEM.coinomiEth.derivationPath,
      });

      expect(MOCK_ITEM.coinomiEth).toEqual(derivedItem);
    });

    it("Derives correct coinomiEtc item", () => {
      const derivedItem = evmNetworkDerivation.deriveItemFromMnemonic({
        derivationPath: MOCK_ITEM.coinomiEtc.derivationPath,
      });

      expect(MOCK_ITEM.coinomiEtc).toEqual(derivedItem);
    });
  });

  describe("getCredentialFromPK", () => {
    it("Derives correct eth credential", () => {
      const credential = evmNetworkDerivation.getCredentialFromPK({
        privateKey: MOCK_CREDENTIAL.eth.privateKey,
      });

      expect(credential).toEqual(MOCK_CREDENTIAL.eth);
    });

    it("Derives correct etc credential", () => {
      const credential = evmNetworkDerivation.getCredentialFromPK({
        privateKey: MOCK_CREDENTIAL.etc.privateKey,
      });

      expect(credential).toEqual(MOCK_CREDENTIAL.etc);
    });

    it("Derives correct coinomiEth credential", () => {
      const credential = evmNetworkDerivation.getCredentialFromPK({
        privateKey: MOCK_CREDENTIAL.coinomiEth.privateKey,
      });

      expect(credential).toEqual(MOCK_CREDENTIAL.coinomiEth);
    });

    it("Derives correct coinomiEtc credential", () => {
      const credential = evmNetworkDerivation.getCredentialFromPK({
        privateKey: MOCK_CREDENTIAL.coinomiEtc.privateKey,
      });

      expect(credential).toEqual(MOCK_CREDENTIAL.coinomiEtc);
    });
  });

  describe("deriveItemsBatchFromMnemonic", () => {
    it("Derives correct eth items batch", () => {
      const items = evmNetworkDerivation.deriveItemsBatchFromMnemonic({
        derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.eth,
        indexLookupFrom: INDEX_LOOKUP_FROM,
        indexLookupTo: INDEX_LOOKUP_TO,
      });

      expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_ITEM.eth);
      expect(items.length).toBe(INDEX_LOOKUP_TO);
    });

    it("Derives correct etc items batch", () => {
      const items = evmNetworkDerivation.deriveItemsBatchFromMnemonic({
        derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.etc,
        indexLookupFrom: INDEX_LOOKUP_FROM,
        indexLookupTo: INDEX_LOOKUP_TO,
      });

      expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_ITEM.etc);
      expect(items.length).toBe(INDEX_LOOKUP_TO);
    });

    it("Derives correct coinomiEth items batch", () => {
      const items = evmNetworkDerivation.deriveItemsBatchFromMnemonic({
        derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.coinomiEth,
        indexLookupFrom: INDEX_LOOKUP_FROM,
        indexLookupTo: INDEX_LOOKUP_TO,
      });

      expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_ITEM.coinomiEth);
      expect(items.length).toBe(INDEX_LOOKUP_TO);
    });

    it("Derives correct coinomiEtc items batch", () => {
      const items = evmNetworkDerivation.deriveItemsBatchFromMnemonic({
        derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.coinomiEtc,
        indexLookupFrom: INDEX_LOOKUP_FROM,
        indexLookupTo: INDEX_LOOKUP_TO,
      });

      expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_ITEM.coinomiEtc);
      expect(items.length).toBe(INDEX_LOOKUP_TO);
    });
  });

  describe("doesPKBelongToMnemonic", () => {
    describe("Validates native private key correctly", () => {
      it("Returns true for eth private key", () => {
        const isNative = evmNetworkDerivation.doesPKBelongToMnemonic({
          derivationPathPrefix: evmConfig.derivationPathPrefix.eth,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_CREDENTIAL.eth.privateKey,
        });

        expect(isNative).toBe(true);
      });

      it("Returns true for etc private key", () => {
        const isNative = evmNetworkDerivation.doesPKBelongToMnemonic({
          derivationPathPrefix: evmConfig.derivationPathPrefix.etc,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_CREDENTIAL.etc.privateKey,
        });

        expect(isNative).toBe(true);
      });

      it("Returns true for coinomiEth private key", () => {
        const isNative = evmNetworkDerivation.doesPKBelongToMnemonic({
          derivationPathPrefix: evmConfig.derivationPathPrefix.eth,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_CREDENTIAL.coinomiEth.privateKey,
        });

        expect(isNative).toBe(true);
      });

      it("Returns true for coinomiEtc private key", () => {
        const isNative = evmNetworkDerivation.doesPKBelongToMnemonic({
          derivationPathPrefix: evmConfig.derivationPathPrefix.etc,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_CREDENTIAL.coinomiEtc.privateKey,
        });

        expect(isNative).toBe(true);
      });
    });

    describe("Validates extrinsic private key correctly", () => {
      it("Returns false for eth private key", () => {
        const isNative = evmNetworkDerivation.doesPKBelongToMnemonic({
          derivationPathPrefix: evmConfig.derivationPathPrefix.eth,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_EXTRINSIC_PRIVATE_KEY.eth.privateKey,
        });

        expect(isNative).toBe(false);
      });

      it("Returns false for etc private key", () => {
        const isNative = evmNetworkDerivation.doesPKBelongToMnemonic({
          derivationPathPrefix: evmConfig.derivationPathPrefix.etc,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_EXTRINSIC_PRIVATE_KEY.etc.privateKey,
        });

        expect(isNative).toBe(false);
      });

      it("Returns false for coinomiEth private key", () => {
        const isNative = evmNetworkDerivation.doesPKBelongToMnemonic({
          derivationPathPrefix: evmConfig.derivationPathPrefix.eth,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_EXTRINSIC_PRIVATE_KEY.coinomiEth.privateKey,
        });

        expect(isNative).toBe(false);
      });

      it("Returns false for coinomiEtc private key", () => {
        const isNative = evmNetworkDerivation.doesPKBelongToMnemonic({
          derivationPathPrefix: evmConfig.derivationPathPrefix.etc,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_EXTRINSIC_PRIVATE_KEY.coinomiEtc.privateKey,
        });

        expect(isNative).toBe(false);
      });
    });
  });
});
