import { describe, it, expect } from "vitest";

import { getNetwork } from "../../get-network/get-network.js";
import { solConfig } from "../../libs/modules/config/index.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";

const DERIVATION_PATH = { solBase: "m/44'/501'/0'/0'", solExodus: "m/44'/501'/0'/0/0" };

const DERIVATION_PATH_BATCH_PREFIX = { solBase: "m/44'/501'/0'", solExodus: "m/44'/501'/0'/0" };

const CREDENTIAL = {
  solBase: {
    privateKey:
      "4w2nErAfyJXymM3P4VKqY6ZPTXACerLYHjhuW8pB4NW2pt4JMR8rqXxRZzmAfjaAGFMvZyVp7kGA7ra1q7QNhqkX",
    publicKey: "DAZg25rW4ntdn4TVya9hCdNpsxsfyMUrF2RSitrpKFGF",
    address: "DAZg25rW4ntdn4TVya9hCdNpsxsfyMUrF2RSitrpKFGF",
  },
  solExodus: {
    privateKey:
      "4uAMzZHQPeUqZCLSoEFjooLzuYGPBDq8a5m9HMu7N1EqfgN5nFdd17nuLBmNmdp6VUTBfwqdyURiQxSGH6XVxWQ2",
    publicKey: "5eTnRsNLVUooafQ5zLFdfm84p5pxKP8TcH6XZv1AVk7C",
    address: "5eTnRsNLVUooafQ5zLFdfm84p5pxKP8TcH6XZv1AVk7C",
  },
};

const ITEM = {
  solBase: { ...CREDENTIAL.solBase, derivationPath: DERIVATION_PATH.solBase },
  solExodus: { ...CREDENTIAL.solExodus, derivationPath: DERIVATION_PATH.solExodus },
};

const EXTRINSIC_PRIVATE_KEY = {
  solBase:
    "2kGgMTsQbm2HwZtXFBoiB61ysVLFtokWSuhcCwPN3Nr2G5EChbuHgCsm4fegZYXKwx27YQczzcA3WePrkuvJZSn4",
  solExodus:
    "66fqvVwDuPbaFMWd517XibfHr8CCdnyficppehPanyP2DmKNXSj7gnroDUBeBuHwo2Gf8KBNreeBWJEPWZAgdvtx",
};

const networkDerivationsInstances = {
  solBase: getNetwork({
    network: "sol",
    derivationConfig: { derivationType: "solBase" },
    mnemonic: MNEMONIC,
  }),
  solExodus: getNetwork({
    network: "sol",
    derivationConfig: { derivationType: "solExodus" },
    mnemonic: MNEMONIC,
  }),
};

describe("Sol", () => {
  describe("deriveItemFromMnemonic", () => {
    it("Derives correct base item", () => {
      const derivedItem = networkDerivationsInstances.solBase.deriveItemFromMnemonic({
        derivationPath: DERIVATION_PATH.solBase,
      });

      expect(ITEM.solBase).toEqual(derivedItem);
    });

    it("Derives correct exodus item", () => {
      const derivedItem = networkDerivationsInstances.solExodus.deriveItemFromMnemonic({
        derivationPath: DERIVATION_PATH.solExodus,
      });

      expect(ITEM.solExodus).toEqual(derivedItem);
    });
  });

  describe("getCredentialFromPK", () => {
    it("Derives correct base credential", () => {
      const credential = networkDerivationsInstances.solBase.getCredentialFromPK({
        privateKey: CREDENTIAL.solBase.privateKey,
      });

      expect(credential).toEqual(CREDENTIAL.solBase);
    });

    it("Derives correct exodus credential", () => {
      const credential = networkDerivationsInstances.solExodus.getCredentialFromPK({
        privateKey: CREDENTIAL.solExodus.privateKey,
      });

      expect(credential).toEqual(CREDENTIAL.solExodus);
    });
  });

  describe("deriveItemsBatchFromMnemonic", () => {
    it("Derives correct base items batch", () => {
      const items = networkDerivationsInstances.solBase.deriveItemsBatchFromMnemonic({
        derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.solBase,
        indexLookupFrom: INDEX_LOOKUP_FROM,
        indexLookupTo: INDEX_LOOKUP_TO,
      });

      expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.solBase);
      expect(items.length).toBe(INDEX_LOOKUP_TO);
    });

    it("Derives correct exodus items batch", () => {
      const items = networkDerivationsInstances.solExodus.deriveItemsBatchFromMnemonic({
        derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.solExodus,
        indexLookupFrom: INDEX_LOOKUP_FROM,
        indexLookupTo: INDEX_LOOKUP_TO,
      });

      expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.solExodus);
      expect(items.length).toBe(INDEX_LOOKUP_TO);
    });
  });

  describe("doesPKBelongToMnemonic", () => {
    describe("Validates native private key correctly", () => {
      it("Returns true for base private key", () => {
        const isNative = networkDerivationsInstances.solBase.doesPKBelongToMnemonic({
          derivationPathPrefix: solConfig.solBase.derivationPathPrefix,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: CREDENTIAL.solBase.privateKey,
        });

        expect(isNative).toBe(true);
      });

      it("Returns true for exodus private key", () => {
        const isNative = networkDerivationsInstances.solExodus.doesPKBelongToMnemonic({
          derivationPathPrefix: solConfig.solExodus.derivationPathPrefix,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: CREDENTIAL.solExodus.privateKey,
        });

        expect(isNative).toBe(true);
      });
    });

    describe("Validates extrinsic private key correctly", () => {
      it("Returns false for base private key", () => {
        const isNative = networkDerivationsInstances.solBase.doesPKBelongToMnemonic({
          derivationPathPrefix: solConfig.solBase.derivationPathPrefix,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: EXTRINSIC_PRIVATE_KEY.solBase,
        });

        expect(isNative).toBe(false);
      });

      it("Returns false for exodus private key", () => {
        const isNative = networkDerivationsInstances.solExodus.doesPKBelongToMnemonic({
          derivationPathPrefix: solConfig.solExodus.derivationPathPrefix,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: EXTRINSIC_PRIVATE_KEY.solExodus,
        });

        expect(isNative).toBe(false);
      });
    });
  });
});
