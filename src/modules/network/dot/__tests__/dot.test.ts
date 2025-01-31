import { describe, it, expect, beforeAll } from "vitest";
import { Dot } from "../dot.network.js";
import { getNetwork } from "../../get-network/index.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";
import type { CommonNetworkPurposeUnion, DotNetworkTypeUnion } from "../../libs/types/index.js";
import { dotConfig } from "../../libs/modules/config/index.js";

const MOCK_DERIVATION_PATH = {
  dot: "m/44'/354'/0'/0'/0'",
  ksm: "m/44'/434'/0'/0'/0'",
  aca: "m/44'/787'/0'/0'/0'",
};

const MOCK_DERIVATION_PATH_BATCH_PREFIX = {
  dot: "m/44'/354'/0'/0'",
  ksm: "m/44'/434'/0'/0'",
  aca: "m/44'/787'/0'/0'",
};

const MOCK_COMMON_CREDENTIAL = {
  dot: {
    privateKey: "01f183bbd8d019f7a617d1f53206bc6f80d99b4663ec3c0cad810b638e19f96c",
    publicKey: "61e50053ac0f824b0721f0d71ccf2a53970f6582cde9b2819a0585332b631d67",
  },
  ksm: {
    privateKey: "08e186edfa4dcc3869357938c5b6a5acb94b983f24bee2892324d94cb5dc2542",
    publicKey: "9014af3d5fb8958550530497c50da65e1d937c58a27a60622c5f1be3033eb2d8",
  },
  aca: {
    privateKey: "1eff0c8e4882210ed183fddebd230035fcd53897dd29483bacb0516239aa499e",
    publicKey: "470f9371ec8429d522fcd529499874427b90dbd39e0ecac1ce0dd7ad777a7123",
  },
};

const MOCK_MAINNET_CREDENTIAL = {
  dot: {
    ...MOCK_COMMON_CREDENTIAL.dot,
    address: "13DMfzyHFpfKQHStiukygbMrgGQcW9oAvdFEeJn8PqMTzsi6",
  },
  ksm: {
    ...MOCK_COMMON_CREDENTIAL.ksm,
    address: "FqEZJbdp6352PQVwfLhBzMhdNGpXog9D7RvC9o1kTb2HhmS",
  },
  aca: {
    ...MOCK_COMMON_CREDENTIAL.aca,
    address: "22UmcUhnvZfAdgdPToEYRs1ocYJrHWwYtDpv6rWB3ToBZepU",
  },
};

const MOCK_TESTNET_CREDENTIAL = {
  ...MOCK_COMMON_CREDENTIAL.dot,
  address: "5EH4XfiDQ3PqxkSNmGhyYSXhpeQxorF2r8WkV1nmqkKwpQUF",
};

const MOCK_MAINNET_ITEM = {
  dot: {
    ...MOCK_MAINNET_CREDENTIAL.dot,
    derivationPath: MOCK_DERIVATION_PATH.dot,
  },
  ksm: {
    ...MOCK_MAINNET_CREDENTIAL.ksm,
    derivationPath: MOCK_DERIVATION_PATH.ksm,
  },
  aca: {
    ...MOCK_MAINNET_CREDENTIAL.aca,
    derivationPath: MOCK_DERIVATION_PATH.aca,
  },
};

const MOCK_TESTNET_ITEM = {
  ...MOCK_TESTNET_CREDENTIAL,
  derivationPath: MOCK_DERIVATION_PATH.dot,
};

const MOCK_EXTRINSIC_PRIVATE_KEY = {
  dot: "c71e6bfb514231f3cdb549c032c726c411e6ed98fccced392017900c0b1fb0c5",
  ksm: "bdd4110eb281a5e3d7fcf02bb79279d8dce4898680fe447dcdfb5f23cd9fe83c",
  aca: "d6aafc792fc509cae2f7df0af773cedbea9d907eaa888da290fd369be022c751",
};

type DerivationsUnion = DotNetworkTypeUnion | Extract<CommonNetworkPurposeUnion, "testnet">;

const derivationTypeToSs58Format: Record<DerivationsUnion, number> = {
  dot: 0,
  ksm: 2,
  aca: 10,
  testnet: 42,
};

type NetworkDerivationsInstances = {
  [key in DerivationsUnion]: Dot;
};

let networkDerivationsInstances = {} as NetworkDerivationsInstances;

beforeAll(() => {
  const dotDerivations: DerivationsUnion[] = ["dot", "ksm", "aca", "testnet"] as const;

  networkDerivationsInstances = dotDerivations.reduce<NetworkDerivationsInstances>(
    (networkDerivationsInstances, derivationType) => {
      networkDerivationsInstances[derivationType] = getNetwork({
        network: "dot",
        mnemonic: MNEMONIC,
        derivationConfig: { ss58Format: derivationTypeToSs58Format[derivationType] },
      });

      return networkDerivationsInstances;
    },
    {} as NetworkDerivationsInstances,
  );
});

describe("Dot", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct dot item", () => {
        const derivedItem = networkDerivationsInstances.dot.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.dot.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.dot).toEqual(derivedItem);
      });

      it("Derives correct ksm item", () => {
        const derivedItem = networkDerivationsInstances.ksm.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.ksm.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.ksm).toEqual(derivedItem);
      });

      it("Derives correct aca item", () => {
        const derivedItem = networkDerivationsInstances.aca.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.aca.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.aca).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct dot credential", () => {
        const credential = networkDerivationsInstances.dot.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.dot.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.dot);
      });

      it("Derives correct ksm credential", () => {
        const credential = networkDerivationsInstances.ksm.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.ksm.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.ksm);
      });

      it("Derives correct aca credential", () => {
        const credential = networkDerivationsInstances.aca.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.aca.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.aca);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct dot items batch", () => {
        const items = networkDerivationsInstances.dot.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.dot,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.dot);
      });

      it("Derives correct ksm items batch", () => {
        const items = networkDerivationsInstances.ksm.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.ksm,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.ksm);
      });

      it("Derives correct aca items batch", () => {
        const items = networkDerivationsInstances.aca.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.aca,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.aca);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for dot private key", () => {
          const isNative = networkDerivationsInstances.dot.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dot,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.dot.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for ksm private key", () => {
          const isNative = networkDerivationsInstances.ksm.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.ksm,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.ksm.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for aca private key", () => {
          const isNative = networkDerivationsInstances.aca.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.aca,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.aca.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for dot private key", () => {
          const isNative = networkDerivationsInstances.dot.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dot,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY.dot,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for ksm private key", () => {
          const isNative = networkDerivationsInstances.ksm.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.ksm,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY.ksm,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for aca private key", () => {
          const isNative = networkDerivationsInstances.aca.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.aca,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY.aca,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct dot item", () => {
        const derivedItem = networkDerivationsInstances.testnet.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct dot credential", () => {
        const credential = networkDerivationsInstances.testnet.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct testnet dot items batch", () => {
        const items = networkDerivationsInstances.testnet.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.dot,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for testnet private key", () => {
          const isNative = networkDerivationsInstances.testnet.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dot,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for testnet private key", () => {
          const isNative = networkDerivationsInstances.testnet.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dot,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY.dot,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
