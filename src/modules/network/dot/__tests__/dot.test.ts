import { describe, it, expect } from "vitest";
import { Dot } from "../dot.network.js";
import { getNetwork } from "../../get-network/get-network.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";
import { dotConfig } from "../../libs/modules/config/index.js";
import {
  type DerivationTypeUnionByNetwork,
  type GetDerivationTypeUnion,
} from "@/libs/types/types.js";
import type { Curve } from "@/libs/enums/enums.js";

const DERIVATION_PATH = {
  dotStandardHd: "m/44'/354'/0'/0'/0'",
  dotLedger: "m/44'/354'/0'/0'/0'",
  dotBase: "",
};

const DERIVATION_PATH_PREFIX = {
  dotStandardHd: "m/44'/354'/0'/0'",
  dotLedger: "m/44'/354'/0'/0'",
  dotBase: "",
};

const CREDENTIAL = {
  ed25519: {
    dotLedger: {
      privateKey:
        "3023787b5522a1ab3b3b75f823599f6b9d86e27ae517d5f1e9a7a8e4a2af3f4448c5c0bd7596b66b499582d34db66041cb46dafe77a449eb793c5568c774a005",
      publicKey: "48c5c0bd7596b66b499582d34db66041cb46dafe77a449eb793c5568c774a005",
      address: "12eRCAqFCrKJ27DtssoweWoUHiSgmSMJ15jZtXJ8tSuR9YnQ",
    },
    dotStandardHd: {
      privateKey: "01f183bbd8d019f7a617d1f53206bc6f80d99b4663ec3c0cad810b638e19f96c",
      publicKey: "61e50053ac0f824b0721f0d71ccf2a53970f6582cde9b2819a0585332b631d67",
      address: "13DMfzyHFpfKQHStiukygbMrgGQcW9oAvdFEeJn8PqMTzsi6",
    },
    dotBase: {
      privateKey:
        "4e7c01e402c9f6ae5a991cb4837f3d63796dc1bf288b32bb00b0b6e6b1448958d04b211c47820144a16e92eb1f55a63f800e9d1cae3872becdcd0ca5c23b0ff9",
      publicKey: "d04b211c47820144a16e92eb1f55a63f800e9d1cae3872becdcd0ca5c23b0ff9",
      address: "15i7H8WQHfQgtxb17tev37uJqYm3XCh6x2JfmSdG1bVF4PTy",
    },
  },
  sr25519: {
    dotBase: {
      privateKey:
        "20700c900f1d54b8afd69a8c66c7558d894cd3fcc7fb4f46fc8a935739bf8f5b78e001d19f11ae14adf3d9ad3436f48f791f9097ff5bd6d4bf13ca0668cca500",
      publicKey: "5a3902a599a50d27b3d1dd643eefb8cd429b6b4486ee756ae5b4e4400caa4d6a",
      address: "133JFDxeEusZc5Rz1ZXZt2dQ3EJD6VvghVcVibJcHuXyf8kz",
    },
  },
  secp256k1: {
    dotBase: {
      privateKey: "4e7c01e402c9f6ae5a991cb4837f3d63796dc1bf288b32bb00b0b6e6b1448958",
      publicKey: "0334141fe8b1a5fb497265a80fc7991e8ba0d3c0acfd05da6a89cf341d6f641438",
      address: "13W9ELJoKqjaPZneFLypEWunBuhoXAtiWwKPJqetHkSAgn6X",
    },
  },
};

const ITEM = {
  ed25519: {
    dotLedger: {
      ...CREDENTIAL.ed25519.dotLedger,
      derivationPath: DERIVATION_PATH.dotLedger,
    },
    dotStandardHd: {
      ...CREDENTIAL.ed25519.dotStandardHd,
      derivationPath: DERIVATION_PATH.dotStandardHd,
    },
    dotBase: {
      ...CREDENTIAL.ed25519.dotBase,
      derivationPath: DERIVATION_PATH.dotBase,
    },
  },
  sr25519: {
    dotBase: {
      ...CREDENTIAL.sr25519.dotBase,
      derivationPath: DERIVATION_PATH.dotBase,
    },
  },
  secp256k1: {
    dotBase: {
      ...CREDENTIAL.secp256k1.dotBase,
      derivationPath: DERIVATION_PATH.dotBase,
    },
  },
};

const EXTRINSIC_PRIVATE_KEY = {
  ed25519: {
    dotLedger:
      "68fda9f6b2a4d1e3204e5025744508a1301b7041a49ac8fe92244ba3d8bcdc58f12ca0ab57ee6421999b386675fcc092c22d59112817c45b1938c12bdfd00a58",
    dotStandardHd: "c71e6bfb514231f3cdb549c032c726c411e6ed98fccced392017900c0b1fb0c5",
    dotBase:
      "ee74dc1ff000b6cbc33aab1c4b94712462729ad44de28648a4625747408f96c1fc4ea859b40f2ea312aa79951e4bf2606a572fd819999a3210f2817a8c2ead05",
  },
  sr25519: {
    dotBase:
      "28182aaf4eacc681c741f5e38ba0e96a240814ecca95ed982070816dc264014cebb19684391ca2446fa920f93116a0b718d02aaad13d7c3a14f776cbf7347d6e",
  },
  secp256k1: {
    dotBase: "ee74dc1ff000b6cbc33aab1c4b94712462729ad44de28648a4625747408f96c1",
  },
};

const DOT_SS58_FORMAT = 0;

const DOT_BASE_DEFAULT_DERIVED_ITEMS_LENGTH = 1;

const DOT_BASE_ITEMS_BATCH_LENGTH = INDEX_LOOKUP_TO + DOT_BASE_DEFAULT_DERIVED_ITEMS_LENGTH;

type NetworkDerivationsInstances = {
  ed25519: Record<DerivationTypeUnionByNetwork["dot"], Dot>;
} & Record<Curve["SECP256K1" | "SR25519"], Record<GetDerivationTypeUnion<"dotBase">, Dot>>;

const networkDerivationsInstances: NetworkDerivationsInstances = {
  ed25519: {
    dotBase: getNetwork({
      network: "dot",
      mnemonic: MNEMONIC,
      derivationConfig: {
        derivationType: "dotBase",
        scheme: "ed25519",
        ss58Format: DOT_SS58_FORMAT,
      },
    }),
    dotStandardHd: getNetwork({
      network: "dot",
      mnemonic: MNEMONIC,
      derivationConfig: {
        derivationType: "dotStandardHd",
        scheme: "ed25519",
        ss58Format: DOT_SS58_FORMAT,
      },
    }),
    dotLedger: getNetwork({
      network: "dot",
      mnemonic: MNEMONIC,
      derivationConfig: {
        derivationType: "dotLedger",
        scheme: "ed25519",
        ss58Format: DOT_SS58_FORMAT,
      },
    }),
  },
  secp256k1: {
    dotBase: getNetwork({
      network: "dot",
      mnemonic: MNEMONIC,
      derivationConfig: {
        derivationType: "dotBase",
        scheme: "secp256k1",
        ss58Format: DOT_SS58_FORMAT,
      },
    }),
  },
  sr25519: {
    dotBase: getNetwork({
      network: "dot",
      mnemonic: MNEMONIC,
      derivationConfig: {
        derivationType: "dotBase",
        scheme: "sr25519",
        ss58Format: DOT_SS58_FORMAT,
      },
    }),
  },
};

describe("Dot", () => {
  describe("ed25519", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct standard hd item", () => {
        const derivedItem =
          networkDerivationsInstances.ed25519.dotStandardHd.deriveItemFromMnemonic({
            derivationPath: DERIVATION_PATH.dotStandardHd,
          });

        expect(ITEM.ed25519.dotStandardHd).toEqual(derivedItem);
      });

      it("Derives correct ledger item", () => {
        const derivedItem = networkDerivationsInstances.ed25519.dotLedger.deriveItemFromMnemonic({
          derivationPath: DERIVATION_PATH.dotLedger,
        });

        expect(ITEM.ed25519.dotLedger).toEqual(derivedItem);
      });

      it("Derives correct base item", () => {
        const derivedItem = networkDerivationsInstances.ed25519.dotBase.deriveItemFromMnemonic({
          derivationPath: DERIVATION_PATH.dotBase,
        });

        expect(ITEM.ed25519.dotBase).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct standard hd credential", () => {
        const credential = networkDerivationsInstances.ed25519.dotBase.getCredentialFromPK({
          privateKey: CREDENTIAL.ed25519.dotStandardHd.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.ed25519.dotStandardHd);
      });

      it("Derives correct ledger credential", () => {
        const credential = networkDerivationsInstances.ed25519.dotLedger.getCredentialFromPK({
          privateKey: CREDENTIAL.ed25519.dotLedger.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.ed25519.dotLedger);
      });

      it("Derives correct base credential", () => {
        const credential = networkDerivationsInstances.ed25519.dotBase.getCredentialFromPK({
          privateKey: CREDENTIAL.ed25519.dotBase.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.ed25519.dotBase);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct standard hd items batch", () => {
        const items =
          networkDerivationsInstances.ed25519.dotStandardHd.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_PREFIX.dotStandardHd,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.ed25519.dotStandardHd);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct ledger items batch", () => {
        const items = networkDerivationsInstances.ed25519.dotLedger.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_PREFIX.dotLedger,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.ed25519.dotLedger);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct base items batch", () => {
        const items = networkDerivationsInstances.ed25519.dotBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_PREFIX.dotBase,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.ed25519.dotBase);
        expect(items.length).toBe(DOT_BASE_ITEMS_BATCH_LENGTH);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for standard hd private key", () => {
          const isNative = networkDerivationsInstances.ed25519.dotStandardHd.doesPKBelongToMnemonic(
            {
              derivationPathPrefix: dotConfig.derivationPathPrefix.dotStandardHd,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: CREDENTIAL.ed25519.dotStandardHd.privateKey,
            },
          );

          expect(isNative).toBe(true);
        });

        it("Returns true for ledger private key", () => {
          const isNative = networkDerivationsInstances.ed25519.dotLedger.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dotLedger,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.ed25519.dotLedger.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for base private key", () => {
          const isNative = networkDerivationsInstances.ed25519.dotBase.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dotBase,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.ed25519.dotBase.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for standard hd private key", () => {
          const isNative = networkDerivationsInstances.ed25519.dotStandardHd.doesPKBelongToMnemonic(
            {
              derivationPathPrefix: dotConfig.derivationPathPrefix.dotStandardHd,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: EXTRINSIC_PRIVATE_KEY.ed25519.dotStandardHd,
            },
          );

          expect(isNative).toBe(false);
        });

        it("Returns false for ledger private key", () => {
          const isNative = networkDerivationsInstances.ed25519.dotLedger.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dotLedger,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.ed25519.dotLedger,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for standard hd private key", () => {
          const isNative = networkDerivationsInstances.ed25519.dotBase.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dotBase,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.ed25519.dotBase,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("sr25519", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct base item", () => {
        const derivedItem = networkDerivationsInstances.sr25519.dotBase.deriveItemFromMnemonic({
          derivationPath: DERIVATION_PATH.dotBase,
        });

        expect(ITEM.sr25519.dotBase).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct base credential", () => {
        const credential = networkDerivationsInstances.sr25519.dotBase.getCredentialFromPK({
          privateKey: CREDENTIAL.sr25519.dotBase.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.sr25519.dotBase);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct base items batch", () => {
        const items = networkDerivationsInstances.sr25519.dotBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_PREFIX.dotBase,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.sr25519.dotBase);
        expect(items.length).toBe(DOT_BASE_ITEMS_BATCH_LENGTH);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for base private key", () => {
          const isNative = networkDerivationsInstances.sr25519.dotBase.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dotBase,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.sr25519.dotBase.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for base private key", () => {
          const isNative = networkDerivationsInstances.sr25519.dotBase.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dotBase,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.sr25519.dotBase,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("secp256k1", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct base item", () => {
        const derivedItem = networkDerivationsInstances.secp256k1.dotBase.deriveItemFromMnemonic({
          derivationPath: DERIVATION_PATH.dotBase,
        });

        expect(ITEM.secp256k1.dotBase).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct base credential", () => {
        const credential = networkDerivationsInstances.secp256k1.dotBase.getCredentialFromPK({
          privateKey: CREDENTIAL.secp256k1.dotBase.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.secp256k1.dotBase);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct base items batch", () => {
        const items = networkDerivationsInstances.secp256k1.dotBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_PREFIX.dotBase,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.secp256k1.dotBase);
        expect(items.length).toBe(DOT_BASE_ITEMS_BATCH_LENGTH);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for base private key", () => {
          const isNative = networkDerivationsInstances.secp256k1.dotBase.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dotBase,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.secp256k1.dotBase.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for base private key", () => {
          const isNative = networkDerivationsInstances.secp256k1.dotBase.doesPKBelongToMnemonic({
            derivationPathPrefix: dotConfig.derivationPathPrefix.dotBase,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.secp256k1.dotBase,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
