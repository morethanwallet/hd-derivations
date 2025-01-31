import type { BtcDerivationTypeUnion } from "@/libs/types/index.js";
import { getNetwork } from "../../get-network/index.js";
import { btcConfig } from "../../libs/modules/config/index.js";
import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../libs/types/index.js";
import { Btc } from "../btc.network.js";
import { describe, it, expect, beforeAll } from "vitest";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";

const MOCK_COMMON_DERIVATION_PATH = {
  mainnet: {
    btcLegacy: "m/44'/0'/0'/0/0",
    btcSegWit: "m/49'/0'/0'/0/0",
    btcNativeSegWit: "m/84'/0'/0'/0/0",
    btcTaproot: "m/86'/0'/0'/0/0",
  },
  testnet: {
    btcLegacy: "m/44'/1'/0'/0/0",
    btcSegWit: "m/49'/1'/0'/0/0",
    btcNativeSegWit: "m/84'/1'/0'/0/0",
    btcTaproot: "m/86'/1'/0'/0/0",
  },
};

const MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX = {
  mainnet: {
    btcLegacy: "m/44'/0'/0'/0",
    btcSegWit: "m/49'/0'/0'/0",
    btcNativeSegWit: "m/84'/0'/0'/0",
    btcTaproot: "m/86'/0'/0'/0",
  },
  testnet: {
    btcLegacy: "m/44'/1'/0'/0",
    btcSegWit: "m/49'/1'/0'/0",
    btcNativeSegWit: "m/84'/1'/0'/0",
    btcTaproot: "m/86'/1'/0'/0",
  },
};

const MOCK_COMMON_MAINNET_SEG_WIT_CREDENTIAL = {
  privateKey: "KzJPKD7B7wezTn9QZvHAGSH2CXvdhmcurq3WoEvsgPpBwzitdC81",
  publicKey: "0317e1f9c3fd3d6d630cf1f1f4ec442cb9a93ff8c076ab71bcad5bb7ed8d17348c",
};

const MOCK_MAINNET_CREDENTIAL = {
  btcLegacy: {
    privateKey: "L3hhRruT6ZGHKutu49Spfq68zHuhGDm8b7ahr4bcLD2AbTJWBJnr",
    publicKey: "03d3f020b78cc3c5b0e7bb49ef8e13d9718ef223b34819fb4c5c35ddec76bc90c0",
    address: "176d1FZHP88mMFoyaTA2sZ5UA19CY33Phn",
  },
  btcSegWit: {
    ...MOCK_COMMON_MAINNET_SEG_WIT_CREDENTIAL,
    address: "3QZgY2mGE3ugcjjjq956v4JsbFVjr6xCd9",
  },
  btcNativeSegWit: {
    privateKey: "L4VQdCsiDczvSBSAro7GvS41qkFdMAy8htNF5Zcx6g4ip5C88DKC",
    publicKey: "02326c7f6b115952cf752f27bfbedcebfa93f6b3f460aac780e76be12d805a9d04",
    address: "bc1qzccrsckwsr7t76sz54kjwmhkxyts94e573hpd8",
  },
  btcTaproot: {
    privateKey: "L4obzibVhVrw5V2hCUQAiipuXBw5X8W1bdR3WzTZUgafDLmeUzzR",
    publicKey: "eb2c29de66f2581f95f881847492bab0a9e9000856202bf1f10d537f6eeacfe5",
    address: "bc1pqlgwhczvyfftzu8kjwkmyxay4xd2qghmazwqty8dtw5sempknd2qhkag2t",
  },
  btcP2wsh: {
    ...MOCK_COMMON_MAINNET_SEG_WIT_CREDENTIAL,
    address: "bc1q6vdym5mjce2jc00qv03eu7t0g7cprr5kye6xcvvw5xs2uf250nns3r3sn6",
  },
  btcP2wshInP2sh: {
    ...MOCK_COMMON_MAINNET_SEG_WIT_CREDENTIAL,
    address: "3HRjXgMDRKK8rn9wfVFad28jyHT82KPfo3",
  },
};

const MOCK_COMMON_MAINNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY =
  "L15ASq4MPHFcqgqePPRPPaRE5W5uBdpP6sufvfMUWwty6Kj1nrAo";

const MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY = {
  btcLegacy: {
    privateKey: "L1644zJDRxpgQxdaTZceJikbCcVUR1XyqzeRY1ZHqk15ZMnojQSh",
  },
  btcSegWit: { privateKey: MOCK_COMMON_MAINNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY },
  btcNativeSegWit: {
    privateKey: "L1kBHe9oFPGGTtgXBhbSogi1gryYBqGkJKvHcyzZaVBy7gjfdMKP",
  },
  btcTaproot: {
    privateKey: "L5ddnhKfVpkZGoS5aygVCHU6xYQGDAwhoUSiew1QCmbtMhEnmhf8",
  },
  btcP2wsh: {
    privateKey: MOCK_COMMON_MAINNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY,
  },
  btcP2wshInP2sh: { privateKey: MOCK_COMMON_MAINNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY },
};

const MOCK_MAINNET_ITEM = {
  btcLegacy: {
    ...MOCK_MAINNET_CREDENTIAL.btcLegacy,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.btcLegacy,
  },
  btcSegWit: {
    ...MOCK_MAINNET_CREDENTIAL.btcSegWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.btcSegWit,
  },
  btcNativeSegWit: {
    ...MOCK_MAINNET_CREDENTIAL.btcNativeSegWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.btcNativeSegWit,
  },
  btcTaproot: {
    ...MOCK_MAINNET_CREDENTIAL.btcTaproot,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.btcTaproot,
  },
  btcP2wsh: {
    ...MOCK_MAINNET_CREDENTIAL.btcP2wsh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.btcSegWit,
  },
  btcP2wshInP2sh: {
    ...MOCK_MAINNET_CREDENTIAL.btcP2wshInP2sh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.btcSegWit,
  },
};

const MOCK_COMMON_TESTNET_SEG_WIT_CREDENTIAL = {
  privateKey: "cQjBQLBCeuyn1FeJE72M93vQJgMjoMXH9CkgidtjqjBsiLRjJKLK",
  publicKey: "0338848902420d91c7789bd62edb88814ce27ecd48f5ac9dd1d0f08682864c6755",
};

const MOCK_TESTNET_CREDENTIAL = {
  btcLegacy: {
    address: "mk2hF1aSuKkBZtCUM9jDfjgFLE5gGJ8U8c",
    privateKey: "cQEPGT34NWGzWnW1JE3d5GKaBcEQJqUsDdxH2jXD97CkXaAaXHEn",
    publicKey: "02d76e63231c59c216550ef886d362d58ba96ee30eb56caa99f5cdaf651b9a9a6e",
  },
  btcSegWit: {
    ...MOCK_COMMON_TESTNET_SEG_WIT_CREDENTIAL,
    address: "2NDrscWiWSvuxUmQp3stwgauM7PLXyA5Jba",
  },
  btcNativeSegWit: {
    address: "tb1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlwsvuf7",
    privateKey: "cU7MwjFKfWjDPkaKhEJmsbG6DwPjSZs6WLY4BYXiSzeGRnd232i3",
    publicKey: "03d5f0a7cc993f8a296111637c6dd2d80ab917ebeedcb6ed30a600cef49a4d63a1",
  },
  btcTaproot: {
    address: "tb1p0q0ya6q34wml2h2katjm8486f27czctx7vghcvh08pmvhu9zdvlq7ne7zu",
    privateKey: "cPQEyhkUdfSCTZfEcWsFm5JLBo2ysAvsTzsYJ9Vv1mYTJmSZAj8A",
    publicKey: "5b0e1610c136eaa57159acd0bd602278b5de45f9664691b9c39ed244a4d46dd7",
  },
  btcP2wsh: {
    ...MOCK_COMMON_TESTNET_SEG_WIT_CREDENTIAL,
    address: "tb1qaan4la2jzw7ww7f8f2uqrmcyyfyfqcmlxvn7r2dtc4gfhy2gl7fseyq9wd",
  },
  btcP2wshInP2sh: {
    ...MOCK_COMMON_TESTNET_SEG_WIT_CREDENTIAL,
    address: "2NFcaS5rkUcss4LrN9SKwN2FkBTaLtfEaiL",
  },
};

const MOCK_COMMON_TESTNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY =
  "cRS9uk4CpLwt18JumoEWktvHhjPJr5v5Av4935oz24YyM4t8zz1k";

const MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY = {
  btcLegacy: {
    privateKey: "cRT3XuJ4s2WwaQ6qqyRmg3Fepqnt5Tdfv2nteS1oLrf5p6rVY682",
  },
  btcSegWit: { privateKey: MOCK_COMMON_TESTNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY },
  btcNativeSegWit: {
    privateKey: "cS7AkZ9egSxXdL9na7QaB1D5K6GwrHNSNN4kjQT55bqyNRqoMJ1E",
  },
  btcTaproot: {
    privateKey: "cVzdFcKWvtSpSEuLyPVcZbyAamhfsd3PsWbBmMTuhtFtcSKDSKN1",
  },
  btcP2wsh: {
    privateKey: MOCK_COMMON_TESTNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY,
  },
  btcP2wshInP2sh: { privateKey: MOCK_COMMON_TESTNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY },
};

const MOCK_TESTNET_ITEM = {
  btcLegacy: {
    ...MOCK_TESTNET_CREDENTIAL.btcLegacy,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcLegacy,
  },
  btcSegWit: {
    ...MOCK_TESTNET_CREDENTIAL.btcSegWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcSegWit,
  },
  btcNativeSegWit: {
    ...MOCK_TESTNET_CREDENTIAL.btcNativeSegWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcNativeSegWit,
  },
  btcTaproot: {
    ...MOCK_TESTNET_CREDENTIAL.btcTaproot,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcTaproot,
  },
  btcP2wsh: {
    ...MOCK_TESTNET_CREDENTIAL.btcP2wsh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcSegWit,
  },
  btcP2wshInP2sh: {
    ...MOCK_TESTNET_CREDENTIAL.btcP2wshInP2sh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcSegWit,
  },
};

const MOCK_REGTEST_CREDENTIAL = {
  btcLegacy: {
    ...MOCK_TESTNET_CREDENTIAL.btcLegacy,
  },
  btcSegWit: {
    ...MOCK_TESTNET_CREDENTIAL.btcSegWit,
  },
  btcNativeSegWit: {
    ...MOCK_TESTNET_CREDENTIAL.btcNativeSegWit,
    address: "bcrt1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlve437h",
  },
  btcTaproot: {
    ...MOCK_TESTNET_CREDENTIAL.btcTaproot,
    address: "bcrt1p0q0ya6q34wml2h2katjm8486f27czctx7vghcvh08pmvhu9zdvlqn2nchx",
  },
  btcP2wsh: {
    ...MOCK_TESTNET_CREDENTIAL.btcP2wsh,
    address: "bcrt1qaan4la2jzw7ww7f8f2uqrmcyyfyfqcmlxvn7r2dtc4gfhy2gl7fs5a2rmh",
  },
  btcP2wshInP2sh: {
    ...MOCK_TESTNET_CREDENTIAL.btcP2wshInP2sh,
  },
};

const MOCK_REGTEST_ITEM = {
  btcLegacy: {
    ...MOCK_REGTEST_CREDENTIAL.btcLegacy,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcLegacy,
  },
  btcSegWit: {
    ...MOCK_REGTEST_CREDENTIAL.btcSegWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcSegWit,
  },
  btcNativeSegWit: {
    ...MOCK_REGTEST_CREDENTIAL.btcNativeSegWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcNativeSegWit,
  },
  btcTaproot: {
    ...MOCK_REGTEST_CREDENTIAL.btcTaproot,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcTaproot,
  },
  btcP2wsh: {
    ...MOCK_REGTEST_CREDENTIAL.btcP2wsh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcSegWit,
  },
  btcP2wshInP2sh: {
    ...MOCK_REGTEST_CREDENTIAL.btcP2wshInP2sh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcSegWit,
  },
};

type NetworksDerivations = {
  [key in CommonNetworkPurposeRegTestExtendedUnion]: {
    [key in BtcDerivationTypeUnion]: Btc;
  };
};

let networksDerivations = {} as NetworksDerivations;

beforeAll(() => {
  const networkPurposes: CommonNetworkPurposeRegTestExtendedUnion[] = [
    "regtest",
    "testnet",
    "mainnet",
  ] as const;

  const derivationTypes: BtcDerivationTypeUnion[] = [
    "btcLegacy",
    "btcSegWit",
    "btcNativeSegWit",
    "btcTaproot",
    "btcP2wsh",
    "btcP2wshInP2sh",
  ] as const;

  networksDerivations = networkPurposes.reduce<NetworksDerivations>(
    (networksDerivations, networkPurpose) => {
      networksDerivations[networkPurpose] = derivationTypes.reduce<
        NetworksDerivations[CommonNetworkPurposeRegTestExtendedUnion]
      >(
        (derivations, derivationType) => {
          derivations[derivationType] = getNetwork({
            network: "btc",
            mnemonic: MNEMONIC,
            derivationConfig: {
              networkPurpose,
              derivationType,
              prefixConfig: btcConfig[networkPurpose][derivationType].prefixConfig,
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

describe("Btc", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networksDerivations.mainnet.btcLegacy.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.btcLegacy.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.btcLegacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = networksDerivations.mainnet.btcSegWit.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.btcSegWit.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.btcSegWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem = networksDerivations.mainnet.btcNativeSegWit.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.btcNativeSegWit.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.btcNativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = networksDerivations.mainnet.btcTaproot.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.btcTaproot.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.btcTaproot).toEqual(derivedItem);
      });

      it("Derives correct p2wsh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.mainnet.btcP2wsh.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.btcP2wsh.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.btcP2wsh).toEqual(derivedItem);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.mainnet.btcP2wshInP2sh.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.btcP2wshInP2sh.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.btcP2wshInP2sh).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networksDerivations.mainnet.btcLegacy.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.btcLegacy.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.btcLegacy);
      });

      it("Derives correct segWit credential", () => {
        const credential = networksDerivations.mainnet.btcSegWit.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.btcSegWit.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.btcSegWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networksDerivations.mainnet.btcNativeSegWit.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.btcNativeSegWit.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.btcNativeSegWit);
      });

      it("Derives correct taproot credential", () => {
        const credential = networksDerivations.mainnet.btcTaproot.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.btcTaproot.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.btcTaproot);
      });

      it("Derives correct p2wsh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.mainnet.btcP2wsh.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.btcP2wsh.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.btcP2wsh);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.mainnet.btcP2wshInP2sh.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.btcP2wshInP2sh.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.btcP2wshInP2sh);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networksDerivations.mainnet.btcLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet.btcLegacy,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.btcLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct segWit items batch", () => {
        const items = networksDerivations.mainnet.btcSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.btcSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items = networksDerivations.mainnet.btcNativeSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet.btcNativeSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.btcNativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct taproot items batch", () => {
        const items = networksDerivations.mainnet.btcTaproot.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet.btcTaproot,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.btcTaproot);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.mainnet.btcP2wsh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.btcP2wsh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.mainnet.btcP2wshInP2sh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.btcP2wshInP2sh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networksDerivations.mainnet.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.btcLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networksDerivations.mainnet.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.btcSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.mainnet.btcNativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcNativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.btcNativeSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.mainnet.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.btcTaproot.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.mainnet.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.mainnet.btcP2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcP2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.btcP2wshInP2sh.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networksDerivations.mainnet.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.btcLegacy.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networksDerivations.mainnet.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.btcSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.mainnet.btcNativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcNativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.btcNativeSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.mainnet.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.btcTaproot.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.mainnet.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.mainnet.btcP2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcP2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.btcP2wshInP2sh.privateKey,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networksDerivations.testnet.btcLegacy.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.btcLegacy.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.btcLegacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = networksDerivations.testnet.btcSegWit.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.btcSegWit.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.btcSegWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem = networksDerivations.testnet.btcNativeSegWit.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.btcNativeSegWit.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.btcNativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = networksDerivations.testnet.btcTaproot.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.btcTaproot.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.btcTaproot).toEqual(derivedItem);
      });

      it("Derives correct p2wsh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.testnet.btcP2wsh.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.btcP2wsh.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.btcP2wsh).toEqual(derivedItem);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.testnet.btcP2wshInP2sh.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.btcP2wshInP2sh.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.btcP2wshInP2sh).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networksDerivations.testnet.btcLegacy.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.btcLegacy.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.btcLegacy);
      });

      it("Derives correct segWit credential", () => {
        const credential = networksDerivations.testnet.btcSegWit.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.btcSegWit.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.btcSegWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networksDerivations.testnet.btcNativeSegWit.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.btcNativeSegWit.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.btcNativeSegWit);
      });

      it("Derives correct taproot credential", () => {
        const credential = networksDerivations.testnet.btcTaproot.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.btcTaproot.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.btcTaproot);
      });

      it("Derives correct p2wsh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.testnet.btcP2wsh.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.btcP2wsh.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.btcP2wsh);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.testnet.btcP2wshInP2sh.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.btcP2wshInP2sh.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.btcP2wshInP2sh);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networksDerivations.testnet.btcLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcLegacy,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.btcLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct segWit items batch", () => {
        const items = networksDerivations.testnet.btcSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.btcSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items = networksDerivations.testnet.btcNativeSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcNativeSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.btcNativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct taproot items batch", () => {
        const items = networksDerivations.testnet.btcTaproot.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcTaproot,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.btcTaproot);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.testnet.btcP2wsh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.btcP2wsh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.testnet.btcP2wshInP2sh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.btcP2wshInP2sh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networksDerivations.testnet.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.btcLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networksDerivations.testnet.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.btcSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.testnet.btcNativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcNativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.btcNativeSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.testnet.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.btcTaproot.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.testnet.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.testnet.btcP2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcP2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.btcP2wshInP2sh.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networksDerivations.testnet.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcLegacy.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networksDerivations.testnet.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.testnet.btcNativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcNativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcNativeSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.testnet.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcTaproot.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.testnet.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.testnet.btcP2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcP2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcP2wshInP2sh.privateKey,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("regtest", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networksDerivations.regtest.btcLegacy.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.btcLegacy.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.btcLegacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = networksDerivations.regtest.btcSegWit.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.btcSegWit.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.btcSegWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem = networksDerivations.regtest.btcNativeSegWit.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.btcNativeSegWit.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.btcNativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = networksDerivations.regtest.btcTaproot.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.btcTaproot.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.btcTaproot).toEqual(derivedItem);
      });

      it("Derives correct p2wsh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.regtest.btcP2wsh.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.btcP2wsh.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.btcP2wsh).toEqual(derivedItem);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.regtest.btcP2wshInP2sh.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.btcP2wshInP2sh.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.btcP2wshInP2sh).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networksDerivations.regtest.btcLegacy.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.btcLegacy.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.btcLegacy);
      });

      it("Derives correct segWit credential", () => {
        const credential = networksDerivations.regtest.btcSegWit.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.btcSegWit.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.btcSegWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networksDerivations.regtest.btcNativeSegWit.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.btcNativeSegWit.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.btcNativeSegWit);
      });

      it("Derives correct taproot credential", () => {
        const credential = networksDerivations.regtest.btcTaproot.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.btcTaproot.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.btcTaproot);
      });

      it("Derives correct p2wsh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.regtest.btcP2wsh.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.btcP2wsh.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.btcP2wsh);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.regtest.btcP2wshInP2sh.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.btcP2wshInP2sh.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.btcP2wshInP2sh);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networksDerivations.regtest.btcLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcLegacy,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.btcLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct segWit items batch", () => {
        const items = networksDerivations.regtest.btcSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.btcSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items = networksDerivations.regtest.btcNativeSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcNativeSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.btcNativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct taproot items batch", () => {
        const items = networksDerivations.regtest.btcTaproot.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcTaproot,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.btcTaproot);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.regtest.btcP2wsh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.btcP2wsh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.regtest.btcP2wshInP2sh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.btcP2wshInP2sh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networksDerivations.regtest.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.btcLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networksDerivations.regtest.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.btcSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.regtest.btcNativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcNativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.btcNativeSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.regtest.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.btcTaproot.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.regtest.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.regtest.btcP2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcP2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.btcP2wshInP2sh.privateKey,
          });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networksDerivations.regtest.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcLegacy.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networksDerivations.regtest.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.regtest.btcNativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcNativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcNativeSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.regtest.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcTaproot.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.regtest.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.regtest.btcP2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcP2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.btcP2wshInP2sh.privateKey,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
