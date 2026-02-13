import { describe, it, expect } from "vitest";

import { type Zec } from "../zec.network.js";
import { getNetwork } from "../../get-network/get-network.js";
import { zecConfig } from "../../libs/modules/config/index.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";
import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../libs/types/index.js";

const DERIVATION_PATH = { mainnet: "m/44'/133'/0'/0/0", testnet: "m/44'/1'/0'/0/0" };

const DERIVATION_PATH_BATCH_PREFIX = { mainnet: "m/44'/133'/0'/0", testnet: "m/44'/1'/0'/0" };

const TESTNET_CREDENTIAL = {
  address: "tmEE6H8Q1THc2XeyCEjshqJEbKsksdYbi3j",
  privateKey: "cQEPGT34NWGzWnW1JE3d5GKaBcEQJqUsDdxH2jXD97CkXaAaXHEn",
  publicKey: "02d76e63231c59c216550ef886d362d58ba96ee30eb56caa99f5cdaf651b9a9a6e",
};

const CREDENTIAL = {
  mainnet: {
    zecTransparent: {
      address: "t1go5yyUMNUakm8HAnMrvM6aDkvaUZTQzQg",
      privateKey: "L4Mijb5oxci7ow72HqDCi3sn2sqZ86tg3uFVskCYqTQ4QZ3i9Hgw",
      publicKey: "0396a610bdb90fbff9759696ec2e3ad6827107d1e64b0aa1d1c62541b88544e24b",
    },
  },
  testnet: { zecTransparent: TESTNET_CREDENTIAL },
  regtest: { zecTransparent: TESTNET_CREDENTIAL },
};

const TESTNET_ITEM = {
  zecTransparent: { ...CREDENTIAL.testnet.zecTransparent, derivationPath: DERIVATION_PATH.testnet },
};

const ITEM = {
  mainnet: {
    zecTransparent: {
      ...CREDENTIAL.mainnet.zecTransparent,
      derivationPath: DERIVATION_PATH.mainnet,
    },
  },
  testnet: TESTNET_ITEM,
  regtest: TESTNET_ITEM,
};

const TESTNET_EXTRINSIC_PRIVATE_KEY = {
  zecTransparent: "cPS2rfjHVcJxNCTnxgoALhzeqCFFHadE4tButfB4L2aoowkMP4m7",
};

const EXTRINSIC_PRIVATE_KEY = {
  mainnet: { zecTransparent: "KxXRpZEhuoBEqKsp8f2UeCU2jm56bsGzUP1gHNbGsGJqqsEa1Vob" },
  testnet: TESTNET_EXTRINSIC_PRIVATE_KEY,
  regtest: TESTNET_EXTRINSIC_PRIVATE_KEY,
};

type NetworkDerivationsInstances = {
  [key in CommonNetworkPurposeRegTestExtendedUnion]: { zecTransparent: Zec };
};

let networkDerivationsInstances = {} as NetworkDerivationsInstances;

beforeAll(() => {
  const networkPurposes = ["mainnet", "testnet", "regtest"] as const;

  networkDerivationsInstances = networkPurposes.reduce<NetworkDerivationsInstances>(
    (networkDerivationsInstances, networkPurpose) => {
      networkDerivationsInstances[networkPurpose] = {
        zecTransparent: getNetwork({
          network: "zec",
          mnemonic: MNEMONIC,
          derivationConfig: {
            networkPurpose,
            derivationType: "zecTransparent",
          },
        }),
      };

      return networkDerivationsInstances;
    },
    {} as NetworkDerivationsInstances,
  );
});

describe("Zec", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct transparent item", async () => {
        const derivedItem =
          await networkDerivationsInstances.mainnet.zecTransparent.deriveItemFromMnemonic({
            derivationPath: ITEM.mainnet.zecTransparent.derivationPath,
          });

        expect(derivedItem).toEqual(ITEM.mainnet.zecTransparent);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct transparent credential", () => {
        const credential = networkDerivationsInstances.mainnet.zecTransparent.getCredentialFromPK({
          privateKey: CREDENTIAL.mainnet.zecTransparent.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.mainnet.zecTransparent);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct transparent items batch", async () => {
        const items =
          await networkDerivationsInstances.mainnet.zecTransparent.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.mainnet,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.mainnet.zecTransparent);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for transparent private key", async () => {
          const isNative =
            await networkDerivationsInstances.mainnet.zecTransparent.doesPKBelongToMnemonic({
              derivationPathPrefix: zecConfig.mainnet.zecTransparent.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: CREDENTIAL.mainnet.zecTransparent.privateKey,
            });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for transparent private key", async () => {
          const isNative =
            await networkDerivationsInstances.mainnet.zecTransparent.doesPKBelongToMnemonic({
              derivationPathPrefix: zecConfig.mainnet.zecTransparent.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: EXTRINSIC_PRIVATE_KEY.mainnet.zecTransparent,
            });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct transparent item", async () => {
        const derivedItem =
          await networkDerivationsInstances.testnet.zecTransparent.deriveItemFromMnemonic({
            derivationPath: ITEM.testnet.zecTransparent.derivationPath,
          });

        expect(derivedItem).toEqual(ITEM.testnet.zecTransparent);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct transparent credential", () => {
        const credential = networkDerivationsInstances.testnet.zecTransparent.getCredentialFromPK({
          privateKey: CREDENTIAL.testnet.zecTransparent.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.testnet.zecTransparent);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct transparent items batch", async () => {
        const items =
          await networkDerivationsInstances.testnet.zecTransparent.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.testnet.zecTransparent);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for transparent private key", async () => {
          const isNative =
            await networkDerivationsInstances.testnet.zecTransparent.doesPKBelongToMnemonic({
              derivationPathPrefix: zecConfig.testnet.zecTransparent.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: CREDENTIAL.testnet.zecTransparent.privateKey,
            });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for transparent private key", async () => {
          const isNative =
            await networkDerivationsInstances.testnet.zecTransparent.doesPKBelongToMnemonic({
              derivationPathPrefix: zecConfig.testnet.zecTransparent.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: EXTRINSIC_PRIVATE_KEY.testnet.zecTransparent,
            });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("regtest", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct transparent item", async () => {
        const derivedItem =
          await networkDerivationsInstances.regtest.zecTransparent.deriveItemFromMnemonic({
            derivationPath: ITEM.regtest.zecTransparent.derivationPath,
          });

        expect(ITEM.regtest.zecTransparent).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct transparent credential", () => {
        const credential = networkDerivationsInstances.regtest.zecTransparent.getCredentialFromPK({
          privateKey: CREDENTIAL.regtest.zecTransparent.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.regtest.zecTransparent);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct transparent items batch", async () => {
        const items =
          await networkDerivationsInstances.regtest.zecTransparent.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.regtest.zecTransparent);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for transparent private key", async () => {
          const isNative =
            await networkDerivationsInstances.regtest.zecTransparent.doesPKBelongToMnemonic({
              derivationPathPrefix: zecConfig.regtest.zecTransparent.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: CREDENTIAL.regtest.zecTransparent.privateKey,
            });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for transparent private key", async () => {
          const isNative =
            await networkDerivationsInstances.regtest.zecTransparent.doesPKBelongToMnemonic({
              derivationPathPrefix: zecConfig.regtest.zecTransparent.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: EXTRINSIC_PRIVATE_KEY.regtest.zecTransparent,
            });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
