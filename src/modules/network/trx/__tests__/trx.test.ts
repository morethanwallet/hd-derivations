import { getNetwork } from "../../get-network/index.js";
import { trxConfig } from "../../libs/modules/config/index.js";
import { Trx } from "../trx.network.js";
import { describe, it, expect, beforeAll } from "vitest";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";
import type { DerivationTypeMap } from "@/libs/types/index.js";

const MOCK_DERIVATION_PATH_BATCH_PREFIX = "m/44'/195'/0'/0";

const MOCK_CREDENTIAL = {
  privateKey: "975d54e79a1d711280246a22020d66dce264c008e419be7476d4be09d4c9c091",
  publicKey: "032ab8e3e5af0028d8048dd33fa079a7eb04d7737634c186513dadfbe88526810f",
  address: "TYNX2NJiXfKGvfvzX4Pd6jnpxPVQbMfUq1",
};

const MOCK_ITEM = {
  ...MOCK_CREDENTIAL,
  derivationPath: "m/44'/195'/0'/0/0",
};

const MOCK_EXTRINSIC_PRIVATE_KEY =
  "24f3c25fb405791851bb499dec9797b37ced60a2c7addda8f314374fefe1914a";

type TrxDerivationTypeUnion = DerivationTypeMap["trxBase"];

type NetworkDerivationsInstances = {
  [key in TrxDerivationTypeUnion]: Trx;
};

let networkDerivationsInstances = {} as NetworkDerivationsInstances;

beforeAll(() => {
  networkDerivationsInstances["trxBase"] = getNetwork({
    network: "trx",
    mnemonic: MNEMONIC,
    derivationConfig: {
      derivationType: "trxBase",
      prefixConfig: trxConfig.trxBase.prefixConfig,
    },
  });
});

describe("Trx", () => {
  describe("deriveItemFromMnemonic", () => {
    it("Derives correct trx base item", () => {
      const derivedItem = networkDerivationsInstances.trxBase.deriveItemFromMnemonic({
        derivationPath: MOCK_ITEM.derivationPath,
      });

      expect(MOCK_ITEM).toEqual(derivedItem);
    });
  });

  describe("getCredentialFromPK", () => {
    it("Derives correct trx base credential", () => {
      const credential = networkDerivationsInstances.trxBase.getCredentialFromPK({
        privateKey: MOCK_CREDENTIAL.privateKey,
      });

      expect(credential).toEqual(MOCK_CREDENTIAL);
    });
  });

  describe("deriveItemsBatchFromMnemonic", () => {
    it("Derives correct trx base items batch", () => {
      const items = networkDerivationsInstances.trxBase.deriveItemsBatchFromMnemonic({
        derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
        indexLookupFrom: INDEX_LOOKUP_FROM,
        indexLookupTo: INDEX_LOOKUP_TO,
      });

      expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_ITEM);
      expect(items.length).toBe(INDEX_LOOKUP_TO);
    });
  });

  describe("doesPKBelongToMnemonic", () => {
    describe("Validates native private key correctly", () => {
      it("Returns true for trx base private key", () => {
        const isNative = networkDerivationsInstances.trxBase.doesPKBelongToMnemonic({
          derivationPathPrefix: trxConfig.trxBase.derivationPathPrefix,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_CREDENTIAL.privateKey,
        });

        expect(isNative).toBe(true);
      });
    });

    describe("Validates extrinsic private key correctly", () => {
      it("Returns false for trx base private key", () => {
        const isNative = networkDerivationsInstances.trxBase.doesPKBelongToMnemonic({
          derivationPathPrefix: trxConfig.trxBase.derivationPathPrefix,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_EXTRINSIC_PRIVATE_KEY,
        });

        expect(isNative).toBe(false);
      });
    });
  });
});
