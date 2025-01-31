import { describe, it, expect, beforeAll } from "vitest";
import { Xrp } from "../xrp.network.js";
import type { CommonNetworkPurposeUnion } from "../../libs/types/index.js";
import type { XrpDerivationTypeUnion } from "@/libs/types/index.js";
import { getNetwork } from "../../get-network/index.js";
import { xrpConfig } from "../../libs/modules/config/index.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
} from "../../libs/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

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

type NetworksDerivations = {
  [key in CommonNetworkPurposeUnion]: { [key in XrpDerivationTypeUnion]: Xrp };
};

let networksDerivations = {} as NetworksDerivations;

beforeAll(() => {
  const networkPurposes: CommonNetworkPurposeUnion[] = ["mainnet", "testnet"] as const;
  const derivationTypes: XrpDerivationTypeUnion[] = ["xrpBase", "xrpX"] as const;

  networksDerivations = networkPurposes.reduce<NetworksDerivations>(
    (networksDerivations, networkPurpose) => {
      networksDerivations[networkPurpose] = derivationTypes.reduce<
        NetworksDerivations[CommonNetworkPurposeUnion]
      >(
        (derivations, derivationType) => {
          derivations[derivationType] = getNetwork({
            network: "xrp",
            mnemonic: MNEMONIC,
            derivationConfig: {
              networkPurpose,
              derivationType,
              prefixConfig: xrpConfig.prefixConfig,
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

describe("Xrp", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct base item", () => {
        const derivedItem = networksDerivations.mainnet.xrpBase.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.xrpBase.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.xrpBase).toEqual(derivedItem);
      });

      it("Derives correct x item", () => {
        const derivedItem = networksDerivations.mainnet.xrpX.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.xrpX.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.xrpX).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct base credential", () => {
        const credential = networksDerivations.mainnet.xrpBase.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.xrpBase.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.xrpBase);
      });

      it("Derives correct x credential", () => {
        const credential = networksDerivations.mainnet.xrpX.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.xrpX.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.xrpX);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct base items batch", () => {
        const items = networksDerivations.mainnet.xrpBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.xrpBase);
      });

      it("Derives correct x items batch", () => {
        const items = networksDerivations.mainnet.xrpX.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.xrpX);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for base private key", () => {
          const isNative = networksDerivations.mainnet.xrpBase.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.xrpBase.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for x private key", () => {
          const isNative = networksDerivations.mainnet.xrpX.doesPKBelongToMnemonic({
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
          const isNative = networksDerivations.mainnet.xrpBase.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for x private key", () => {
          const isNative = networksDerivations.mainnet.xrpX.doesPKBelongToMnemonic({
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
        const derivedItem = networksDerivations.testnet.xrpBase.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.xrpBase.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.xrpBase).toEqual(derivedItem);
      });

      it("Derives correct x item", () => {
        const derivedItem = networksDerivations.testnet.xrpX.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.xrpX.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.xrpX).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct base credential", () => {
        const credential = networksDerivations.testnet.xrpBase.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.xrpBase.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.xrpBase);
      });

      it("Derives correct x credential", () => {
        const credential = networksDerivations.testnet.xrpX.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.xrpX.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.xrpX);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct base items batch", () => {
        const items = networksDerivations.testnet.xrpBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.xrpBase);
      });

      it("Derives correct x items batch", () => {
        const items = networksDerivations.testnet.xrpX.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.xrpX);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for base private key", () => {
          const isNative = networksDerivations.testnet.xrpBase.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.xrpBase.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for x private key", () => {
          const isNative = networksDerivations.testnet.xrpX.doesPKBelongToMnemonic({
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
          const isNative = networksDerivations.testnet.xrpBase.doesPKBelongToMnemonic({
            derivationPathPrefix: xrpConfig.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for x private key", () => {
          const isNative = networksDerivations.testnet.xrpX.doesPKBelongToMnemonic({
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
