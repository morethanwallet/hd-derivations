import { describe, it, expect } from "vitest";

import { getNetwork } from "../../get-network/get-network.js";
import { ltcConfig } from "../../libs/modules/config/index.js";
import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../libs/types/index.js";
import { type Ltc } from "../ltc.network.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";

import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";

const DERIVATION_PATH = {
  mainnet: {
    ltcLegacy: "m/44'/2'/0'/0/0",
    ltcSegWit: "m/49'/2'/0'/0/0",
    ltcNativeSegWit: "m/84'/2'/0'/0/0",
  },
  testnet: {
    ltcLegacy: "m/44'/1'/0'/0/0",
    ltcSegWit: "m/49'/1'/0'/0/0",
    ltcNativeSegWit: "m/84'/1'/0'/0/0",
  },
};

const DERIVATION_PATH_BATCH_PREFIX = {
  mainnet: {
    ltcLegacy: "m/44'/2'/0'/0",
    ltcSegWit: "m/49'/2'/0'/0",
    ltcNativeSegWit: "m/84'/2'/0'/0",
  },
  testnet: {
    ltcLegacy: "m/44'/1'/0'/0",
    ltcSegWit: "m/49'/1'/0'/0",
    ltcNativeSegWit: "m/84'/1'/0'/0",
  },
};

const TESTNET_CREDENTIAL = {
  ltcLegacy: {
    privateKey: "cQEPGT34NWGzWnW1JE3d5GKaBcEQJqUsDdxH2jXD97CkXaAaXHEn",
    publicKey: "02d76e63231c59c216550ef886d362d58ba96ee30eb56caa99f5cdaf651b9a9a6e",
    address: "mk2hF1aSuKkBZtCUM9jDfjgFLE5gGJ8U8c",
  },
  ltcSegWit: {
    privateKey: "cQjBQLBCeuyn1FeJE72M93vQJgMjoMXH9CkgidtjqjBsiLRjJKLK",
    publicKey: "0338848902420d91c7789bd62edb88814ce27ecd48f5ac9dd1d0f08682864c6755",
    address: "QhDdjXakU2y3cxArfyvxmHLnFmnMojYg12",
  },
  ltcNativeSegWit: {
    privateKey: "cU7MwjFKfWjDPkaKhEJmsbG6DwPjSZs6WLY4BYXiSzeGRnd232i3",
    publicKey: "03d5f0a7cc993f8a296111637c6dd2d80ab917ebeedcb6ed30a600cef49a4d63a1",
    address: "tltc1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlhcwzeh",
  },
};

const CREDENTIAL = {
  mainnet: {
    ltcLegacy: {
      privateKey: "TAEttdYKdrfSXnNhQwMmXKi8Rqi63BULLQ64AGywSNSWngxhMLQp",
      publicKey: "038c540896f6a4a25636a1264097396389edcc37a4f7e16df43e6effaa76aeac95",
      address: "LNxCC9ynAWiHFW56q6ZithsnvzrU1zENPp",
    },
    ltcSegWit: {
      privateKey: "T95W9R4Kk28UrATT255uaD5acdWWJhrLiipra87p6Jf99n64Yn1k",
      publicKey: "0350860f13fd0c20045215ab436e61b3f99f00c4941c0eea333c168804e65e2b1e",
      address: "MPE1XWk6gty2PA3915RB4MHTYQwyWJVsn9",
    },
    ltcNativeSegWit: {
      privateKey: "TB4GAaMevZViQMiwziH41CfokXnJhxBM4n7YwsYKMDhum35HekWm",
      publicKey: "021687b03a727dae14520821241703942ab97d5f031e2f485a70ad6e771c80f6c3",
      address: "ltc1qh3v8pam5st3zwf9pl9lyt206afmrr32xpjwj6h",
    },
  },
  testnet: TESTNET_CREDENTIAL,
  regtest: {
    ltcLegacy: TESTNET_CREDENTIAL.ltcLegacy,
    ltcSegWit: TESTNET_CREDENTIAL.ltcSegWit,
    ltcNativeSegWit: {
      ...TESTNET_CREDENTIAL.ltcNativeSegWit,
      address: "rltc1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlj50cff",
    },
  },
};

const TESTNET_EXTRINSIC_PRIVATE_KEY = {
  ltcLegacy: "cPQkrTPJouPjCqW5Lno1grxLU7qxxPbhj1uBzBm6XxgUbgch4DQT",
  ltcSegWit: "cTUu2xkU2CznfS9mtPLmdWAH2bPe9hC6KhdgHzRn9XUt6mhxvN6Y",
  ltcNativeSegWit: "cPdnPSNmnBEjSYMd8dUeG7mw23pJdNWoz1Qj8fo3UQoybgGtaAaa",
};

const EXTRINSIC_PRIVATE_KEY = {
  mainnet: {
    ltcLegacy: "T4t2qHgdnDg4pEfgW1vkXtzenkBsN2WuUBeyjZw8bpCdrq6YKltc",
    ltcSegWit: "T8xB1o3nzXH8GqKP3cUWUYCbMDjYZL7J4sPU3NbpDP13Mv8apGmY",
    ltcNativeSegWit: "T574NGg6kVX53wXEHrcP79pFLgAD31S1jBAWt3y5YGL8rpmqvkDa",
  },
  testnet: TESTNET_EXTRINSIC_PRIVATE_KEY,
  regtest: TESTNET_EXTRINSIC_PRIVATE_KEY,
};

const ITEM = {
  mainnet: {
    ltcLegacy: {
      ...CREDENTIAL.mainnet.ltcLegacy,
      derivationPath: DERIVATION_PATH.mainnet.ltcLegacy,
    },
    ltcSegWit: {
      ...CREDENTIAL.mainnet.ltcSegWit,
      derivationPath: DERIVATION_PATH.mainnet.ltcSegWit,
    },
    ltcNativeSegWit: {
      ...CREDENTIAL.mainnet.ltcNativeSegWit,
      derivationPath: DERIVATION_PATH.mainnet.ltcNativeSegWit,
    },
  },
  testnet: {
    ltcLegacy: {
      ...CREDENTIAL.testnet.ltcLegacy,
      derivationPath: DERIVATION_PATH.testnet.ltcLegacy,
    },
    ltcSegWit: {
      ...CREDENTIAL.testnet.ltcSegWit,
      derivationPath: DERIVATION_PATH.testnet.ltcSegWit,
    },
    ltcNativeSegWit: {
      ...CREDENTIAL.testnet.ltcNativeSegWit,
      derivationPath: DERIVATION_PATH.testnet.ltcNativeSegWit,
    },
  },
  regtest: {
    ltcLegacy: {
      ...CREDENTIAL.regtest.ltcLegacy,
      derivationPath: DERIVATION_PATH.testnet.ltcLegacy,
    },
    ltcSegWit: {
      ...CREDENTIAL.regtest.ltcSegWit,
      derivationPath: DERIVATION_PATH.testnet.ltcSegWit,
    },
    ltcNativeSegWit: {
      ...CREDENTIAL.regtest.ltcNativeSegWit,
      derivationPath: DERIVATION_PATH.testnet.ltcNativeSegWit,
    },
  },
};

type NetworkDerivationsInstances = {
  [key in CommonNetworkPurposeRegTestExtendedUnion]: {
    [key in DerivationTypeUnionByNetwork["ltc"]]: Ltc;
  };
};

let networkDerivationsInstances = {} as NetworkDerivationsInstances;

beforeAll(() => {
  const networkPurposes: CommonNetworkPurposeRegTestExtendedUnion[] = [
    "regtest",
    "testnet",
    "mainnet",
  ] as const;

  const derivationTypes: DerivationTypeUnionByNetwork["ltc"][] = [
    "ltcLegacy",
    "ltcSegWit",
    "ltcNativeSegWit",
  ] as const;

  networkDerivationsInstances = networkPurposes.reduce<NetworkDerivationsInstances>(
    (networkDerivationsInstances, networkPurpose) => {
      networkDerivationsInstances[networkPurpose] = derivationTypes.reduce<
        NetworkDerivationsInstances[CommonNetworkPurposeRegTestExtendedUnion]
      >(
        (derivations, derivationType) => {
          derivations[derivationType] = getNetwork({
            network: "ltc",
            mnemonic: MNEMONIC,
            derivationConfig: {
              networkPurpose,
              derivationType,
            },
          });

          return derivations;
        },
        {} as NetworkDerivationsInstances[CommonNetworkPurposeRegTestExtendedUnion],
      );

      return networkDerivationsInstances;
    },
    {} as NetworkDerivationsInstances,
  );
});

describe("Ltc", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.ltcLegacy.deriveItemFromMnemonic({
          derivationPath: ITEM.mainnet.ltcLegacy.derivationPath,
        });

        expect(ITEM.mainnet.ltcLegacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.ltcSegWit.deriveItemFromMnemonic({
          derivationPath: ITEM.mainnet.ltcSegWit.derivationPath,
        });

        expect(ITEM.mainnet.ltcSegWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem =
          networkDerivationsInstances.mainnet.ltcNativeSegWit.deriveItemFromMnemonic({
            derivationPath: ITEM.mainnet.ltcNativeSegWit.derivationPath,
          });

        expect(ITEM.mainnet.ltcNativeSegWit).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networkDerivationsInstances.mainnet.ltcLegacy.getCredentialFromPK({
          privateKey: CREDENTIAL.mainnet.ltcLegacy.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.mainnet.ltcLegacy);
      });

      it("Derives correct segWit credential", () => {
        const credential = networkDerivationsInstances.mainnet.ltcSegWit.getCredentialFromPK({
          privateKey: CREDENTIAL.mainnet.ltcSegWit.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.mainnet.ltcSegWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networkDerivationsInstances.mainnet.ltcNativeSegWit.getCredentialFromPK({
          privateKey: CREDENTIAL.mainnet.ltcNativeSegWit.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.mainnet.ltcNativeSegWit);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networkDerivationsInstances.mainnet.ltcLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.mainnet.ltcLegacy,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.mainnet.ltcLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct segWit items batch", () => {
        const items = networkDerivationsInstances.mainnet.ltcSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.mainnet.ltcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.mainnet.ltcSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items =
          networkDerivationsInstances.mainnet.ltcNativeSegWit.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.mainnet.ltcNativeSegWit,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.mainnet.ltcNativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networkDerivationsInstances.mainnet.ltcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.mainnet.ltcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.mainnet.ltcLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networkDerivationsInstances.mainnet.ltcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.mainnet.ltcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.mainnet.ltcSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.mainnet.ltcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: ltcConfig.mainnet.ltcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: CREDENTIAL.mainnet.ltcNativeSegWit.privateKey,
            });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networkDerivationsInstances.mainnet.ltcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.mainnet.ltcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.mainnet.ltcLegacy,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for segWit private key", () => {
          const isNative = networkDerivationsInstances.mainnet.ltcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.mainnet.ltcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.mainnet.ltcSegWit,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.mainnet.ltcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: ltcConfig.mainnet.ltcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: EXTRINSIC_PRIVATE_KEY.mainnet.ltcNativeSegWit,
            });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networkDerivationsInstances.testnet.ltcLegacy.deriveItemFromMnemonic({
          derivationPath: ITEM.testnet.ltcLegacy.derivationPath,
        });

        expect(ITEM.testnet.ltcLegacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = networkDerivationsInstances.testnet.ltcSegWit.deriveItemFromMnemonic({
          derivationPath: ITEM.testnet.ltcSegWit.derivationPath,
        });

        expect(ITEM.testnet.ltcSegWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem =
          networkDerivationsInstances.testnet.ltcNativeSegWit.deriveItemFromMnemonic({
            derivationPath: ITEM.testnet.ltcNativeSegWit.derivationPath,
          });

        expect(ITEM.testnet.ltcNativeSegWit).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networkDerivationsInstances.testnet.ltcLegacy.getCredentialFromPK({
          privateKey: CREDENTIAL.testnet.ltcLegacy.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.testnet.ltcLegacy);
      });

      it("Derives correct segWit credential", () => {
        const credential = networkDerivationsInstances.testnet.ltcSegWit.getCredentialFromPK({
          privateKey: CREDENTIAL.testnet.ltcSegWit.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.testnet.ltcSegWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networkDerivationsInstances.testnet.ltcNativeSegWit.getCredentialFromPK({
          privateKey: CREDENTIAL.testnet.ltcNativeSegWit.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.testnet.ltcNativeSegWit);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networkDerivationsInstances.testnet.ltcLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.ltcLegacy,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.testnet.ltcLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct segWit items batch", () => {
        const items = networkDerivationsInstances.testnet.ltcSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.ltcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.testnet.ltcSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items =
          networkDerivationsInstances.testnet.ltcNativeSegWit.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.ltcNativeSegWit,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.testnet.ltcNativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networkDerivationsInstances.testnet.ltcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.testnet.ltcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.testnet.ltcLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networkDerivationsInstances.testnet.ltcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.testnet.ltcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.testnet.ltcSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.testnet.ltcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: ltcConfig.testnet.ltcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: CREDENTIAL.testnet.ltcNativeSegWit.privateKey,
            });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networkDerivationsInstances.testnet.ltcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.testnet.ltcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.testnet.ltcLegacy,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for segWit private key", () => {
          const isNative = networkDerivationsInstances.testnet.ltcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.testnet.ltcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.testnet.ltcSegWit,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.testnet.ltcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: ltcConfig.testnet.ltcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: EXTRINSIC_PRIVATE_KEY.testnet.ltcNativeSegWit,
            });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("regtest", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networkDerivationsInstances.regtest.ltcLegacy.deriveItemFromMnemonic({
          derivationPath: ITEM.regtest.ltcLegacy.derivationPath,
        });

        expect(ITEM.regtest.ltcLegacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = networkDerivationsInstances.regtest.ltcSegWit.deriveItemFromMnemonic({
          derivationPath: ITEM.regtest.ltcSegWit.derivationPath,
        });

        expect(ITEM.regtest.ltcSegWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem =
          networkDerivationsInstances.regtest.ltcNativeSegWit.deriveItemFromMnemonic({
            derivationPath: ITEM.regtest.ltcNativeSegWit.derivationPath,
          });

        expect(ITEM.regtest.ltcNativeSegWit).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networkDerivationsInstances.regtest.ltcLegacy.getCredentialFromPK({
          privateKey: CREDENTIAL.regtest.ltcLegacy.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.regtest.ltcLegacy);
      });

      it("Derives correct segWit credential", () => {
        const credential = networkDerivationsInstances.regtest.ltcSegWit.getCredentialFromPK({
          privateKey: CREDENTIAL.regtest.ltcSegWit.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.regtest.ltcSegWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networkDerivationsInstances.regtest.ltcNativeSegWit.getCredentialFromPK({
          privateKey: CREDENTIAL.regtest.ltcNativeSegWit.privateKey,
        });

        expect(credential).toEqual(CREDENTIAL.regtest.ltcNativeSegWit);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networkDerivationsInstances.regtest.ltcLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.ltcLegacy,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.regtest.ltcLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct segWit items batch", () => {
        const items = networkDerivationsInstances.regtest.ltcSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.ltcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.regtest.ltcSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items =
          networkDerivationsInstances.regtest.ltcNativeSegWit.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.ltcNativeSegWit,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(ITEM.regtest.ltcNativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networkDerivationsInstances.regtest.ltcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.regtest.ltcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.regtest.ltcLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networkDerivationsInstances.regtest.ltcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.regtest.ltcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: CREDENTIAL.regtest.ltcSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.regtest.ltcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: ltcConfig.regtest.ltcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: CREDENTIAL.regtest.ltcNativeSegWit.privateKey,
            });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networkDerivationsInstances.regtest.ltcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.regtest.ltcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.testnet.ltcLegacy,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for segWit private key", () => {
          const isNative = networkDerivationsInstances.regtest.ltcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: ltcConfig.regtest.ltcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: EXTRINSIC_PRIVATE_KEY.testnet.ltcSegWit,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.regtest.ltcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: ltcConfig.regtest.ltcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: EXTRINSIC_PRIVATE_KEY.testnet.ltcNativeSegWit,
            });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
