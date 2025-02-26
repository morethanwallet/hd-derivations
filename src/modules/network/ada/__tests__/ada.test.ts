import { describe, it, expect, beforeAll } from "vitest";
import { getNetwork } from "../../get-network/index.js";
import type { AdaNetworkPurposeUnion } from "../../libs/types/index.js";
import type { AdaDerivationTypeUnion } from "@/libs/types/index.js";
import { Ada } from "../ada.network.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";
import { adaConfig } from "../../libs/modules/config/index.js";

const DERIVATION_PATH = {
  adaEnterprise: "m/1852'/1815'/0'/0/0",
  adaReward: "m/1852'/1815'/0'/2/0",
};

const DERIVATION_PATH_BATCH_PREFIX = {
  adaEnterprise: "m/1852'/1815'/0'/0",
  adaReward: "m/1852'/1815'/0'/2",
};

const MAINNET_EXTRINSIC_PRIVATE_KEY = {
  adaEnterprise: {
    privateKey:
      "68041711595dad2371187607fe556c60a01b5f6760616166e1ce5e67c63a7f5d8c2406acd619dbf059945271cf5d61c1d729e6757eac5b6ed7466f843e04fba2",
  },
  adaReward: {
    privateKey:
      "f8d0f492f823729b5e1a38b8191cb8271d9342924a9064c5aea9c37bc43a7f5daf772f592a11762827d4dae995f088a65984659dc953a2e162f5222595c8bd1d",
  },
};

const COMMON_MAINNET_CREDENTIAL = {
  adaEnterprise: {
    privateKey:
      "787b42151ab18f281a977f1004996a245046756c1961d43f067290983d4f1244017a63d7848a8f409efb7a1a5e104eff76ed943551b8afbea5e9fd4c7291c998",
    publicKey: "30e5928414c7c1da4e664c4c0546d22aa3551fedfebf2faed61a05be20403b79",
    address: "addr1vyygp308craka57n2yhsru0n3r6yxu8fyleh4jmq2qrc6hsksfj9u",
  },
  adaReward: {
    privateKey:
      "d0c8e6c886b1420526a4d3acf79eb9cd4c83dc931bc72f06fe07c4da364f124448c5e25c8acdd5bfa7f88dbbc83f10c09849671bbe2fa2749c42f68bed9dec18",
    publicKey: "ea60f453c2c9a1bebf3fea99f79786921894150b73aae4fcb6104918a4dfa0ba",
    address: "stake1uxgww2q7fxf3maz5fwdgma9pef0jwyt25jd4daz092rdteqpx4rss",
  },
};

const MAINNET_CREDENTIAL = {
  adaEnterprise: COMMON_MAINNET_CREDENTIAL.adaEnterprise,
  adaReward: COMMON_MAINNET_CREDENTIAL.adaReward,
  adaBase: {
    enterprisePrivateKey: COMMON_MAINNET_CREDENTIAL.adaEnterprise.privateKey,
    enterprisePublicKey: COMMON_MAINNET_CREDENTIAL.adaEnterprise.publicKey,
    rewardPrivateKey: COMMON_MAINNET_CREDENTIAL.adaReward.privateKey,
    rewardPublicKey: COMMON_MAINNET_CREDENTIAL.adaReward.publicKey,
    address:
      "addr1qyygp308craka57n2yhsru0n3r6yxu8fyleh4jmq2qrc6h5suu5pujvnrh69gju63h62rjjlyugk4fym2m6y725x6hjq0gkvw0",
  },
};

const MAINNET_ITEM = {
  adaEnterprise: {
    ...MAINNET_CREDENTIAL.adaEnterprise,
    derivationPath: DERIVATION_PATH.adaEnterprise,
  },
  adaReward: {
    ...MAINNET_CREDENTIAL.adaReward,
    derivationPath: DERIVATION_PATH.adaReward,
  },
  adaBase: {
    ...MAINNET_CREDENTIAL.adaBase,
    enterpriseDerivationPath: DERIVATION_PATH.adaEnterprise,
    rewardDerivationPath: DERIVATION_PATH.adaReward,
  },
};

const TESTNET_PREVIEW_EXTRINSIC_PRIVATE_KEY = { ...MAINNET_EXTRINSIC_PRIVATE_KEY };

const COMMON_TESTNET_PREVIEW_CREDENTIAL = {
  adaEnterprise: {
    ...COMMON_MAINNET_CREDENTIAL.adaEnterprise,
    address: "addr_test1vqygp308craka57n2yhsru0n3r6yxu8fyleh4jmq2qrc6hsdcaw2e",
  },
  adaReward: {
    ...COMMON_MAINNET_CREDENTIAL.adaReward,
    address: "stake_test1uzgww2q7fxf3maz5fwdgma9pef0jwyt25jd4daz092rdteqxvlp5d",
  },
};

const TESTNET_PREVIEW_CREDENTIAL = {
  adaEnterprise: COMMON_TESTNET_PREVIEW_CREDENTIAL.adaEnterprise,
  adaReward: COMMON_TESTNET_PREVIEW_CREDENTIAL.adaReward,
  adaBase: {
    enterprisePrivateKey: COMMON_TESTNET_PREVIEW_CREDENTIAL.adaEnterprise.privateKey,
    enterprisePublicKey: COMMON_TESTNET_PREVIEW_CREDENTIAL.adaEnterprise.publicKey,
    rewardPrivateKey: COMMON_TESTNET_PREVIEW_CREDENTIAL.adaReward.privateKey,
    rewardPublicKey: COMMON_TESTNET_PREVIEW_CREDENTIAL.adaReward.publicKey,
    address:
      "addr_test1qqygp308craka57n2yhsru0n3r6yxu8fyleh4jmq2qrc6h5suu5pujvnrh69gju63h62rjjlyugk4fym2m6y725x6hjqv7tvzs",
  },
};

const TESTNET_PREVIEW_ITEM = {
  adaEnterprise: {
    ...TESTNET_PREVIEW_CREDENTIAL.adaEnterprise,
    derivationPath: DERIVATION_PATH.adaEnterprise,
  },
  adaReward: {
    ...TESTNET_PREVIEW_CREDENTIAL.adaReward,
    derivationPath: DERIVATION_PATH.adaReward,
  },
  adaBase: {
    ...TESTNET_PREVIEW_CREDENTIAL.adaBase,
    enterpriseDerivationPath: DERIVATION_PATH.adaEnterprise,
    rewardDerivationPath: DERIVATION_PATH.adaReward,
  },
};

const TESTNET_PREPROD_EXTRINSIC_PRIVATE_KEY = { ...MAINNET_EXTRINSIC_PRIVATE_KEY };

const TESTNET_PREPROD_CREDENTIAL = { ...TESTNET_PREVIEW_CREDENTIAL };

const TESTNET_PREPROD_ITEM = { ...TESTNET_PREVIEW_ITEM };

type NetworkDerivationsInstances = {
  [key in AdaNetworkPurposeUnion]: {
    [key in AdaDerivationTypeUnion]: Ada;
  };
};

let networkDerivationsInstances = {} as NetworkDerivationsInstances;

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

  networkDerivationsInstances = networkPurposes.reduce<NetworkDerivationsInstances>(
    (networkDerivationsInstances, networkPurpose) => {
      networkDerivationsInstances[networkPurpose] = derivationTypes.reduce<
        NetworkDerivationsInstances[AdaNetworkPurposeUnion]
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
        {} as NetworkDerivationsInstances[AdaNetworkPurposeUnion],
      );

      return networkDerivationsInstances;
    },
    {} as NetworkDerivationsInstances,
  );
});

describe("Ada", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct enterprise item", () => {
        const derivedItem =
          networkDerivationsInstances.mainnet.adaEnterprise.deriveItemFromMnemonic({
            derivationPath: DERIVATION_PATH.adaEnterprise,
          });

        expect(MAINNET_ITEM.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.adaReward.deriveItemFromMnemonic({
          derivationPath: DERIVATION_PATH.adaReward,
        });

        expect(MAINNET_ITEM.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.adaBase.deriveItemFromMnemonic({
          enterpriseDerivationPath: DERIVATION_PATH.adaEnterprise,
          rewardDerivationPath: DERIVATION_PATH.adaReward,
        });

        expect(MAINNET_ITEM.adaBase).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct enterprise credential", () => {
        const derivedItem = networkDerivationsInstances.mainnet.adaEnterprise.getCredentialFromPK({
          privateKey: MAINNET_CREDENTIAL.adaEnterprise.privateKey,
        });

        expect(MAINNET_CREDENTIAL.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward credential", () => {
        const derivedItem = networkDerivationsInstances.mainnet.adaReward.getCredentialFromPK({
          privateKey: MAINNET_CREDENTIAL.adaReward.privateKey,
        });

        expect(MAINNET_CREDENTIAL.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base credential", () => {
        const derivedItem = networkDerivationsInstances.mainnet.adaBase.getCredentialFromPK({
          enterprisePrivateKey: MAINNET_CREDENTIAL.adaBase.enterprisePrivateKey,
          rewardPrivateKey: MAINNET_CREDENTIAL.adaBase.rewardPrivateKey,
        });

        expect(derivedItem).toEqual(MAINNET_CREDENTIAL.adaBase);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct enterprise items batch", () => {
        const items =
          networkDerivationsInstances.mainnet.adaEnterprise.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MAINNET_ITEM.adaEnterprise);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct reward items batch", () => {
        const items = networkDerivationsInstances.mainnet.adaReward.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaReward,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MAINNET_ITEM.adaReward);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct base items batch", () => {
        const items = networkDerivationsInstances.mainnet.adaBase.deriveItemsBatchFromMnemonic({
          enterpriseDerivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
          rewardDerivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaReward,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MAINNET_ITEM.adaBase);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for enterprise private key", () => {
          const isNative = networkDerivationsInstances.mainnet.adaEnterprise.doesPKBelongToMnemonic(
            {
              derivationPathPrefix: adaConfig.mainnet.adaEnterprise.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MAINNET_CREDENTIAL.adaEnterprise.privateKey,
            },
          );

          expect(isNative).toBe(true);
        });

        it("Returns true for reward private key", () => {
          const isNative = networkDerivationsInstances.mainnet.adaReward.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.mainnet.adaReward.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MAINNET_CREDENTIAL.adaReward.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative =
            networkDerivationsInstances.mainnet.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.mainnet.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MAINNET_CREDENTIAL.adaBase.enterprisePrivateKey,
            });

          const isRewardKeyNative =
            networkDerivationsInstances.mainnet.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.mainnet.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MAINNET_CREDENTIAL.adaBase.rewardPrivateKey,
            });

          expect(isEnterpriseKeyNative).toBe(true);
          expect(isRewardKeyNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for enterprise private key", () => {
          const isNative = networkDerivationsInstances.mainnet.adaEnterprise.doesPKBelongToMnemonic(
            {
              derivationPathPrefix: adaConfig.mainnet.adaEnterprise.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MAINNET_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
            },
          );

          expect(isNative).toBe(false);
        });

        it("Returns true for reward private key", () => {
          const isNative = networkDerivationsInstances.mainnet.adaReward.doesPKBelongToMnemonic({
            derivationPathPrefix: adaConfig.mainnet.adaReward.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MAINNET_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative =
            networkDerivationsInstances.mainnet.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.mainnet.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MAINNET_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
            });

          const isRewardKeyNative =
            networkDerivationsInstances.mainnet.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.mainnet.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MAINNET_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
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
        const derivedItem =
          networkDerivationsInstances.testnetPreview.adaEnterprise.deriveItemFromMnemonic({
            derivationPath: DERIVATION_PATH.adaEnterprise,
          });

        expect(TESTNET_PREVIEW_ITEM.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward item", () => {
        const derivedItem =
          networkDerivationsInstances.testnetPreview.adaReward.deriveItemFromMnemonic({
            derivationPath: DERIVATION_PATH.adaReward,
          });

        expect(TESTNET_PREVIEW_ITEM.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base item", () => {
        const derivedItem =
          networkDerivationsInstances.testnetPreview.adaBase.deriveItemFromMnemonic({
            enterpriseDerivationPath: DERIVATION_PATH.adaEnterprise,
            rewardDerivationPath: DERIVATION_PATH.adaReward,
          });

        expect(TESTNET_PREVIEW_ITEM.adaBase).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct enterprise credential", () => {
        const derivedItem =
          networkDerivationsInstances.testnetPreview.adaEnterprise.getCredentialFromPK({
            privateKey: TESTNET_PREVIEW_CREDENTIAL.adaEnterprise.privateKey,
          });

        expect(TESTNET_PREVIEW_CREDENTIAL.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward credential", () => {
        const derivedItem =
          networkDerivationsInstances.testnetPreview.adaReward.getCredentialFromPK({
            privateKey: TESTNET_PREVIEW_CREDENTIAL.adaReward.privateKey,
          });

        expect(TESTNET_PREVIEW_CREDENTIAL.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base credential", () => {
        const derivedItem = networkDerivationsInstances.testnetPreview.adaBase.getCredentialFromPK({
          enterprisePrivateKey: TESTNET_PREVIEW_CREDENTIAL.adaBase.enterprisePrivateKey,
          rewardPrivateKey: TESTNET_PREVIEW_CREDENTIAL.adaBase.rewardPrivateKey,
        });

        expect(TESTNET_PREVIEW_CREDENTIAL.adaBase).toEqual(derivedItem);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct enterprise items batch", () => {
        const items =
          networkDerivationsInstances.testnetPreview.adaEnterprise.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_PREVIEW_ITEM.adaEnterprise);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct reward items batch", () => {
        const items =
          networkDerivationsInstances.testnetPreview.adaReward.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaReward,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_PREVIEW_ITEM.adaReward);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct base items batch", () => {
        const items =
          networkDerivationsInstances.testnetPreview.adaBase.deriveItemsBatchFromMnemonic({
            enterpriseDerivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
            rewardDerivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaReward,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_PREVIEW_ITEM.adaBase);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for enterprise private key", () => {
          const isNative =
            networkDerivationsInstances.testnetPreview.adaEnterprise.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaEnterprise.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREVIEW_CREDENTIAL.adaEnterprise.privateKey,
            });

          expect(isNative).toBe(true);
        });

        it("Returns true for reward private key", () => {
          const isNative =
            networkDerivationsInstances.testnetPreview.adaReward.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaReward.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREVIEW_CREDENTIAL.adaReward.privateKey,
            });

          expect(isNative).toBe(true);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative =
            networkDerivationsInstances.testnetPreview.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREVIEW_CREDENTIAL.adaBase.enterprisePrivateKey,
            });

          const isRewardKeyNative =
            networkDerivationsInstances.testnetPreview.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREVIEW_CREDENTIAL.adaBase.rewardPrivateKey,
            });

          expect(isEnterpriseKeyNative).toBe(true);
          expect(isRewardKeyNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for enterprise private key", () => {
          const isNative =
            networkDerivationsInstances.testnetPreview.adaEnterprise.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaEnterprise.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREVIEW_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
            });

          expect(isNative).toBe(false);
        });

        it("Returns true for reward private key", () => {
          const isNative =
            networkDerivationsInstances.testnetPreview.adaReward.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaReward.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREVIEW_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
            });

          expect(isNative).toBe(false);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative =
            networkDerivationsInstances.testnetPreview.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREVIEW_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
            });

          const isRewardKeyNative =
            networkDerivationsInstances.testnetPreview.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreview.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREVIEW_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
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
        const derivedItem =
          networkDerivationsInstances.testnetPreprod.adaEnterprise.deriveItemFromMnemonic({
            derivationPath: DERIVATION_PATH.adaEnterprise,
          });

        expect(TESTNET_PREPROD_ITEM.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward item", () => {
        const derivedItem =
          networkDerivationsInstances.testnetPreprod.adaReward.deriveItemFromMnemonic({
            derivationPath: DERIVATION_PATH.adaReward,
          });

        expect(TESTNET_PREPROD_ITEM.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base item", () => {
        const derivedItem =
          networkDerivationsInstances.testnetPreprod.adaBase.deriveItemFromMnemonic({
            enterpriseDerivationPath: DERIVATION_PATH.adaEnterprise,
            rewardDerivationPath: DERIVATION_PATH.adaReward,
          });

        expect(TESTNET_PREPROD_ITEM.adaBase).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct enterprise credential", () => {
        const derivedItem =
          networkDerivationsInstances.testnetPreprod.adaEnterprise.getCredentialFromPK({
            privateKey: TESTNET_PREPROD_CREDENTIAL.adaEnterprise.privateKey,
          });

        expect(TESTNET_PREPROD_CREDENTIAL.adaEnterprise).toEqual(derivedItem);
      });

      it("Derives correct reward credential", () => {
        const derivedItem =
          networkDerivationsInstances.testnetPreprod.adaReward.getCredentialFromPK({
            privateKey: TESTNET_PREPROD_CREDENTIAL.adaReward.privateKey,
          });

        expect(TESTNET_PREPROD_CREDENTIAL.adaReward).toEqual(derivedItem);
      });

      it("Derives correct base credential", () => {
        const derivedItem = networkDerivationsInstances.testnetPreprod.adaBase.getCredentialFromPK({
          enterprisePrivateKey: TESTNET_PREPROD_CREDENTIAL.adaBase.enterprisePrivateKey,
          rewardPrivateKey: TESTNET_PREPROD_CREDENTIAL.adaBase.rewardPrivateKey,
        });

        expect(TESTNET_PREPROD_CREDENTIAL.adaBase).toEqual(derivedItem);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct enterprise items batch", () => {
        const items =
          networkDerivationsInstances.testnetPreprod.adaEnterprise.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_PREPROD_ITEM.adaEnterprise);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct reward items batch", () => {
        const items =
          networkDerivationsInstances.testnetPreprod.adaReward.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaReward,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_PREPROD_ITEM.adaReward);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct base items batch", () => {
        const items =
          networkDerivationsInstances.testnetPreprod.adaBase.deriveItemsBatchFromMnemonic({
            enterpriseDerivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaEnterprise,
            rewardDerivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.adaReward,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_PREPROD_ITEM.adaBase);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for enterprise private key", () => {
          const isNative =
            networkDerivationsInstances.testnetPreprod.adaEnterprise.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaEnterprise.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREPROD_CREDENTIAL.adaEnterprise.privateKey,
            });

          expect(isNative).toBe(true);
        });

        it("Returns true for reward private key", () => {
          const isNative =
            networkDerivationsInstances.testnetPreprod.adaReward.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaReward.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREPROD_CREDENTIAL.adaReward.privateKey,
            });

          expect(isNative).toBe(true);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative =
            networkDerivationsInstances.testnetPreprod.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREPROD_CREDENTIAL.adaBase.enterprisePrivateKey,
            });

          const isRewardKeyNative =
            networkDerivationsInstances.testnetPreprod.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREPROD_CREDENTIAL.adaBase.rewardPrivateKey,
            });

          expect(isEnterpriseKeyNative).toBe(true);
          expect(isRewardKeyNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for enterprise private key", () => {
          const isNative =
            networkDerivationsInstances.testnetPreprod.adaEnterprise.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaEnterprise.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREPROD_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
            });

          expect(isNative).toBe(false);
        });

        it("Returns true for reward private key", () => {
          const isNative =
            networkDerivationsInstances.testnetPreprod.adaReward.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaReward.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREPROD_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
            });

          expect(isNative).toBe(false);
        });

        it("Returns true for base private key", () => {
          const isEnterpriseKeyNative =
            networkDerivationsInstances.testnetPreprod.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREPROD_EXTRINSIC_PRIVATE_KEY.adaEnterprise.privateKey,
            });

          const isRewardKeyNative =
            networkDerivationsInstances.testnetPreprod.adaBase.doesPKBelongToMnemonic({
              derivationPathPrefix: adaConfig.testnetPreprod.adaBase.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_PREPROD_EXTRINSIC_PRIVATE_KEY.adaReward.privateKey,
            });

          expect(isEnterpriseKeyNative).toBe(false);
          expect(isRewardKeyNative).toBe(false);
        });
      });
    });
  });
});
