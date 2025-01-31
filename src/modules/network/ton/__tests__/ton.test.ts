import { getNetwork } from "../../get-network/index.js";
import { tonConfig } from "../../libs/modules/config/index.js";
import { Ton } from "../ton.network.js";
import { describe, it, expect, beforeAll } from "vitest";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";
import type { TonAddressRequiredData } from "@/libs/modules/address/index.js";
import type { CommonNetworkPurposeUnion } from "../../libs/types/index.js";

const MOCK_DERIVATION_PATH = "m/44'/607'/0'";

const MOCK_DERIVATION_PATH_BATCH_PREFIX = "m/44'/607'";

const MOCK_COMMON_CREDENTIAL = {
  privateKey: "54880ef61fe42136b13659bd697621e6a28fdcd68de2ed76c26e4c4cf5d3a71d",
  publicKey: "80833ff2a61cbf811b6ebfc9cc960ec46772efc22248277f2e711ef6dbe21244",
};

const MOCK_EXTRINSIC_PRIVATE_KEY =
  "894dae5850a4b024d534fc13efd3ca5cd702a4d08942348998e9c2093943506e";

const MOCK_MAINNET_CREDENTIAL = {
  v4r1: { ...MOCK_COMMON_CREDENTIAL, address: "UQD3OkMP7RtswmW2lih9_yhoNW5T9XoZ3K7fyZJwerb8y0qL" },
  v5r1: { ...MOCK_COMMON_CREDENTIAL, address: "UQA6PIkdOyxOI2WseKE8sFdhLSipfpaRCVehigoOmyw-iSJy" },
};

const MOCK_MAINNET_ITEM = {
  v4r1: { ...MOCK_MAINNET_CREDENTIAL.v4r1, derivationPath: MOCK_DERIVATION_PATH },
  v5r1: { ...MOCK_MAINNET_CREDENTIAL.v5r1, derivationPath: MOCK_DERIVATION_PATH },
};

const MOCK_TESTNET_CREDENTIAL = {
  v4r1: { ...MOCK_COMMON_CREDENTIAL, address: "0QD3OkMP7RtswmW2lih9_yhoNW5T9XoZ3K7fyZJwerb8y_EB" },
  v5r1: { ...MOCK_COMMON_CREDENTIAL, address: "0QA6PIkdOyxOI2WseKE8sFdhLSipfpaRCVehigoOmyw-iZn4" },
};

const MOCK_TESTNET_ITEM = {
  v4r1: { ...MOCK_TESTNET_CREDENTIAL.v4r1, derivationPath: MOCK_DERIVATION_PATH },
  v5r1: { ...MOCK_TESTNET_CREDENTIAL.v5r1, derivationPath: MOCK_DERIVATION_PATH },
};

type TestContractVersion = Extract<TonAddressRequiredData["contractVersion"], "v4r1" | "v5r1">;

type NetworksDerivations = {
  [key in CommonNetworkPurposeUnion]: {
    [key in TestContractVersion]: Ton;
  };
};

let networksDerivations = {} as NetworksDerivations;

beforeAll(() => {
  const networkPurposes: CommonNetworkPurposeUnion[] = ["mainnet", "testnet"] as const;
  const contractVersions: TestContractVersion[] = ["v4r1", "v5r1"] as const;

  networksDerivations = networkPurposes.reduce<NetworksDerivations>(
    (networksDerivations, networkPurpose) => {
      networksDerivations[networkPurpose] = contractVersions.reduce<
        NetworksDerivations[CommonNetworkPurposeUnion]
      >(
        (contractVersions, contractVersion) => {
          contractVersions[contractVersion] = getNetwork({
            network: "ton",
            mnemonic: MNEMONIC,
            derivationConfig: {
              networkPurpose,
              contractVersion,
              derivationType: "tonBase",
              workChain: 0,
              isFriendlyFormat: true,
              friendlyFormatArguments: {
                bounceable: false,
                urlSafe: true,
              },
            },
          });

          return contractVersions;
        },
        {} as NetworksDerivations[CommonNetworkPurposeUnion],
      );

      return networksDerivations;
    },
    {} as NetworksDerivations,
  );
});

describe("Ton", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct v4r1 item", () => {
        const derivedItem = networksDerivations.mainnet.v4r1.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.v4r1.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.v4r1).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct v4r1 credential", () => {
        const credential = networksDerivations.mainnet.v4r1.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.v4r1.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.v4r1);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct v4r1 items batch", () => {
        const items = networksDerivations.mainnet.v4r1.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.v4r1);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKeyBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true", () => {
          const isNative = networksDerivations.mainnet.v4r1.doesPKBelongToMnemonic({
            derivationPathPrefix: tonConfig.tonBase.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.v4r1.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false", () => {
          const isNative = networksDerivations.mainnet.v4r1.doesPKBelongToMnemonic({
            derivationPathPrefix: tonConfig.tonBase.derivationPathPrefix,
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
      it("Derives correct v5r1 item", () => {
        const derivedItem = networksDerivations.testnet.v5r1.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.v5r1.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.v5r1).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct v5r1 credential", () => {
        const credential = networksDerivations.testnet.v5r1.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.v5r1.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.v5r1);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct v5r1 items batch", () => {
        const items = networksDerivations.testnet.v5r1.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.v5r1);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKeyBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true", () => {
          const isNative = networksDerivations.testnet.v5r1.doesPKBelongToMnemonic({
            derivationPathPrefix: tonConfig.tonBase.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.v5r1.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false", () => {
          const isNative = networksDerivations.testnet.v5r1.doesPKBelongToMnemonic({
            derivationPathPrefix: tonConfig.tonBase.derivationPathPrefix,
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
