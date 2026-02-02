import { describe, it, expect } from "vitest";

import { getNetwork } from "../../get-network/get-network.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";

const DERIVATION_PATH = {
  ed25519: "m/44'/637'/0'/0'/0'",
  secp256k1: "m/44'/637'/0'/0/0",
  secp256r1: "m/44'/637'/0'/0/0",
};

const DERIVATION_PATH_PREFIX = {
  ed25519: "m/44'/637'/0'/0'",
  secp256k1: "m/44'/637'/0'/0",
  secp256r1: "m/44'/637'/0'/0",
};

const CREDENTIAL = {
  ed25519: {
    aptLegacy: {
      address: "0x9522aeea06cd60335be1634300be6b44d81e489469deefc11e9a0b3409d94750",
      publicKey: "0x9d80e0c9d0aea61ad9cad4948a144ae2230946d40a9a9a6d2400f57903a9aaec",
      privateKey: "0x3cb9f752129ee6149b3cdc710ea51246e1e4a22dbf4f7aececa4adf653707a8e",
    },
    aptBase: {
      address: "0xfd9d1a65b47150f0ebc0ac4d99044ea7dccf652723e91dca0a0ebde007ce4336",
      publicKey: "0x00209d80e0c9d0aea61ad9cad4948a144ae2230946d40a9a9a6d2400f57903a9aaec",
      privateKey: "0x3cb9f752129ee6149b3cdc710ea51246e1e4a22dbf4f7aececa4adf653707a8e",
    },
    multiSig: {
      address: "0x808ba96c89ae118b49729b9f5f7262c361c9d79f540b359248bd3e5cc1d680fc",
      publicKey: "0x0100209d80e0c9d0aea61ad9cad4948a144ae2230946d40a9a9a6d2400f57903a9aaec01",
      privateKey: "0x3cb9f752129ee6149b3cdc710ea51246e1e4a22dbf4f7aececa4adf653707a8e",
    },
  },
  secp256k1: {
    // aptBase and aptLegacy have the same output
    address: "0xafb25fd59e168974fd7c56df13b4237734ae2090983ea7c648d86df637e0ded0",
    publicKey:
      "0x014104e06e68eb0e50b63d1bd8f4d427aa539040c8eacbd517265b79f8946c50076a65c4863416facc215198ee173e6747a7de001fe126caa0c3db9ae6fb18f1140c7f",
    privateKey: "0xb275b8966de552351e14a7a3d9b0ceb422ed30ca20dd58a824f6d3de069f0daa",
  },
  secp256r1: {
    // aptBase and aptLegacy have the same output
    address: "0x658f7a592a6fc54a948c7caf9196761d16ca84a5ab1e770a2940c75dd7ddc11c",
    publicKey: "0x024f0ebaaf2c68a8003e506dfaf9b2a5bb212d4b37baa83ef4d7b9ea4585974169",
    privateKey: "0xb275b8966de552351e14a7a3d9b0ceb422ed30ca20dd58a824f6d3de069f0daa",
  },
};

const ITEM = {
  ed25519: {
    aptLegacy: {
      ...CREDENTIAL.ed25519.aptLegacy,
      derivationPath: DERIVATION_PATH.ed25519,
    },
    aptBase: { ...CREDENTIAL.ed25519.aptBase, derivationPath: DERIVATION_PATH.ed25519 },
    multiSig: { ...CREDENTIAL.ed25519.multiSig, derivationPath: DERIVATION_PATH.ed25519 },
  },
  secp256k1: {
    ...CREDENTIAL.secp256k1,
    derivationPath: DERIVATION_PATH.secp256k1,
  },
  secp256r1: {
    ...CREDENTIAL.secp256r1,
    derivationPath: DERIVATION_PATH.secp256r1,
  },
  multiSig: {
    ...CREDENTIAL.secp256r1,
    derivationPath: DERIVATION_PATH.secp256r1,
  },
};

const EXTRINSIC_PRIVATE_KEY = {
  ed25519: {
    aptLegacy: "0xc2bf7dbb9807e56050d47e4dd1b085bde00e79637487ea20a4d3f575e1550ed3",
    aptBase: "0xc2bf7dbb9807e56050d47e4dd1b085bde00e79637487ea20a4d3f575e1550ed3",
    multiSig: "0xc2bf7dbb9807e56050d47e4dd1b085bde00e79637487ea20a4d3f575e1550ed3",
  },
  secp256k1: "0xf3d4fac4d4c3a27eeef8d65cbf7bb23723f36d1bb7897c98d0875e6d48ee5bf4",
  secp256r1: "0xf3d4fac4d4c3a27eeef8d65cbf7bb23723f36d1bb7897c98d0875e6d48ee5bf4",
};

const networkDerivationsInstances = {
  ed25519: {
    aptLegacy: getNetwork({
      network: "apt",
      mnemonic: MNEMONIC,
      derivationConfig: { derivationType: "aptLegacy", scheme: "ed25519" },
    }),
    aptBase: getNetwork({
      network: "apt",
      mnemonic: MNEMONIC,
      derivationConfig: { derivationType: "aptBase", scheme: "ed25519" },
    }),
    multiSig: getNetwork({
      network: "apt",
      mnemonic: MNEMONIC,
      derivationConfig: {
        derivationType: "aptBase",
        scheme: "ed25519",
        authenticationScheme: "multiSig",
      },
    }),
  },
  secp256k1: getNetwork({
    network: "apt",
    mnemonic: MNEMONIC,
    derivationConfig: {
      derivationType: "aptBase",
      scheme: "secp256k1",
    },
  }),
  secp256r1: getNetwork({
    network: "apt",
    mnemonic: MNEMONIC,
    derivationConfig: {
      derivationType: "aptBase",
      scheme: "secp256r1",
    },
  }),
};

describe("Apt", () => {
  describe("ed25519", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networkDerivationsInstances.ed25519.aptLegacy.deriveItemFromMnemonic({
          derivationPath: DERIVATION_PATH.ed25519,
        });

        expect(ITEM.ed25519.aptLegacy).toEqual(derivedItem);
      });

      it("Derives correct base item", () => {
        const derivedItem = networkDerivationsInstances.ed25519.aptBase.deriveItemFromMnemonic({
          derivationPath: DERIVATION_PATH.ed25519,
        });

        expect(ITEM.ed25519.aptBase).toEqual(derivedItem);
      });

      it("Derives correct multisig item", () => {
        const derivedItem = networkDerivationsInstances.ed25519.multiSig.deriveItemFromMnemonic({
          derivationPath: DERIVATION_PATH.ed25519,
        });

        expect(ITEM.ed25519.multiSig).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networkDerivationsInstances.ed25519.aptLegacy.getCredentialFromPK({
          privateKey: CREDENTIAL.ed25519.aptLegacy.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.ed25519.aptLegacy);
      });

      it("Derives correct base credential", () => {
        const credential = networkDerivationsInstances.ed25519.aptBase.getCredentialFromPK({
          privateKey: CREDENTIAL.ed25519.aptBase.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.ed25519.aptBase);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networkDerivationsInstances.ed25519.aptLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_PREFIX.ed25519,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.ed25519.aptLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct base items batch", () => {
        const items = networkDerivationsInstances.ed25519.aptBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_PREFIX.ed25519,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.ed25519.aptBase);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct multi sig items batch", () => {
        const items = networkDerivationsInstances.ed25519.multiSig.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_PREFIX.ed25519,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.ed25519.multiSig);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for apt legacy derivation", () => {
          const isNative = networkDerivationsInstances.ed25519.aptLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: DERIVATION_PATH_PREFIX.ed25519,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.ed25519.aptLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for apt base derivation", () => {
          const isNative = networkDerivationsInstances.ed25519.aptBase.doesPKBelongToMnemonic({
            derivationPathPrefix: DERIVATION_PATH_PREFIX.ed25519,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.ed25519.aptBase.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for apt multi sig derivation", () => {
          const isNative = networkDerivationsInstances.ed25519.multiSig.doesPKBelongToMnemonic({
            derivationPathPrefix: DERIVATION_PATH_PREFIX.ed25519,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.ed25519.multiSig.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for apt legacy derivation", () => {
          const isNative = networkDerivationsInstances.ed25519.aptLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: DERIVATION_PATH_PREFIX.ed25519,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.ed25519.aptLegacy,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for apt base derivation", () => {
          const isNative = networkDerivationsInstances.ed25519.aptBase.doesPKBelongToMnemonic({
            derivationPathPrefix: DERIVATION_PATH_PREFIX.ed25519,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.ed25519.aptBase,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for apt multi sig derivation", () => {
          const isNative = networkDerivationsInstances.ed25519.multiSig.doesPKBelongToMnemonic({
            derivationPathPrefix: DERIVATION_PATH_PREFIX.ed25519,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.ed25519.multiSig,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("secp256k1", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct item", () => {
        const derivedItem = networkDerivationsInstances.secp256k1.deriveItemFromMnemonic({
          derivationPath: DERIVATION_PATH.secp256k1,
        });

        expect(ITEM.secp256k1).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct credential", () => {
        const credential = networkDerivationsInstances.secp256k1.getCredentialFromPK({
          privateKey: CREDENTIAL.secp256k1.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.secp256k1);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct items batch", () => {
        const items = networkDerivationsInstances.secp256k1.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_PREFIX.secp256k1,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.secp256k1);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true", () => {
          const isNative = networkDerivationsInstances.secp256k1.doesPKBelongToMnemonic({
            derivationPathPrefix: DERIVATION_PATH_PREFIX.secp256k1,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.secp256k1.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false", () => {
          const isNative = networkDerivationsInstances.secp256k1.doesPKBelongToMnemonic({
            derivationPathPrefix: DERIVATION_PATH_PREFIX.secp256k1,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.secp256k1,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("secp256r1", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct item", () => {
        const derivedItem = networkDerivationsInstances.secp256r1.deriveItemFromMnemonic({
          derivationPath: DERIVATION_PATH.secp256r1,
        });

        expect(ITEM.secp256r1).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct credential", () => {
        const credential = networkDerivationsInstances.secp256r1.getCredentialFromPK({
          privateKey: CREDENTIAL.secp256r1.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.secp256r1);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct items batch", () => {
        const items = networkDerivationsInstances.secp256r1.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_PREFIX.secp256r1,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.secp256r1);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true", () => {
          const isNative = networkDerivationsInstances.secp256r1.doesPKBelongToMnemonic({
            derivationPathPrefix: DERIVATION_PATH_PREFIX.secp256r1,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.secp256r1.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false", () => {
          const isNative = networkDerivationsInstances.secp256r1.doesPKBelongToMnemonic({
            derivationPathPrefix: DERIVATION_PATH_PREFIX.secp256r1,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.secp256r1,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
