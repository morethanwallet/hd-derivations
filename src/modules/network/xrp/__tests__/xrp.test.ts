import { describe, it, expect } from "vitest";
import { Xrp } from "../xrp.network.js";
import type { CommonNetworkPurposeUnion } from "../../libs/types/index.js";
import type { XrpDerivationTypeUnion } from "@/libs/types/index.js";
import { getNetwork } from "../../get-network/index.js";
import { xrpConfig } from "../../libs/modules/config/index.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";

const MOCK_DERIVATION_PATH = "m/44'/144'/0'/0/0";

const MOCK_DERIVATION_PATH_BATCH_PREFIX = "m/44'/144'/0'/0";

const MOCK_COMMON_CREDENTIAL = {
  privateKey: "13bd9e44ec2266a37f4a5a54e912411c0143a3bfd2df39b94d52cf9aedb15f19",
  publicKey: "026a71c1a6598d85a4c6eacfe5afe8a1efef8b59b903ce23626209a738c712ee86",
};

const MOCK_EXTRINSIC_PRIVATE_KEY =
  "db74e35f96fe918731cd09d89aa344d20fe70bca821606eb4bc26768c08146aa";

const MOCK_MAINNET_CREDENTIAL = {
  xrpBase: {
    ...MOCK_COMMON_CREDENTIAL,
    address: "rLU7u4B8DgWxkApKZojJ2JSW1mct88XfwU",
  },
  xrpX: {
    ...MOCK_COMMON_CREDENTIAL,
    address: "XVYf9VURTnYU7gYKaKsvAKcNex2ZVLYyUY6EQVyNypzVKm1",
  },
};

const MOCK_MAINNET_ITEM = {
  xrpBase: {
    ...MOCK_MAINNET_CREDENTIAL.xrpBase,
    derivationPath: MOCK_DERIVATION_PATH,
  },
  xrpX: {
    ...MOCK_MAINNET_CREDENTIAL.xrpX,
    derivationPath: MOCK_DERIVATION_PATH,
  },
};

const MOCK_TESTNET_CREDENTIAL = {
  xrpBase: MOCK_MAINNET_CREDENTIAL.xrpBase,
  xrpX: {
    ...MOCK_COMMON_CREDENTIAL,
    address: "TVTdZbMQKsaDvUJv4f86qK493QfMzvDr95e65BUmZZYp6PW",
  },
};

const MOCK_TESTNET_ITEM = {
  xrpBase: MOCK_MAINNET_ITEM.xrpBase,
  xrpX: {
    ...MOCK_TESTNET_CREDENTIAL.xrpX,
    derivationPath: MOCK_DERIVATION_PATH,
  },
};

type NetworkDerivationsInstances = {
  [key in CommonNetworkPurposeUnion]: { [key in XrpDerivationTypeUnion]: Xrp };
};

const networkPurposes: CommonNetworkPurposeUnion[] = ["mainnet", "testnet"] as const;
const derivationTypes: XrpDerivationTypeUnion[] = ["xrpBase", "xrpX"] as const;

const networkDerivationsInstances = await networkPurposes.reduce(
  async (networkDerivationsInstances, networkPurpose) => {
    (await networkDerivationsInstances)[networkPurpose] = await derivationTypes.reduce(
      async (derivations, derivationType) => {
        (await derivations)[derivationType] = await getNetwork({
          network: "xrp",
          mnemonic: MNEMONIC,
          derivationConfig: {
            networkPurpose,
            derivationType,
          },
        });

        return derivations;
      },
      {} as Promise<NetworkDerivationsInstances[CommonNetworkPurposeUnion]>,
    );

    return networkDerivationsInstances;
  },
  {} as Promise<NetworkDerivationsInstances>,
);

describe("Xrp", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct base item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.xrpBase.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.xrpBase.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.xrpBase).toEqual(derivedItem);
      });

      it("Derives correct x item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.xrpX.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.xrpX.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.xrpX).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct base credential", () => {
        const credential = networkDerivationsInstances.mainnet.xrpBase.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.xrpBase.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.xrpBase);
      });

      it("Derives correct x credential", () => {
        const credential = networkDerivationsInstances.mainnet.xrpX.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.xrpX.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.xrpX);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct base items batch", () => {
        const items = networkDerivationsInstances.mainnet.xrpBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.xrpBase);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct x items batch", () => {
        const items = networkDerivationsInstances.mainnet.xrpX.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.xrpX);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for base private key", () => {
          const isNative = networkDerivationsInstances.mainnet.xrpBase.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.xrpBase.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for x private key", () => {
          const isNative = networkDerivationsInstances.mainnet.xrpX.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.xrpX.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for base private key", () => {
          const isNative = networkDerivationsInstances.mainnet.xrpBase.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for x private key", () => {
          const isNative = networkDerivationsInstances.mainnet.xrpX.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct base item", () => {
        const derivedItem = networkDerivationsInstances.testnet.xrpBase.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.xrpBase.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.xrpBase).toEqual(derivedItem);
      });

      it("Derives correct x item", () => {
        const derivedItem = networkDerivationsInstances.testnet.xrpX.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.xrpX.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.xrpX).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct base credential", () => {
        const credential = networkDerivationsInstances.testnet.xrpBase.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.xrpBase.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.xrpBase);
      });

      it("Derives correct x credential", () => {
        const credential = networkDerivationsInstances.testnet.xrpX.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.xrpX.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.xrpX);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct base items batch", () => {
        const items = networkDerivationsInstances.testnet.xrpBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.xrpBase);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct x items batch", () => {
        const items = networkDerivationsInstances.testnet.xrpX.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.xrpX);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for base private key", () => {
          const isNative = networkDerivationsInstances.testnet.xrpBase.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.xrpBase.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for x private key", () => {
          const isNative = networkDerivationsInstances.testnet.xrpX.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.xrpX.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for base private key", () => {
          const isNative = networkDerivationsInstances.testnet.xrpBase.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for x private key", () => {
          const isNative = networkDerivationsInstances.testnet.xrpX.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
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
