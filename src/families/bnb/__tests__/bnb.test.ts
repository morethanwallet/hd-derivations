import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Bnb } from "../bnb.network.js";
import { EMPTY_MNEMONIC } from "@/keyDerivation/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = "m/44'/714'/0'/0/0";

const MOCK_MAINNET_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    address: "bnb1np9fcggud8kecg9s20dm6hqev8qzg87c2tja2u",
    privateKey: "06fe8f9f44307b0c2385003a3541aafacb2ffe987f39372a529418ce4781a41d",
    publicKey:
      "04154c152a64d514a2d79fffc778b4481dd7312a584dee86ea684115ae1c7fd42a2da10f052c7b93e8d2497961a80ba9929dfb2f41892ce482dbc211df9f67f8c9",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    address: "bnb1vyhvmuy8e57p2yag8vg46vpwpvhs758wf7jvgz",
    privateKey: "331c8f3e423db52e2fb5fc64a6f9408c41cd56d814bc64868a9d27ab83cfa683",
    publicKey:
      "04b29940377548d2a48e0b56fa05feacdbd0c32f93759eef6445d2c45e2da393b7b95d4695b474f9a4735285ea7b96cca8fde716a73bbc69497ed7f8bdbaee2327",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
};

let mnemonic: Mnemonic;
let bnb: Bnb;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  bnb = new Bnb(mnemonic);
});

describe("Bnb", () => {
  describe("derive", () => {
    it("Derives correct item", () => {
      const derivedItem = bnb.derive(MOCK_MAINNET_ADDRESS_DATA.native.path);

      expect(MOCK_MAINNET_ADDRESS_DATA.native).toEqual(derivedItem);
    });
  });

  describe("importByPrivateKey", () => {
    describe("Import from a native mnemonic", () => {
      it("Imports correct item", () => {
        const credential = bnb.importByPrivateKey(
          MOCK_MAINNET_ADDRESS_DATA.native.path,
          MOCK_MAINNET_ADDRESS_DATA.native.privateKey
        );

        expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native);
      });
    });

    describe("Import from a non-native mnemonic", () => {
      it("Imports correct item", () => {
        const credential = bnb.importByPrivateKey(
          MOCK_MAINNET_ADDRESS_DATA.nonNative.path,
          MOCK_MAINNET_ADDRESS_DATA.nonNative.privateKey
        );

        expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative);
      });
    });
  });
});
