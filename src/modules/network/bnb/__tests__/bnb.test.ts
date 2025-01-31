import { getNetwork } from "../../get-network/index.js";
import {
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
  FIRST_ITEM_INDEX,
} from "../../libs/constants/index.js";
import { bnbConfig } from "../../libs/modules/config/index.js";
import { Bnb } from "../bnb.network.js";
import { describe, it, expect, beforeAll } from "vitest";

const MOCK_DERIVATION_PATH = "m/44'/714'/0'/0/0";

const MOCK_DERIVATION_PATH_BATCH_PREFIX = "m/44'/714'/0'/0";

const MOCK_CREDENTIAL = {
  privateKey: "06fe8f9f44307b0c2385003a3541aafacb2ffe987f39372a529418ce4781a41d",
  publicKey:
    "04154c152a64d514a2d79fffc778b4481dd7312a584dee86ea684115ae1c7fd42a2da10f052c7b93e8d2497961a80ba9929dfb2f41892ce482dbc211df9f67f8c9",
  address: "bnb1np9fcggud8kecg9s20dm6hqev8qzg87c2tja2u",
};

const MOCK_ITEM = {
  ...MOCK_CREDENTIAL,
  derivationPath: MOCK_DERIVATION_PATH,
};

const MOCK_EXTRINSIC_PRIVATE_KEY =
  "331c8f3e423db52e2fb5fc64a6f9408c41cd56d814bc64868a9d27ab83cfa683";

let bnbNetworkDerivation: Bnb;

beforeAll(() => {
  bnbNetworkDerivation = getNetwork({
    network: "bnb",
    derivationConfig: { prefixConfig: bnbConfig.prefixConfig },
    mnemonic: MNEMONIC,
  });
});

describe("Bnb", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct item", () => {
        const derivedItem = bnbNetworkDerivation.deriveItemFromMnemonic({
          derivationPath: MOCK_DERIVATION_PATH,
        });

        expect(MOCK_ITEM).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct credential", () => {
        const credential = bnbNetworkDerivation.getCredentialFromPK({
          privateKey: MOCK_CREDENTIAL.privateKey,
        });

        expect(credential).toEqual(MOCK_CREDENTIAL);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct items batch", () => {
        const items = bnbNetworkDerivation.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_ITEM);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true", () => {
          const isNative = bnbNetworkDerivation.doesPKBelongToMnemonic({
            derivationPathPrefix: bnbConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_CREDENTIAL.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false", () => {
          const isNative = bnbNetworkDerivation.doesPKBelongToMnemonic({
            derivationPathPrefix: bnbConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});

// const MOCK_MAINNET_ADDRESS_DATA = {
//   native: {
//     mnemonic: MNEMONIC,
//     address: "bnb1np9fcggud8kecg9s20dm6hqev8qzg87c2tja2u",
//     privateKey: "",
//     publicKey:
//       "",
//     path: MOCK_COMMON_DERIVATION_PATH,
//   },
//   nonNative: {
//     mnemonic: EMPTY_MNEMONIC,
//     address: "",
//     privateKey: "",
//     publicKey:
//       "04b29940377548d2a48e0b56fa05feacdbd0c32f93759eef6445d2c45e2da393b7b95d4695b474f9a4735285ea7b96cca8fde716a73bbc69497ed7f8bdbaee2327",
//     path: MOCK_COMMON_DERIVATION_PATH,
//   },
// };
