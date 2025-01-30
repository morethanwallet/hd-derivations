import { getNetwork } from "../../get-network/index.js";
import { suiConfig } from "../../libs/modules/config/index.js";
import { Sui } from "../sui.network.js";
import { describe, it, expect, beforeAll } from "vitest";
import { FIRST_ITEM_INDEX, INDEX_LOOKUP_FROM, INDEX_LOOKUP_TO } from "../../constants/index.js";
import type { DerivationTypeMap, SignatureSchemeUnion } from "@/libs/types/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_DERIVATION_PATH = {
  ed25519: "m/44'/784'/0'/0'/0'",
  secp2561k: "m/54'/784'/0'/0'/0'",
  secp2561r: "m/74'/784'/0'/0'/0'",
};

const MOCK_DERIVATION_PATH_BATCH_PREFIX = {
  ed25519: "m/44'/784'/0'/0'",
  secp2561k: "m/54'/784'/0'/0'",
  secp2561r: "m/74'/784'/0'/0'",
};

const MOCK_CREDENTIAL = {
  ed25519: {
    privateKey: "suiprivkey1qrnjwp8k2may3yh78pmhczjquszztnm7fwu0q33m0agsh8s5ruvh54mm35h",
    publicKey: "AN7p+sLomkIlceWP1nimMFbJYCdt1Xef2h+syKxBpe6I",
    address: "0x2a495a95e243106634b52382e05a71e942fefbb3042c6b29a5de45c68a803f6f",
  },
  secp2561k: {
    privateKey: "suiprivkey1qxtv0g86gf4g6rjjelcduumrf9hv26prhej0fz9vd29duuqcwc3vwwjldue",
    publicKey: "AQNz6gItxxNVDzpgeCewTl1GK9YcyjNWB7XTYk0AX458qQ==",
    address: "0x86a80a397d36eebf9efeda9283a161f800e531ab7cc550f81af28b1f2f11f0bd",
  },
  secp2561r: {
    privateKey: "suiprivkey1qgz6w0ax4frzlk8jc5dqs0lhtzfwwn6vnhzuespft0jgwyjhrl77y5w744a",
    publicKey: "AgJY++i9Uw0GzfkOTf2foN6Amzv0EyJxiPM2KAbaynprJQ==",
    address: "0x0cbcd132f5e82ccbee3fd7cb2d863fa3aab951244dc31e9b91a6bc9ce53a9ea4",
  },
};

const MOCK_ITEM = {
  ed25519: {
    ...MOCK_CREDENTIAL.ed25519,
    derivationPath: MOCK_DERIVATION_PATH.ed25519,
  },
  secp2561k: {
    ...MOCK_CREDENTIAL.secp2561k,
    derivationPath: MOCK_DERIVATION_PATH.secp2561k,
  },
  secp2561r: {
    ...MOCK_CREDENTIAL.secp2561r,
    derivationPath: MOCK_DERIVATION_PATH.secp2561r,
  },
};

const MOCK_EXTRINSIC_PRIVATE_KEY =
  "suiprivkey1qr50ad60u32gtfknl9pceeep2dcx4lw30g4gdmgwzetwml35kkm25xngzxt";

type TrxDerivationTypeUnion = DerivationTypeMap["suiBase"];

type NetworksDerivations = {
  [key in SignatureSchemeUnion]: { [key in TrxDerivationTypeUnion]: Sui };
};

let networksDerivations = {} as NetworksDerivations;

beforeAll(() => {
  const signatureSchemes: SignatureSchemeUnion[] = ["ed25519", "secp256k1", "secp256r1"] as const;

  networksDerivations = signatureSchemes.reduce<NetworksDerivations>(
    (networksDerivations, signatureScheme) => {
      networksDerivations[signatureScheme] = {
        suiBase: getNetwork({
          network: "sui",
          mnemonic: MNEMONIC,
          derivationConfig: {
            derivationType: "suiBase",
            scheme: signatureScheme,
          },
        }),
      };

      return networksDerivations;
    },
    {} as NetworksDerivations,
  );
});

describe("Sui", () => {
  describe("ed25519", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct item", () => {
        const derivedItem = networksDerivations.ed25519.suiBase.deriveItemFromMnemonic({
          derivationPath: MOCK_ITEM.ed25519.derivationPath,
        });

        expect(MOCK_ITEM.ed25519).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct credential", () => {
        const credential = networksDerivations.ed25519.suiBase.getCredentialFromPK({
          privateKey: MOCK_CREDENTIAL.ed25519.privateKey,
        });

        expect(credential).toEqual(MOCK_CREDENTIAL.ed25519);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct items batch", () => {
        const items = networksDerivations.ed25519.suiBase.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.ed25519,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_ITEM.ed25519);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true", () => {
          const isNative = networksDerivations.ed25519.suiBase.doesPKBelongToMnemonic({
            derivationPathPrefix: suiConfig.suiBase.ed25519.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_CREDENTIAL.ed25519.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false", () => {
          const isNative = networksDerivations.ed25519.suiBase.doesPKBelongToMnemonic({
            derivationPathPrefix: suiConfig.suiBase.ed25519.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_EXTRINSIC_PRIVATE_KEY,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  // describe("secp256k1", () => {
  //   describe("deriveItemFromMnemonic", () => {
  //     it("Derives correct item", () => {
  //       const derivedItem = networksDerivations.secp256k1.suiBase.deriveItemFromMnemonic({
  //         derivationPath: MOCK_ITEM.ed25519.derivationPath,
  //       });

  //       expect(MOCK_ITEM.ed25519).toEqual(derivedItem);
  //     });
  //   });

  //   describe("getCredentialFromPK", () => {
  //     it("Derives correct credential", () => {
  //       const credential = networksDerivations.secp256k1.suiBase.getCredentialFromPK({
  //         privateKey: MOCK_CREDENTIAL.ed25519.privateKey,
  //       });

  //       expect(credential).toEqual(MOCK_CREDENTIAL.ed25519);
  //     });
  //   });

  //   describe("deriveItemsBatchFromMnemonic", () => {
  //     it("Derives correct items batch", () => {
  //       const items = networksDerivations.secp256k1.suiBase.deriveItemsBatchFromMnemonic({
  //         derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.mainnet,
  //         indexLookupFrom: INDEX_LOOKUP_FROM,
  //         indexLookupTo: INDEX_LOOKUP_TO,
  //       });

  //       expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_ITEM.ed25519);
  //     });
  //   });

  //   describe("doesPKBelongToMnemonic", () => {
  //     it("Validates private key correctly", () => {
  //       const isNative = networksDerivations.secp256k1.suiBase.doesPKBelongToMnemonic({
  //         derivationPathPrefix: suiConfig.mainnet.derivationPathPrefix,
  //         indexLookupFrom: INDEX_LOOKUP_FROM,
  //         indexLookupTo: INDEX_LOOKUP_TO,
  //         privateKey: MOCK_CREDENTIAL.ed25519.privateKey,
  //       });

  //       expect(isNative).toBe(true);
  //     });
  //   });
  // });

  // describe("secp256r1", () => {
  //   describe("deriveItemFromMnemonic", () => {
  //     it("Derives correct item", () => {
  //       const derivedItem = networksDerivations.secp256r1.suiBase.deriveItemFromMnemonic({
  //         derivationPath: MOCK_ITEM.ed25519.derivationPath,
  //       });

  //       expect(MOCK_ITEM.ed25519).toEqual(derivedItem);
  //     });
  //   });

  //   describe("getCredentialFromPK", () => {
  //     it("Derives correct credential", () => {
  //       const credential = networksDerivations.secp256r1.suiBase.getCredentialFromPK({
  //         privateKey: MOCK_CREDENTIAL.ed25519.privateKey,
  //       });

  //       expect(credential).toEqual(MOCK_CREDENTIAL.ed25519);
  //     });
  //   });

  //   describe("deriveItemsBatchFromMnemonic", () => {
  //     it("Derives correct items batch", () => {
  //       const items = networksDerivations.secp256r1.suiBase.deriveItemsBatchFromMnemonic({
  //         derivationPathPrefix: MOCK_DERIVATION_PATH_BATCH_PREFIX.mainnet,
  //         indexLookupFrom: INDEX_LOOKUP_FROM,
  //         indexLookupTo: INDEX_LOOKUP_TO,
  //       });

  //       expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_ITEM.ed25519);
  //     });
  //   });

  //   describe("doesPKBelongToMnemonic", () => {
  //     it("Validates private key correctly", () => {
  //       const isNative = networksDerivations.secp256r1.suiBase.doesPKBelongToMnemonic({
  //         derivationPathPrefix: suiConfig.mainnet.derivationPathPrefix,
  //         indexLookupFrom: INDEX_LOOKUP_FROM,
  //         indexLookupTo: INDEX_LOOKUP_TO,
  //         privateKey: MOCK_CREDENTIAL.ed25519.privateKey,
  //       });

  //       expect(isNative).toBe(true);
  //     });
  //   });
  // });
});
