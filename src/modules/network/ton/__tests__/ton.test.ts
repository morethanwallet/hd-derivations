import { describe, it, expect } from "vitest";

import { getNetwork } from "../../get-network/get-network.js";
import { tonConfig } from "../../libs/modules/config/index.js";
import { type Ton } from "../ton.network.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";
import type { CommonNetworkPurposeUnion } from "../../libs/types/index.js";

import type { TonAddressRequiredData } from "@/libs/modules/address/address.js";
import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";

const DerivationPath = {
  tonBase: "m/44'/607'/0'",
  tonExodus: "m/44'/607'/0'/0/0",
} as const;

const DerivationPathBatchPrefix = {
  tonBase: "m/44'/607'",
  tonExodus: "m/44'/607'/0'/0",
} as const;

const COMMON_CREDENTIAL = {
  tonBase: {
    privateKey: "54880ef61fe42136b13659bd697621e6a28fdcd68de2ed76c26e4c4cf5d3a71d",
    publicKey: "80833ff2a61cbf811b6ebfc9cc960ec46772efc22248277f2e711ef6dbe21244",
  },
  tonExodus: {
    privateKey: "ebb7a5f798b4300f412e92e85521928997fc1cefd3032c5714759395dc9c1f24",
    publicKey: "cb81d43ab02288251cda7b0611edbbe1e63452256949d253dfbf4a034f57edbe",
  },
};

const EXTRINSIC_PRIVATE_KEY: Record<DerivationTypeUnionByNetwork["ton"], string> = {
  tonBase: "894dae5850a4b024d534fc13efd3ca5cd702a4d08942348998e9c2093943506e",
  tonExodus: "ce0e7d391567c64264c5e1648897ffdd42bb823b32a30048f40fd59e728e2970",
};

const MAINNET_CREDENTIAL = {
  tonBase: {
    v4r2: {
      ...COMMON_CREDENTIAL.tonBase,
      address: "UQD3OkMP7RtswmW2lih9_yhoNW5T9XoZ3K7fyZJwerb8y0qL",
    },
    v5r1: {
      ...COMMON_CREDENTIAL.tonBase,
      address: "UQA6PIkdOyxOI2WseKE8sFdhLSipfpaRCVehigoOmyw-iSJy",
    },
  },
  tonExodus: {
    v4r2: {
      ...COMMON_CREDENTIAL.tonExodus,
      address: "UQD9a1--mTMA-bUi0b952nM1EnOknsksdJtgzZ697MrQ8w_3",
    },
    v5r1: {
      ...COMMON_CREDENTIAL.tonExodus,
      address: "UQAQfIGY4Wat7vQ4evtzPJglPWDimeKPbrldomU8UkKATJRm",
    },
  },
};

const MAINNET_ITEM = {
  tonBase: {
    v4r2: { ...MAINNET_CREDENTIAL.tonBase.v4r2, derivationPath: DerivationPath.tonBase },
    v5r1: { ...MAINNET_CREDENTIAL.tonBase.v5r1, derivationPath: DerivationPath.tonBase },
  },
  tonExodus: {
    v4r2: { ...MAINNET_CREDENTIAL.tonExodus.v4r2, derivationPath: DerivationPath.tonExodus },
    v5r1: { ...MAINNET_CREDENTIAL.tonExodus.v5r1, derivationPath: DerivationPath.tonExodus },
  },
};

const TESTNET_CREDENTIAL = {
  tonBase: {
    v4r2: {
      ...COMMON_CREDENTIAL.tonBase,
      address: "0QD3OkMP7RtswmW2lih9_yhoNW5T9XoZ3K7fyZJwerb8y_EB",
    },
    v5r1: {
      ...COMMON_CREDENTIAL.tonBase,
      address: "0QA6PIkdOyxOI2WseKE8sFdhLSipfpaRCVehigoOmyw-iZn4",
    },
  },
  tonExodus: {
    v4r2: {
      ...COMMON_CREDENTIAL.tonExodus,
      address: "0QD9a1--mTMA-bUi0b952nM1EnOknsksdJtgzZ697MrQ87R9",
    },
    v5r1: {
      ...COMMON_CREDENTIAL.tonExodus,
      address: "0QAQfIGY4Wat7vQ4evtzPJglPWDimeKPbrldomU8UkKATC_s",
    },
  },
};

const TESTNET_ITEM = {
  tonBase: {
    v4r2: { ...TESTNET_CREDENTIAL.tonBase.v4r2, derivationPath: DerivationPath.tonBase },
    v5r1: { ...TESTNET_CREDENTIAL.tonBase.v5r1, derivationPath: DerivationPath.tonBase },
  },
  tonExodus: {
    v4r2: { ...TESTNET_CREDENTIAL.tonExodus.v4r2, derivationPath: DerivationPath.tonExodus },
    v5r1: { ...TESTNET_CREDENTIAL.tonExodus.v5r1, derivationPath: DerivationPath.tonExodus },
  },
};

type TestContractVersion = Extract<TonAddressRequiredData["contractVersion"], "v4r2" | "v5r1">;

type NetworkDerivationsInstances = {
  [key in CommonNetworkPurposeUnion]: {
    [key in DerivationTypeUnionByNetwork["ton"]]: {
      [key in TestContractVersion]: Ton;
    };
  };
};

let networkDerivationsInstances = {} as NetworkDerivationsInstances;

beforeAll(() => {
  const networkPurposes: CommonNetworkPurposeUnion[] = ["mainnet", "testnet"] as const;
  const contractVersions: TestContractVersion[] = ["v4r2", "v5r1"] as const;
  const derivationTypes: DerivationTypeUnionByNetwork["ton"][] = ["tonBase", "tonExodus"] as const;

  for (const networkPurpose of networkPurposes) {
    if (!networkDerivationsInstances[networkPurpose]) {
      networkDerivationsInstances[networkPurpose] =
        {} as NetworkDerivationsInstances[CommonNetworkPurposeUnion];
    }

    for (const derivationType of derivationTypes) {
      if (!networkDerivationsInstances[networkPurpose][derivationType]) {
        networkDerivationsInstances[networkPurpose][derivationType] =
          {} as NetworkDerivationsInstances[CommonNetworkPurposeUnion][DerivationTypeUnionByNetwork["ton"]];
      }

      for (const contractVersion of contractVersions) {
        networkDerivationsInstances[networkPurpose][derivationType][contractVersion] = getNetwork({
          network: "ton",
          mnemonic: MNEMONIC,
          derivationConfig: {
            networkPurpose,
            contractVersion,
            derivationType,
            workChain: 0,
            isFriendlyFormat: true,
            friendlyFormatArguments: {
              bounceable: false,
              urlSafe: true,
            },
          },
        });
      }
    }
  }
});

describe("Ton", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct v4r2 tonBase item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.tonBase.v4r2.deriveItemFromMnemonic(
          {
            derivationPath: MAINNET_ITEM.tonBase.v4r2.derivationPath,
          },
        );

        expect(MAINNET_ITEM.tonBase.v4r2).toEqual(derivedItem);
      });

      it("Derives correct v4r2 tonExodus item", () => {
        const derivedItem =
          networkDerivationsInstances.mainnet.tonExodus.v4r2.deriveItemFromMnemonic({
            derivationPath: MAINNET_ITEM.tonExodus.v4r2.derivationPath,
          });

        expect(MAINNET_ITEM.tonExodus.v4r2).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct v4r2 tonBase credential", () => {
        const credential = networkDerivationsInstances.mainnet.tonBase.v4r2.getCredentialFromPK({
          privateKey: MAINNET_CREDENTIAL.tonBase.v4r2.privateKey,
        });

        expect(credential).toEqual(MAINNET_CREDENTIAL.tonBase.v4r2);
      });

      it("Derives correct v4r2 tonExodus credential", () => {
        const credential = networkDerivationsInstances.mainnet.tonExodus.v4r2.getCredentialFromPK({
          privateKey: MAINNET_CREDENTIAL.tonExodus.v4r2.privateKey,
        });

        expect(credential).toEqual(MAINNET_CREDENTIAL.tonExodus.v4r2);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct v4r2 tonBase items batch", () => {
        const items = networkDerivationsInstances.mainnet.tonBase.v4r2.deriveItemsBatchFromMnemonic(
          {
            derivationPathPrefix: DerivationPathBatchPrefix.tonBase,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          },
        );

        expect(items[FIRST_ITEM_INDEX]).toEqual(MAINNET_ITEM.tonBase.v4r2);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct v4r2 tonExodus items batch", () => {
        const items =
          networkDerivationsInstances.mainnet.tonExodus.v4r2.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DerivationPathBatchPrefix.tonExodus,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MAINNET_ITEM.tonExodus.v4r2);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for tonBase", () => {
          const isNative = networkDerivationsInstances.mainnet.tonBase.v4r2.doesPKBelongToMnemonic({
            derivationPathPrefix: tonConfig.tonBase.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MAINNET_CREDENTIAL.tonBase.v4r2.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for tonExodus", () => {
          const isNative =
            networkDerivationsInstances.mainnet.tonExodus.v4r2.doesPKBelongToMnemonic({
              derivationPathPrefix: tonConfig.tonExodus.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MAINNET_CREDENTIAL.tonExodus.v4r2.privateKey,
            });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for tonBase", () => {
          const isNative = networkDerivationsInstances.mainnet.tonBase.v4r2.doesPKBelongToMnemonic({
            derivationPathPrefix: tonConfig.tonBase.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.tonBase,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for tonExodus", () => {
          const isNative =
            networkDerivationsInstances.mainnet.tonExodus.v4r2.doesPKBelongToMnemonic({
              derivationPathPrefix: tonConfig.tonExodus.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: EXTRINSIC_PRIVATE_KEY.tonExodus,
            });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct v5r1 tonBase item", () => {
        const derivedItem = networkDerivationsInstances.testnet.tonBase.v5r1.deriveItemFromMnemonic(
          {
            derivationPath: TESTNET_ITEM.tonBase.v5r1.derivationPath,
          },
        );

        expect(TESTNET_ITEM.tonBase.v5r1).toEqual(derivedItem);
      });

      it("Derives correct v5r1 tonExodus item", () => {
        const derivedItem =
          networkDerivationsInstances.testnet.tonExodus.v5r1.deriveItemFromMnemonic({
            derivationPath: TESTNET_ITEM.tonExodus.v5r1.derivationPath,
          });

        expect(TESTNET_ITEM.tonExodus.v5r1).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct v5r1 tonBase credential", () => {
        const credential = networkDerivationsInstances.testnet.tonBase.v5r1.getCredentialFromPK({
          privateKey: TESTNET_CREDENTIAL.tonBase.v5r1.privateKey,
        });

        expect(credential).toEqual(TESTNET_CREDENTIAL.tonBase.v5r1);
      });

      it("Derives correct v5r1 tonExodus credential", () => {
        const credential = networkDerivationsInstances.testnet.tonExodus.v5r1.getCredentialFromPK({
          privateKey: TESTNET_CREDENTIAL.tonExodus.v5r1.privateKey,
        });

        expect(credential).toEqual(TESTNET_CREDENTIAL.tonExodus.v5r1);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct v5r1 tonBase items batch", () => {
        const items = networkDerivationsInstances.testnet.tonBase.v5r1.deriveItemsBatchFromMnemonic(
          {
            derivationPathPrefix: DerivationPathBatchPrefix.tonBase,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          },
        );

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_ITEM.tonBase.v5r1);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct v5r1 tonExodus items batch", () => {
        const items =
          networkDerivationsInstances.testnet.tonExodus.v5r1.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DerivationPathBatchPrefix.tonExodus,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_ITEM.tonExodus.v5r1);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for tonBase", () => {
          const isNative = networkDerivationsInstances.testnet.tonBase.v5r1.doesPKBelongToMnemonic({
            derivationPathPrefix: tonConfig.tonBase.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_CREDENTIAL.tonBase.v5r1.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for tonExodus", () => {
          const isNative =
            networkDerivationsInstances.testnet.tonExodus.v5r1.doesPKBelongToMnemonic({
              derivationPathPrefix: tonConfig.tonExodus.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_CREDENTIAL.tonExodus.v5r1.privateKey,
            });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for tonBase", () => {
          const isNative = networkDerivationsInstances.testnet.tonBase.v5r1.doesPKBelongToMnemonic({
            derivationPathPrefix: tonConfig.tonBase.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.tonBase,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for tonExodus", () => {
          const isNative =
            networkDerivationsInstances.testnet.tonExodus.v5r1.doesPKBelongToMnemonic({
              derivationPathPrefix: tonConfig.tonExodus.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: EXTRINSIC_PRIVATE_KEY.tonExodus,
            });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
