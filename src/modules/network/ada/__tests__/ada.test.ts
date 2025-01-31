import { describe, it, expect, beforeAll } from "vitest";
import { getNetwork } from "../../get-network/index.js";
import type { AdaNetworkPurposeUnion } from "../../libs/types/index.js";
import type { AdaDerivationTypeUnion } from "@/libs/types/index.js";
import { Ada } from "../ada.network.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
} from "../../libs/constants/index.js";
import { adaConfig } from "../../libs/modules/config/index.js";

const MNEMONIC =
  "relax grief spatial deer glass fish column rifle square license dry jealous water spoon salon";

const MOCK_COMMON_DERIVATION_PATH = {
  adaEnterprise: "m/1852'/1815'/0'/0/0",
  adaReward: "m/1852'/1815'/0'/2/0",
};

const MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX = {
  adaEnterprise: "m/1852'/1815'/0'/0",
  adaReward: "m/1852'/1815'/0'/2",
};

const MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY = {
  adaEnterprise: {
    privateKey:
      "68041711595dad2371187607fe556c60a01b5f6760616166e1ce5e67c63a7f5d8c2406acd619dbf059945271cf5d61c1d729e6757eac5b6ed7466f843e04fba2",
  },
  adaReward: {
    privateKey:
      "f8d0f492f823729b5e1a38b8191cb8271d9342924a9064c5aea9c37bc43a7f5daf772f592a11762827d4dae995f088a65984659dc953a2e162f5222595c8bd1d",
  },
};

const MOCK_COMMON_MAINNET_CREDENTIAL = {
  adaEnterprise: {
    privateKey:
      "e064be3c720832a235807601a93d7681a9d802342da100972e748505836cd84d1e2f7a95607e5726e4d95f833d698668b526c361150f925cac0af419c935dfa7",
    publicKey: "d6d4d074388d31c86b6e348f4218a6e6bd3682c2d89f0ee3b3908486d0b61ea6",
    address: "addr1vy55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48skpr66m",
  },
  adaReward: {
    privateKey:
      "d83a9bc8cc31735a679e31a6a1f57ba0f9601049dce1c9367a58fed9876cd84dfacca5ca6455fef78d27a679b86b853f08c4d733cccd59d2d1e759ff31d675a0",
    publicKey: "6634f8c5e7608e330bac48b22fc400ead26622ce29344507228698960419533e",
    address: "stake1uxhhajkk9gu4xl8p34hqen7fay2j529h8ynlk0t9yq8ujfg4rqhxx",
  },
};

const MOCK_MAINNET_CREDENTIAL = {
  adaEnterprise: MOCK_COMMON_MAINNET_CREDENTIAL.adaEnterprise,
  adaReward: MOCK_COMMON_MAINNET_CREDENTIAL.adaReward,
  adaBase: {
    enterprisePrivateKey: MOCK_COMMON_MAINNET_CREDENTIAL.adaEnterprise.privateKey,
    enterprisePublicKey: MOCK_COMMON_MAINNET_CREDENTIAL.adaEnterprise.publicKey,
    rewardPrivateKey: MOCK_COMMON_MAINNET_CREDENTIAL.adaReward.privateKey,
    rewardPublicKey: MOCK_COMMON_MAINNET_CREDENTIAL.adaReward.publicKey,
    address:
      "addr1qy55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48400m9dv23e2d7wrrtwpn8un6g49g5twwf8lv7k2gq0eyjseme3ur",
  },
};

const MOCK_MAINNET_ITEM = {
  adaEnterprise: {
    ...MOCK_MAINNET_CREDENTIAL.adaEnterprise,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.adaEnterprise,
  },
  adaReward: {
    ...MOCK_MAINNET_CREDENTIAL.adaReward,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.adaReward,
  },
  adaBase: {
    ...MOCK_MAINNET_CREDENTIAL.adaBase,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.adaEnterprise,
  },
};

const MOCK_TESTNET_PREVIEW_EXTRINSIC_PRIVATE_KEY = { ...MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY };

const MOCK_COMMON_TESTNET_PREVIEW_CREDENTIAL = {
  adaEnterprise: {
    ...MOCK_COMMON_MAINNET_CREDENTIAL.adaEnterprise,
    address: "addr_test1vq55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48sdfhx47",
  },
  adaReward: {
    ...MOCK_COMMON_MAINNET_CREDENTIAL.adaReward,
    address: "stake_test1uzhhajkk9gu4xl8p34hqen7fay2j529h8ynlk0t9yq8ujfgjf24zm",
  },
};

const MOCK_TESTNET_PREVIEW_CREDENTIAL = {
  adaEnterprise: MOCK_COMMON_TESTNET_PREVIEW_CREDENTIAL.adaEnterprise,
  adaReward: MOCK_COMMON_TESTNET_PREVIEW_CREDENTIAL.adaReward,
  adaBase: {
    enterprisePrivateKey: MOCK_COMMON_TESTNET_PREVIEW_CREDENTIAL.adaEnterprise.privateKey,
    enterprisePublicKey: MOCK_COMMON_TESTNET_PREVIEW_CREDENTIAL.adaEnterprise.publicKey,
    rewardPrivateKey: MOCK_COMMON_TESTNET_PREVIEW_CREDENTIAL.adaReward.privateKey,
    rewardPublicKey: MOCK_COMMON_TESTNET_PREVIEW_CREDENTIAL.adaReward.publicKey,
    address:
      "addr_test1qq55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48400m9dv23e2d7wrrtwpn8un6g49g5twwf8lv7k2gq0eyjs6dy3su",
  },
};

const MOCK_TESTNET_PREVIEW_ITEM = {
  adaEnterprise: {
    ...MOCK_TESTNET_PREVIEW_CREDENTIAL.adaEnterprise,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.adaEnterprise,
  },
  adaReward: {
    ...MOCK_TESTNET_PREVIEW_CREDENTIAL.adaReward,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.adaReward,
  },
  adaBase: {
    ...MOCK_TESTNET_PREVIEW_CREDENTIAL.adaBase,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.adaEnterprise,
  },
};

const MOCK_TESTNET_PREPROD_EXTRINSIC_PRIVATE_KEY = { ...MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY };

const MOCK_TESTNET_PREPROD_CREDENTIAL = { ...MOCK_TESTNET_PREVIEW_CREDENTIAL };

const MOCK_TESTNET_PREPROD_ITEM = { ...MOCK_TESTNET_PREVIEW_ITEM };

type NetworksDerivations = {
  [key in AdaNetworkPurposeUnion]: {
    [key in AdaDerivationTypeUnion]: Ada;
  };
};

let networksDerivations = {} as NetworksDerivations;

beforeAll(() => {
  const networkPurposes: AdaNetworkPurposeUnion[] = [
    "mainnet",
    "testnetPreprod",
    "testnetPreview",
  ] as const;

  const derivationTypes: AdaDerivationTypeUnion[] = [
    "adaBase",
    "adaEnterprise",
    "adaReward",
  ] as const;

  networksDerivations = networkPurposes.reduce<NetworksDerivations>(
    (networksDerivations, networkPurpose) => {
      networksDerivations[networkPurpose] = derivationTypes.reduce<
        NetworksDerivations[AdaNetworkPurposeUnion]
      >(
        (derivations, derivationType) => {
          derivations[derivationType] = getNetwork({
            network: "ada",
            mnemonic: MNEMONIC,
            derivationConfig: {
              networkPurpose,
              derivationType,
            },
          });

          return derivations;
        },
        {} as NetworksDerivations[AdaNetworkPurposeUnion],
      );

      return networksDerivations;
    },
    {} as NetworksDerivations,
  );
});

describe("Ada", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct enterprise item", () => {
        const derivedItem = networksDerivations.mainnet.adaEnterprise.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.adaEnterprise.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward item", () => {
        const derivedItem = networksDerivations.mainnet.adaReward.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.adaReward.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base item", () => {
        const derivedItem = networksDerivations.mainnet.adaBase.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.adaBase.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.adaBase).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct enterprise credential", () => {
        const derivedItem = networksDerivations.mainnet.adaEnterprise.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.adaEnterprise.privateKey,
        });

        expect(MOCK_MAINNET_CREDENTIAL.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward credential", () => {
        const derivedItem = networksDerivations.mainnet.adaReward.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.adaReward.privateKey,
        });

        expect(MOCK_MAINNET_CREDENTIAL.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base credential", () => {
        const derivedItem = networksDerivations.mainnet.adaBase.getCredentialFromPK({
          enterprisePrivateKey: MOCK_MAINNET_CREDENTIAL.adaBase.enterprisePrivateKey,
          rewardPrivateKey: MOCK_MAINNET_CREDENTIAL.adaBase.rewardPrivateKey,
        });

        expect(MOCK_MAINNET_CREDENTIAL.adaBase).toEqual(derivedItem);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct enterprise items batch", () => {
        const items = networksDerivations.mainnet.adaEnterprise.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.adaEnterprise);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct reward items batch", () => {
        const items = networksDerivations.mainnet.adaReward.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.adaReward,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.adaReward);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct base items batch", () => {
        const items = networksDerivations.mainnet.adaBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.adaBase);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for enterprise private key", () => {
          const isNative = networksDerivations.mainnet.adaEnterprise.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.mainnet.adaEnterprise.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.adaEnterprise.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for reward private key", () => {
          const isNative = networksDerivations.mainnet.adaReward.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.mainnet.adaReward.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.adaReward.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative = networksDerivations.mainnet.adaBase.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.mainnet.adaBase.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.adaBase.enterprisePrivateKey,
          });

          const isRewardKeyNative = networksDerivations.mainnet.adaBase.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.mainnet.adaBase.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.adaBase.rewardPrivateKey,
          });

          expect(isEnterpriseKeyNative).toBe(true);
          expect(isRewardKeyNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for enterprise private key", () => {
          const isNative = networksDerivations.mainnet.adaEnterprise.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.mainnet.adaEnterprise.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for reward private key", () => {
          const isNative = networksDerivations.mainnet.adaReward.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.mainnet.adaReward.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative = networksDerivations.mainnet.adaBase.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.mainnet.adaBase.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
          });

          const isRewardKeyNative = networksDerivations.mainnet.adaBase.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.mainnet.adaBase.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
          });

          expect(isEnterpriseKeyNative).toBe(false);
          expect(isRewardKeyNative).toBe(false);
        });
      });
    });
  });

  describe("testnet preview", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct enterprise item", () => {
        const derivedItem = networksDerivations.testnetPreview.adaEnterprise.deriveItemFromMnemonic(
          {
            derivationPath: MOCK_TESTNET_PREVIEW_ITEM.adaEnterprise.derivationPath,
          },
        );

        expect(MOCK_TESTNET_PREVIEW_ITEM.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward item", () => {
        const derivedItem = networksDerivations.testnetPreview.adaReward.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_PREVIEW_ITEM.adaReward.derivationPath,
        });

        expect(MOCK_TESTNET_PREVIEW_ITEM.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base item", () => {
        const derivedItem = networksDerivations.testnetPreview.adaBase.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_PREVIEW_ITEM.adaBase.derivationPath,
        });

        expect(MOCK_TESTNET_PREVIEW_ITEM.adaBase).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct enterprise credential", () => {
        const derivedItem = networksDerivations.testnetPreview.adaEnterprise.getCredentialFromPK({
          privateKey: MOCK_TESTNET_PREVIEW_CREDENTIAL.adaEnterprise.privateKey,
        });

        expect(MOCK_TESTNET_PREVIEW_CREDENTIAL.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward credential", () => {
        const derivedItem = networksDerivations.testnetPreview.adaReward.getCredentialFromPK({
          privateKey: MOCK_TESTNET_PREVIEW_CREDENTIAL.adaReward.privateKey,
        });

        expect(MOCK_TESTNET_PREVIEW_CREDENTIAL.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base credential", () => {
        const derivedItem = networksDerivations.testnetPreview.adaBase.getCredentialFromPK({
          enterprisePrivateKey: MOCK_TESTNET_PREVIEW_CREDENTIAL.adaBase.enterprisePrivateKey,
          rewardPrivateKey: MOCK_TESTNET_PREVIEW_CREDENTIAL.adaBase.rewardPrivateKey,
        });

        expect(MOCK_TESTNET_PREVIEW_CREDENTIAL.adaBase).toEqual(derivedItem);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct enterprise items batch", () => {
        const items = networksDerivations.testnetPreview.adaEnterprise.deriveItemsBatchFromMnemonic(
          {
            derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          },
        );

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_PREVIEW_ITEM.adaEnterprise);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct reward items batch", () => {
        const items = networksDerivations.testnetPreview.adaReward.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.adaReward,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_PREVIEW_ITEM.adaReward);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct base items batch", () => {
        const items = networksDerivations.testnetPreview.adaBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_PREVIEW_ITEM.adaBase);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for enterprise private key", () => {
          const isNative = networksDerivations.testnetPreview.adaEnterprise.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.testnetPreview.adaEnterprise.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_PREVIEW_CREDENTIAL.adaEnterprise.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for reward private key", () => {
          const isNative = networksDerivations.testnetPreview.adaReward.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.testnetPreview.adaReward.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_PREVIEW_CREDENTIAL.adaReward.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative =
            networksDerivations.testnetPreview.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MOCK_TESTNET_PREVIEW_CREDENTIAL.adaBase.enterprisePrivateKey,
            });

          const isRewardKeyNative =
            networksDerivations.testnetPreview.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MOCK_TESTNET_PREVIEW_CREDENTIAL.adaBase.rewardPrivateKey,
            });

          expect(isEnterpriseKeyNative).toBe(true);
          expect(isRewardKeyNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for enterprise private key", () => {
          const isNative = networksDerivations.testnetPreview.adaEnterprise.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.testnetPreview.adaEnterprise.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_PREVIEW_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for reward private key", () => {
          const isNative = networksDerivations.testnetPreview.adaReward.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.testnetPreview.adaReward.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_PREVIEW_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative =
            networksDerivations.testnetPreview.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MOCK_TESTNET_PREVIEW_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
            });

          const isRewardKeyNative =
            networksDerivations.testnetPreview.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MOCK_TESTNET_PREVIEW_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
            });

          expect(isEnterpriseKeyNative).toBe(false);
          expect(isRewardKeyNative).toBe(false);
        });
      });
    });
  });

  describe("testnet preprod", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct enterprise item", () => {
        const derivedItem = networksDerivations.testnetPreprod.adaEnterprise.deriveItemFromMnemonic(
          {
            derivationPath: MOCK_TESTNET_PREPROD_ITEM.adaEnterprise.derivationPath,
          },
        );

        expect(MOCK_TESTNET_PREPROD_ITEM.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward item", () => {
        const derivedItem = networksDerivations.testnetPreprod.adaReward.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_PREPROD_ITEM.adaReward.derivationPath,
        });

        expect(MOCK_TESTNET_PREPROD_ITEM.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base item", () => {
        const derivedItem = networksDerivations.testnetPreprod.adaBase.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_PREPROD_ITEM.adaBase.derivationPath,
        });

        expect(MOCK_TESTNET_PREPROD_ITEM.adaBase).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct enterprise credential", () => {
        const derivedItem = networksDerivations.testnetPreprod.adaEnterprise.getCredentialFromPK({
          privateKey: MOCK_TESTNET_PREPROD_CREDENTIAL.adaEnterprise.privateKey,
        });

        expect(MOCK_TESTNET_PREPROD_CREDENTIAL.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward credential", () => {
        const derivedItem = networksDerivations.testnetPreprod.adaReward.getCredentialFromPK({
          privateKey: MOCK_TESTNET_PREPROD_CREDENTIAL.adaReward.privateKey,
        });

        expect(MOCK_TESTNET_PREPROD_CREDENTIAL.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base credential", () => {
        const derivedItem = networksDerivations.testnetPreprod.adaBase.getCredentialFromPK({
          enterprisePrivateKey: MOCK_TESTNET_PREPROD_CREDENTIAL.adaBase.enterprisePrivateKey,
          rewardPrivateKey: MOCK_TESTNET_PREPROD_CREDENTIAL.adaBase.rewardPrivateKey,
        });

        expect(MOCK_TESTNET_PREPROD_CREDENTIAL.adaBase).toEqual(derivedItem);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct enterprise items batch", () => {
        const items = networksDerivations.testnetPreprod.adaEnterprise.deriveItemsBatchFromMnemonic(
          {
            derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          },
        );

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_PREPROD_ITEM.adaEnterprise);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct reward items batch", () => {
        const items = networksDerivations.testnetPreprod.adaReward.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.adaReward,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_PREPROD_ITEM.adaReward);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct base items batch", () => {
        const items = networksDerivations.testnetPreprod.adaBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_PREPROD_ITEM.adaBase);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for enterprise private key", () => {
          const isNative = networksDerivations.testnetPreprod.adaEnterprise.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.testnetPreprod.adaEnterprise.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_PREPROD_CREDENTIAL.adaEnterprise.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for reward private key", () => {
          const isNative = networksDerivations.testnetPreprod.adaReward.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.testnetPreprod.adaReward.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_PREPROD_CREDENTIAL.adaReward.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative =
            networksDerivations.testnetPreprod.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MOCK_TESTNET_PREPROD_CREDENTIAL.adaBase.enterprisePrivateKey,
            });

          const isRewardKeyNative =
            networksDerivations.testnetPreprod.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MOCK_TESTNET_PREPROD_CREDENTIAL.adaBase.rewardPrivateKey,
            });

          expect(isEnterpriseKeyNative).toBe(true);
          expect(isRewardKeyNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for enterprise private key", () => {
          const isNative = networksDerivations.testnetPreprod.adaEnterprise.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.testnetPreprod.adaEnterprise.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_PREPROD_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for reward private key", () => {
          const isNative = networksDerivations.testnetPreprod.adaReward.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.testnetPreprod.adaReward.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_PREPROD_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative =
            networksDerivations.testnetPreprod.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MOCK_TESTNET_PREPROD_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
            });

          const isRewardKeyNative =
            networksDerivations.testnetPreprod.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MOCK_TESTNET_PREPROD_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
            });

          expect(isEnterpriseKeyNative).toBe(false);
          expect(isRewardKeyNative).toBe(false);
        });
      });
    });
  });
});
