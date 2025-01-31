import { getNetwork } from "../../get-network/index.js";
import { avaxConfig } from "../../libs/modules/config/index.js";
import { Avax } from "../avax.network.js";
import { describe, it, expect, beforeAll } from "vitest";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
} from "../../libs/constants/index.js";
import type { CommonNetworkPurposeUnion } from "../../libs/types/index.js";
import type { AvaxDerivationTypeUnion } from "@/libs/types/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = "m/44'/9000'/0'/0/0";

const MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX = "m/44'/9000'/0'/0";

const MOCK_COMMON_MAINNET_CREDENTIAL = {
  privateKey: "ae1c060b7d334b62797a911a8478a40c20489124c6c5d84c2391ffddf38b3d16",
  publicKey: "03fe1af122c37da0765c691057f18e3d2810efba796068b2cb710f36710ba8ad3b",
};

const MOCK_MAINNET_CREDENTIAL = {
  x: {
    ...MOCK_COMMON_MAINNET_CREDENTIAL,
    address: "X-avax1ecca9lzv4gj68826c2856ll0zz8aknxfcky982",
  },
  p: {
    ...MOCK_COMMON_MAINNET_CREDENTIAL,
    address: "P-avax1ecca9lzv4gj68826c2856ll0zz8aknxfcky982",
  },
};

const MOCK_MAINNET_ITEM = {
  x: {
    ...MOCK_MAINNET_CREDENTIAL.x,
    derivationPath: MOCK_COMMON_DERIVATION_PATH,
  },
  p: {
    ...MOCK_MAINNET_CREDENTIAL.p,
    derivationPath: MOCK_COMMON_DERIVATION_PATH,
  },
};

const MOCK_COMMON_EXTRINSIC_PRIVATE_KEY =
  "262723ff31600c88d9ba431cd7ff1d59f13359708f7bf9d426c58f3b508b1b83";

const MOCK_TESTNET_CREDENTIAL = {
  x: {
    ...MOCK_MAINNET_CREDENTIAL.x,
    address: "X-fuji1ecca9lzv4gj68826c2856ll0zz8aknxf5yq6t4",
  },
  p: {
    ...MOCK_MAINNET_CREDENTIAL.p,
    address: "P-fuji1ecca9lzv4gj68826c2856ll0zz8aknxf5yq6t4",
  },
};

const MOCK_TESTNET_ITEM = {
  x: {
    ...MOCK_TESTNET_CREDENTIAL.x,
    derivationPath: MOCK_COMMON_DERIVATION_PATH,
  },
  p: {
    ...MOCK_TESTNET_CREDENTIAL.p,
    derivationPath: MOCK_COMMON_DERIVATION_PATH,
  },
};

type NetworksDerivations = {
  [key in CommonNetworkPurposeUnion]: { [key in AvaxDerivationTypeUnion]: Avax };
};

let networksDerivations = {} as NetworksDerivations;

beforeAll(() => {
  const networkPurposes: CommonNetworkPurposeUnion[] = ["mainnet", "testnet"] as const;
  const derivationTypes: AvaxDerivationTypeUnion[] = ["avaxP", "avaxX"] as const;

  networksDerivations = networkPurposes.reduce<NetworksDerivations>(
    (networksDerivations, networkPurpose) => {
      networksDerivations[networkPurpose] = derivationTypes.reduce<
        NetworksDerivations[CommonNetworkPurposeUnion]
      >(
        (derivations, derivationType) => {
          derivations[derivationType] = getNetwork({
            network: "avax",
            mnemonic: MNEMONIC,
            derivationConfig: {
              networkPurpose,
              derivationType,
              prefixConfig: avaxConfig[networkPurpose].avax.prefixConfig,
            },
          });

          return derivations;
        },
        {} as NetworksDerivations[CommonNetworkPurposeUnion],
      );

      return networksDerivations;
    },
    {} as NetworksDerivations,
  );
});

describe("Avax", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct avax X item", () => {
        const derivedItem = networksDerivations.mainnet.avaxX.deriveItemFromMnemonic({
          derivationPath: MOCK_COMMON_DERIVATION_PATH,
        });

        expect(MOCK_MAINNET_ITEM.x).toEqual(derivedItem);
      });

      it("Derives correct avax P item", () => {
        const derivedItem = networksDerivations.mainnet.avaxP.deriveItemFromMnemonic({
          derivationPath: MOCK_COMMON_DERIVATION_PATH,
        });

        expect(MOCK_MAINNET_ITEM.p).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct avax X credential", () => {
        const credential = networksDerivations.mainnet.avaxX.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.x.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.x);
      });

      it("Derives correct avax P credential", () => {
        const credential = networksDerivations.mainnet.avaxP.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.p.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.p);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct avax X items batch", () => {
        const items = networksDerivations.mainnet.avaxX.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.x);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct avax P items batch", () => {
        const items = networksDerivations.mainnet.avaxP.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.p);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for avax X private key", () => {
          const isNative = networksDerivations.mainnet.avaxX.doesPKBelongToMnemonic({
            derivationPathPrefix: avaxConfig.mainnet.avax.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.x.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for avax P private key", () => {
          const isNative = networksDerivations.mainnet.avaxP.doesPKBelongToMnemonic({
            derivationPathPrefix: avaxConfig.mainnet.avax.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.p.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for avax X private key", () => {
          const isNative = networksDerivations.mainnet.avaxX.doesPKBelongToMnemonic({
            derivationPathPrefix: avaxConfig.mainnet.avax.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_COMMON_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for avax P private key", () => {
          const isNative = networksDerivations.mainnet.avaxP.doesPKBelongToMnemonic({
            derivationPathPrefix: avaxConfig.mainnet.avax.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_COMMON_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct avax X item", () => {
        const derivedItem = networksDerivations.testnet.avaxX.deriveItemFromMnemonic({
          derivationPath: MOCK_COMMON_DERIVATION_PATH,
        });

        expect(MOCK_TESTNET_ITEM.x).toEqual(derivedItem);
      });

      it("Derives correct avax P item", () => {
        const derivedItem = networksDerivations.testnet.avaxP.deriveItemFromMnemonic({
          derivationPath: MOCK_COMMON_DERIVATION_PATH,
        });

        expect(MOCK_TESTNET_ITEM.p).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct avax X credential", () => {
        const credential = networksDerivations.testnet.avaxX.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.x.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.x);
      });

      it("Derives correct avax P credential", () => {
        const credential = networksDerivations.testnet.avaxP.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.p.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.p);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct avax X items batch", () => {
        const items = networksDerivations.testnet.avaxX.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.x);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct avax P items batch", () => {
        const items = networksDerivations.testnet.avaxP.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.p);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for avax X private key", () => {
          const isNative = networksDerivations.testnet.avaxX.doesPKBelongToMnemonic({
            derivationPathPrefix: avaxConfig.testnet.avax.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.x.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for avax P private key", () => {
          const isNative = networksDerivations.testnet.avaxP.doesPKBelongToMnemonic({
            derivationPathPrefix: avaxConfig.testnet.avax.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.p.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for avax X private key", () => {
          const isNative = networksDerivations.testnet.avaxX.doesPKBelongToMnemonic({
            derivationPathPrefix: avaxConfig.testnet.avax.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_COMMON_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for avax P private key", () => {
          const isNative = networksDerivations.testnet.avaxP.doesPKBelongToMnemonic({
            derivationPathPrefix: avaxConfig.testnet.avax.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_COMMON_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
