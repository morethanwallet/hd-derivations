import { describe, it, expect, beforeAll } from "vitest";
import { Bch } from "../bch.network.js";
import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../libs/types/index.js";
import type { BchDerivationTypeUnion } from "@/libs/types/index.js";
import { getNetwork } from "../../get-network/index.js";
import { bchConfig } from "../../libs/modules/config/index.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
} from "../../libs/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = { mainnet: "m/44'/145'/0'/0/0", testnet: "m/44'/1'/0'/0/0" };

const MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX = {
  mainnet: "m/44'/145'/0'/0",
  testnet: "m/44'/1'/0'/0",
};

const MOCK_COMMON_MAINNET_CREDENTIAL = {
  privateKey: "Kysn6FCsYUwSwYVdUD4c6kdntJeZCZWpPYPj6LjEV2pDPyWNFhjX",
  publicKey: "0333d222cc1fd501e74b6d64cb1e4dd85bbcb28d9ce3fd6a30133f5aa6211a8fc3",
};

const MOCK_MAINNET_CREDENTIAL = {
  bchLegacy: {
    ...MOCK_COMMON_MAINNET_CREDENTIAL,
    address: "1P1nxaA36Q63qUo6CvcFqmdHVeQRSECH3Z",
  },
  bchCashAddr: {
    ...MOCK_COMMON_MAINNET_CREDENTIAL,
    address: "bitcoincash:qrchjgvn4keqa6qwesjvywyj2fy46x2ex556xmy82u",
  },
};

const MOCK_MAINNET_ITEM = {
  bchLegacy: {
    ...MOCK_MAINNET_CREDENTIAL.bchLegacy,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet,
  },
  bchCashAddr: {
    ...MOCK_MAINNET_CREDENTIAL.bchCashAddr,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet,
  },
};

const MOCK_COMMON_MAINNET_EXTRINSIC_PRIVATE_KEY =
  "KxUYbZfVLLEFehzKcNXJSJvmBjbYswf9ZEsasfH5vFbdvvwS1F31";

const MOCK_COMMON_TESTNET_CREDENTIAL = {
  privateKey: "cQEPGT34NWGzWnW1JE3d5GKaBcEQJqUsDdxH2jXD97CkXaAaXHEn",
  publicKey: "02d76e63231c59c216550ef886d362d58ba96ee30eb56caa99f5cdaf651b9a9a6e",
};

const MOCK_TESTNET_CREDENTIAL = {
  bchLegacy: {
    ...MOCK_COMMON_TESTNET_CREDENTIAL,
    address: "mk2hF1aSuKkBZtCUM9jDfjgFLE5gGJ8U8c",
  },
  bchCashAddr: {
    ...MOCK_COMMON_TESTNET_CREDENTIAL,
    address: "bchtest:qqccq645kqhy9sp3vz2xx293a0xa5ywcwgvc06zrfh",
  },
};

const MOCK_TESTNET_ITEM = {
  bchLegacy: {
    ...MOCK_TESTNET_CREDENTIAL.bchLegacy,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet,
  },
  bchCashAddr: {
    ...MOCK_TESTNET_CREDENTIAL.bchCashAddr,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet,
  },
};

const MOCK_REGTEST_CREDENTIAL = {
  bchLegacy: {
    ...MOCK_TESTNET_CREDENTIAL.bchLegacy,
  },
  bchCashAddr: {
    ...MOCK_TESTNET_CREDENTIAL.bchCashAddr,
    address: "bchreg:qqccq645kqhy9sp3vz2xx293a0xa5ywcwgvc06zrfh",
  },
};

const MOCK_REGTEST_ITEM = {
  bchLegacy: {
    ...MOCK_REGTEST_CREDENTIAL.bchLegacy,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet,
  },
  bchCashAddr: {
    ...MOCK_REGTEST_CREDENTIAL.bchCashAddr,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet,
  },
};

const MOCK_COMMON_TESTNETS_EXTRINSIC_PRIVATE_KEY =
  "cPS2rfjHVcJxNCTnxgoALhzeqCFFHadE4tButfB4L2aoowkMP4m7";

type NetworksDerivations = {
  [key in CommonNetworkPurposeRegTestExtendedUnion]: { [key in BchDerivationTypeUnion]: Bch };
};

let networksDerivations = {} as NetworksDerivations;

beforeAll(() => {
  const networkPurposes: CommonNetworkPurposeRegTestExtendedUnion[] = [
    "mainnet",
    "testnet",
    "regtest",
  ] as const;

  const derivationTypes: BchDerivationTypeUnion[] = ["bchCashAddr", "bchLegacy"] as const;

  networksDerivations = networkPurposes.reduce<NetworksDerivations>(
    (networksDerivations, networkPurpose) => {
      networksDerivations[networkPurpose] = derivationTypes.reduce<
        NetworksDerivations[CommonNetworkPurposeRegTestExtendedUnion]
      >(
        (derivations, derivationType) => {
          derivations[derivationType] = getNetwork({
            network: "bch",
            mnemonic: MNEMONIC,
            derivationConfig: {
              networkPurpose,
              derivationType,
              prefixConfig: bchConfig[networkPurpose][derivationType].prefixConfig,
            },
          });

          return derivations;
        },
        {} as NetworksDerivations[CommonNetworkPurposeRegTestExtendedUnion],
      );

      return networksDerivations;
    },
    {} as NetworksDerivations,
  );
});

describe("Bch", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networksDerivations.mainnet.bchLegacy.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.bchLegacy.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.bchLegacy).toEqual(derivedItem);
      });

      it("Derives correct cashAddr item", () => {
        const derivedItem = networksDerivations.mainnet.bchCashAddr.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.bchCashAddr.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.bchCashAddr).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networksDerivations.mainnet.bchLegacy.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.bchLegacy.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.bchLegacy);
      });

      it("Derives correct cashAddr credential", () => {
        const credential = networksDerivations.mainnet.bchCashAddr.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.bchCashAddr.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.bchCashAddr);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networksDerivations.mainnet.bchLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.bchLegacy);
      });

      it("Derives correct cashAddr items batch", () => {
        const items = networksDerivations.mainnet.bchCashAddr.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.bchCashAddr);
      });
    });

    describe("doesPKeyBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networksDerivations.mainnet.bchLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.mainnet.bchLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.bchLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for cashAddr private key", () => {
          const isNative = networksDerivations.mainnet.bchCashAddr.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.mainnet.bchCashAddr.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.bchCashAddr.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networksDerivations.mainnet.bchLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.mainnet.bchLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_COMMON_MAINNET_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for cashAddr private key", () => {
          const isNative = networksDerivations.mainnet.bchCashAddr.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.mainnet.bchCashAddr.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_COMMON_MAINNET_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networksDerivations.testnet.bchLegacy.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.bchLegacy.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.bchLegacy).toEqual(derivedItem);
      });

      it("Derives correct cashAddr item", () => {
        const derivedItem = networksDerivations.testnet.bchCashAddr.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.bchCashAddr.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.bchCashAddr).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networksDerivations.testnet.bchLegacy.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.bchLegacy.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.bchLegacy);
      });

      it("Derives correct cashAddr credential", () => {
        const credential = networksDerivations.testnet.bchCashAddr.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.bchCashAddr.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.bchCashAddr);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networksDerivations.testnet.bchLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.bchLegacy);
      });

      it("Derives correct cashAddr items batch", () => {
        const items = networksDerivations.testnet.bchCashAddr.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.bchCashAddr);
      });
    });

    describe("doesPKeyBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networksDerivations.testnet.bchLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.testnet.bchLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.bchLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for cashAddr private key", () => {
          const isNative = networksDerivations.testnet.bchCashAddr.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.testnet.bchCashAddr.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.bchCashAddr.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networksDerivations.testnet.bchLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.testnet.bchLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_COMMON_TESTNETS_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for cashAddr private key", () => {
          const isNative = networksDerivations.testnet.bchCashAddr.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.testnet.bchCashAddr.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_COMMON_TESTNETS_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("regtest", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networksDerivations.regtest.bchLegacy.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.bchLegacy.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.bchLegacy).toEqual(derivedItem);
      });

      it("Derives correct cashAddr item", () => {
        const derivedItem = networksDerivations.regtest.bchCashAddr.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.bchCashAddr.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.bchCashAddr).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networksDerivations.regtest.bchLegacy.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.bchLegacy.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.bchLegacy);
      });

      it("Derives correct cashAddr credential", () => {
        const credential = networksDerivations.regtest.bchCashAddr.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.bchCashAddr.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.bchCashAddr);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networksDerivations.regtest.bchLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.bchLegacy);
      });

      it("Derives correct cashAddr items batch", () => {
        const items = networksDerivations.regtest.bchCashAddr.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.bchCashAddr);
      });
    });

    describe("doesPKeyBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networksDerivations.regtest.bchLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.regtest.bchLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.bchLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for cashAddr private key", () => {
          const isNative = networksDerivations.regtest.bchCashAddr.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.regtest.bchCashAddr.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.bchCashAddr.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networksDerivations.regtest.bchLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.regtest.bchLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_COMMON_TESTNETS_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for cashAddr private key", () => {
          const isNative = networksDerivations.regtest.bchCashAddr.doesPKBelongToMnemonic({
            derivationPathPrefix: bchConfig.regtest.bchCashAddr.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_COMMON_TESTNETS_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
