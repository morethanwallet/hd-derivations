import { describe, it, expect } from "vitest";

import { type Doge } from "../doge.network.js";
import { getNetwork } from "../../get-network/get-network.js";
import { dogeConfig } from "../../libs/modules/config/index.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";
import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../libs/types/index.js";

const MOCK_DERIVATION_PATH = { mainnet: "m/44'/3'/0'/0/0", testnet: "m/44'/1'/0'/0/0" };

const MOCK_DERIVATION_PATH_BATCH_PREFIX = { mainnet: "m/44'/3'/0'/0", testnet: "m/44'/1'/0'/0" };

const MOCK_MAINNET_CREDENTIAL = {
  dogeLegacy: {
    address: "DTdPxCi432Vu2yQZqQYAeFBtJMsATtFeyc",
    privateKey: "QSziipfZmwGTd67cn9qQ5xCGpF8tC8bU2JeVVd2HwLWBdkMWVVqC",
    publicKey: "03ba5622f900d6eda980366d9b6f3eb319681727870d5e520df1d4964c5f6f1020",
  },
};

const MOCK_MAINNET_ITEM = {
  dogeLegacy: {
    ...MOCK_MAINNET_CREDENTIAL.dogeLegacy,
    derivationPath: MOCK_DERIVATION_PATH.mainnet,
  },
};

const MOCK_TESTNET_CREDENTIAL = {
  dogeLegacy: {
    address: "nYhuDEB2KgfwCkUePzPrdzDpbEbZmwtvvu",
    privateKey: "chPeQmkrip7GTpXYQNqQfcWYgUdhyg2KYXCY9eDQ84iB6EYq6JSJ",
    publicKey: "02d76e63231c59c216550ef886d362d58ba96ee30eb56caa99f5cdaf651b9a9a6e",
  },
};

const MOCK_TESTNET_ITEM = {
  dogeLegacy: {
    ...MOCK_TESTNET_CREDENTIAL.dogeLegacy,
    derivationPath: MOCK_DERIVATION_PATH.testnet,
  },
};

const MOCK_REGTEST_CREDENTIAL = {
  dogeLegacy: {
    ...MOCK_TESTNET_CREDENTIAL.dogeLegacy,
    address: "mk2hF1aSuKkBZtCUM9jDfjgFLE5gGJ8U8c",
    privateKey: "cQEPGT34NWGzWnW1JE3d5GKaBcEQJqUsDdxH2jXD97CkXaAaXHEn",
  },
};

const MOCK_REGTEST_ITEM = {
  dogeLegacy: {
    ...MOCK_REGTEST_CREDENTIAL.dogeLegacy,
    derivationPath: MOCK_DERIVATION_PATH.testnet,
  },
};

const MOCK_EXTRINSIC_PRIVATE_KEY = {
  mainnet: "QUUWv51Jn4XyzD3p1tFQpt12ezFDNt6WgTtaCbdTMXQy284vHCD7",
  testnet: "cgbHzzT5qv9EKEVL4qaww4BdL4eYxRAgPmSB1ZsFJz6ENc7e33Ru",
  regtest: "cPS2rfjHVcJxNCTnxgoALhzeqCFFHadE4tButfB4L2aoowkMP4m7",
};

type NetworkDerivationsInstances = {
  [key in CommonNetworkPurposeRegTestExtendedUnion]: { dogeLegacy: Doge };
};

let networkDerivationsInstances = {} as NetworkDerivationsInstances;

beforeAll(() => {
  const networkPurposes: CommonNetworkPurposeRegTestExtendedUnion[] = [
    "mainnet",
    "testnet",
    "regtest",
  ] as const;

  networkDerivationsInstances = networkPurposes.reduce<NetworkDerivationsInstances>(
    (networkDerivationsInstances, networkPurpose) => {
      networkDerivationsInstances[networkPurpose] = {
        dogeLegacy: getNetwork({
          network: "doge",
          mnemonic: MNEMONIC,
          derivationConfig: {
            networkPurpose,
            derivationType: "dogeLegacy",
          },
        }),
      };

      return networkDerivationsInstances;
    },
    {} as NetworkDerivationsInstances,
  );
});

describe("Doge", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.dogeLegacy.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.dogeLegacy.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.dogeLegacy).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networkDerivationsInstances.mainnet.dogeLegacy.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.dogeLegacy.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.dogeLegacy);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networkDerivationsInstances.mainnet.dogeLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.mainnet,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.dogeLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networkDerivationsInstances.mainnet.dogeLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: dogeConfig.mainnet.dogeLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.dogeLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networkDerivationsInstances.mainnet.dogeLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: dogeConfig.mainnet.dogeLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY.mainnet,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networkDerivationsInstances.testnet.dogeLegacy.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.dogeLegacy.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.dogeLegacy).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networkDerivationsInstances.testnet.dogeLegacy.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.dogeLegacy.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.dogeLegacy);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networkDerivationsInstances.testnet.dogeLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.testnet,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.dogeLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networkDerivationsInstances.testnet.dogeLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: dogeConfig.testnet.dogeLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.dogeLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networkDerivationsInstances.testnet.dogeLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: dogeConfig.testnet.dogeLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY.testnet,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("regtest", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networkDerivationsInstances.regtest.dogeLegacy.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.dogeLegacy.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.dogeLegacy).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networkDerivationsInstances.regtest.dogeLegacy.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.dogeLegacy.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.dogeLegacy);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networkDerivationsInstances.regtest.dogeLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.testnet,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.dogeLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networkDerivationsInstances.regtest.dogeLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: dogeConfig.regtest.dogeLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.dogeLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networkDerivationsInstances.regtest.dogeLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: dogeConfig.regtest.dogeLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY.regtest,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
