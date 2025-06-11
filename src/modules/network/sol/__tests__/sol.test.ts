import { getNetwork } from "../../get-network/index.js";
import { solConfig } from "../../libs/modules/config/index.js";
import { describe, it, expect } from "vitest";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";

const MOCK_DERIVATION_PATH = "m/44'/501'/0'/0'";

const MOCK_DERIVATION_PATH_BATCH_PREFIX = "m/44'/501'/0'";

const MOCK_CREDENTIAL = {
  privateKey:
    "4w2nErAfyJXymM3P4VKqY6ZPTXACerLYHjhuW8pB4NW2pt4JMR8rqXxRZzmAfjaAGFMvZyVp7kGA7ra1q7QNhqkX",
  publicKey: "DAZg25rW4ntdn4TVya9hCdNpsxsfyMUrF2RSitrpKFGF",
  address: "DAZg25rW4ntdn4TVya9hCdNpsxsfyMUrF2RSitrpKFGF",
};

const MOCK_ITEM = { ...MOCK_CREDENTIAL, derivationPath: MOCK_DERIVATION_PATH };

const MOCK_EXTRINSIC_PRIVATE_KEY =
  "2kGgMTsQbm2HwZtXFBoiB61ysVLFtokWSuhcCwPN3Nr2G5EChbuHgCsm4fegZYXKwx27YQczzcA3WePrkuvJZSn4";

const solNetworkDerivation = await getNetwork({
  network: "sol",
  mnemonic: MNEMONIC,
});

describe("Sol", () => {
  describe("deriveItemFromMnemonic", () => {
    it("Derives correct item", () => {
      const derivedItem = solNetworkDerivation.deriveItemFromMnemonic({
        derivationPath: MOCK_DERIVATION_PATH,
      });

      expect(MOCK_ITEM).toEqual(derivedItem);
    });
  });

  describe("getCredentialFromPK", () => {
    it("Derives correct credential", () => {
      const credential = solNetworkDerivation.getCredentialFromPK({
        privateKey: MOCK_CREDENTIAL.privateKey,
      });

      expect(credential).toEqual(MOCK_CREDENTIAL);
    });
  });

  describe("deriveItemsBatchFromMnemonic", () => {
    it("Derives correct items batch", () => {
      const items = solNetworkDerivation.deriveItemsBatchFromMnemonic({
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
      it("Returns true", () => {
        const isNative = solNetworkDerivation.doesPKBelongToMnemonic({
          derivationPathPrefix: solConfig.solBase.derivationPathPrefix,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_CREDENTIAL.privateKey,
        });

        expect(isNative).toBe(true);
      });
    });

    describe("Validates extrinsic private key correctly", () => {
      it("Returns false", () => {
        const isNative = solNetworkDerivation.doesPKBelongToMnemonic({
          derivationPathPrefix: solConfig.solBase.derivationPathPrefix,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
          privateKey: MOCK_EXTRINSIC_PRIVATE_KEY,
        });

        expect(isNative).toBe(false);
      });
    });
  });
});
