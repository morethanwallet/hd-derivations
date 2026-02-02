import { describe, it, expect } from "vitest";

import { getNetwork } from "../../get-network/get-network.js";
import { btcConfig } from "../../libs/modules/config/index.js";
import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../libs/types/index.js";
import { type Btc } from "../btc.network.js";
import {
  FIRST_ITEM_INDEX,
  INDEX_LOOKUP_FROM,
  INDEX_LOOKUP_TO,
  MNEMONIC,
} from "../../libs/constants/index.js";

import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";

const DERIVATION_PATH = {
  mainnet: {
    btcLegacy: "m/44'/0'/0'/0/0",
    btcP2wshInP2sh: "m/48'/0'/0'/1'/0/0",
    btcP2wsh: "m/48'/0'/0'/2'/0/0",
    btcSegWit: "m/49'/0'/0'/0/0",
    btcNativeSegWit: "m/84'/0'/0'/0/0",
    btcTaproot: "m/86'/0'/0'/0/0",
  },
  testnet: {
    btcLegacy: "m/44'/1'/0'/0/0",
    btcP2wshInP2sh: "m/48'/1'/0'/1'/0/0",
    btcP2wsh: "m/48'/1'/0'/2'/0/0",
    btcSegWit: "m/49'/1'/0'/0/0",
    btcNativeSegWit: "m/84'/1'/0'/0/0",
    btcTaproot: "m/86'/1'/0'/0/0",
  },
};

const DERIVATION_PATH_BATCH_PREFIX = {
  mainnet: {
    btcLegacy: "m/44'/0'/0'/0",
    btcP2wshInP2sh: "m/48'/0'/0'/1'/0",
    btcP2wsh: "m/48'/0'/0'/2'/0",
    btcSegWit: "m/49'/0'/0'/0",
    btcNativeSegWit: "m/84'/0'/0'/0",
    btcTaproot: "m/86'/0'/0'/0",
  },
  testnet: {
    btcLegacy: "m/44'/1'/0'/0",
    btcP2wshInP2sh: "m/48'/1'/0'/1'/0",
    btcP2wsh: "m/48'/1'/0'/2'/0",
    btcSegWit: "m/49'/1'/0'/0",
    btcNativeSegWit: "m/84'/1'/0'/0",
    btcTaproot: "m/86'/1'/0'/0",
  },
};

const MAINNET_CREDENTIAL = {
  btcLegacy: {
    privateKey: "L3hhRruT6ZGHKutu49Spfq68zHuhGDm8b7ahr4bcLD2AbTJWBJnr",
    publicKey: "03d3f020b78cc3c5b0e7bb49ef8e13d9718ef223b34819fb4c5c35ddec76bc90c0",
    address: "176d1FZHP88mMFoyaTA2sZ5UA19CY33Phn",
  },
  btcP2wshInP2sh: {
    privateKey: "L1XUVsfZmeB1Hxdnys2NmyCBJo1NTJQXhSqqVYpYxV4Nw8RpoJzS",
    publicKey: "02b46c87fcf2b93d36f1489ef53d834c6f60c21e14feeb3332bde1c4d4420f6af3",
    address: "389tywTtZCDkyppKAJbAdr6ZEFtA6Y3ANC",
  },
  btcSegWit: {
    privateKey: "KzJPKD7B7wezTn9QZvHAGSH2CXvdhmcurq3WoEvsgPpBwzitdC81",
    publicKey: "0317e1f9c3fd3d6d630cf1f1f4ec442cb9a93ff8c076ab71bcad5bb7ed8d17348c",
    address: "3QZgY2mGE3ugcjjjq956v4JsbFVjr6xCd9",
  },
  btcNativeSegWit: {
    privateKey: "L4VQdCsiDczvSBSAro7GvS41qkFdMAy8htNF5Zcx6g4ip5C88DKC",
    publicKey: "02326c7f6b115952cf752f27bfbedcebfa93f6b3f460aac780e76be12d805a9d04",
    address: "bc1qzccrsckwsr7t76sz54kjwmhkxyts94e573hpd8",
  },
  btcP2wsh: {
    privateKey: "Ky8VH8MQNz1Ln923KjGwaeGH6fgH4fgkJ7ceoViivozfz48h6EYv",
    publicKey: "02d8e9929c42e1013fc1e9718d9afebd66350daa6729bd52b9a3f0bd27939a465d",
    address: "bc1q0kqr3q9jdqn800t7du5xjr4atslfq529xvxw0pwqgu2hu6cmhw4s8ck63d",
  },
  btcTaproot: {
    privateKey: "L4obzibVhVrw5V2hCUQAiipuXBw5X8W1bdR3WzTZUgafDLmeUzzR",
    publicKey: "eb2c29de66f2581f95f881847492bab0a9e9000856202bf1f10d537f6eeacfe5",
    address: "bc1pqlgwhczvyfftzu8kjwkmyxay4xd2qghmazwqty8dtw5sempknd2qhkag2t",
  },
};

const MAINNET_EXTRINSIC_PRIVATE_KEY = {
  btcLegacy: { privateKey: "L1644zJDRxpgQxdaTZceJikbCcVUR1XyqzeRY1ZHqk15ZMnojQSh" },
  btcP2wshInP2sh: { privateKey: "KzipLdnpzuwrKdD59dudAC7EyeiGDMy2Ra6YXshh8vpPMdZ41J6i" },
  btcSegWit: { privateKey: "L15ASq4MPHFcqgqePPRPPaRE5W5uBdpP6sufvfMUWwty6Kj1nrAo" },
  btcNativeSegWit: { privateKey: "L1kBHe9oFPGGTtgXBhbSogi1gryYBqGkJKvHcyzZaVBy7gjfdMKP" },
  btcP2wsh: { privateKey: "Kz93uu3MzBYnU1wvaowx6r7XTLeLYCRmMmZgv24pcVwCVEk7h9Da" },
  btcTaproot: { privateKey: "L5ddnhKfVpkZGoS5aygVCHU6xYQGDAwhoUSiew1QCmbtMhEnmhf8" },
};

const MAINNET_ITEM = {
  btcLegacy: {
    ...MAINNET_CREDENTIAL.btcLegacy,
    derivationPath: DERIVATION_PATH.mainnet.btcLegacy,
  },
  btcP2wshInP2sh: {
    ...MAINNET_CREDENTIAL.btcP2wshInP2sh,
    derivationPath: DERIVATION_PATH.mainnet.btcP2wshInP2sh,
  },
  btcSegWit: {
    ...MAINNET_CREDENTIAL.btcSegWit,
    derivationPath: DERIVATION_PATH.mainnet.btcSegWit,
  },
  btcNativeSegWit: {
    ...MAINNET_CREDENTIAL.btcNativeSegWit,
    derivationPath: DERIVATION_PATH.mainnet.btcNativeSegWit,
  },
  btcP2wsh: {
    ...MAINNET_CREDENTIAL.btcP2wsh,
    derivationPath: DERIVATION_PATH.mainnet.btcP2wsh,
  },
  btcTaproot: {
    ...MAINNET_CREDENTIAL.btcTaproot,
    derivationPath: DERIVATION_PATH.mainnet.btcTaproot,
  },
};

const TESTNET_CREDENTIAL = {
  btcLegacy: {
    address: "mk2hF1aSuKkBZtCUM9jDfjgFLE5gGJ8U8c",
    privateKey: "cQEPGT34NWGzWnW1JE3d5GKaBcEQJqUsDdxH2jXD97CkXaAaXHEn",
    publicKey: "02d76e63231c59c216550ef886d362d58ba96ee30eb56caa99f5cdaf651b9a9a6e",
  },
  btcP2wshInP2sh: {
    privateKey: "cNuhdRezqQUPV5dMHmeQeqqGKPfbQkbVDPKy8SKNKtonGKkCXtBM",
    publicKey: "02a0782d65e1013e463a911beb867ddad694d57ff0d05535b4132cb7a6b39e0547",
    address: "2N8K3VJ1FgzN1dbYQBeDGinqwZzebQtF9c2",
  },
  btcSegWit: {
    privateKey: "cQjBQLBCeuyn1FeJE72M93vQJgMjoMXH9CkgidtjqjBsiLRjJKLK",
    publicKey: "0338848902420d91c7789bd62edb88814ce27ecd48f5ac9dd1d0f08682864c6755",
    address: "2NDrscWiWSvuxUmQp3stwgauM7PLXyA5Jba",
  },
  btcNativeSegWit: {
    address: "tb1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlwsvuf7",
    privateKey: "cU7MwjFKfWjDPkaKhEJmsbG6DwPjSZs6WLY4BYXiSzeGRnd232i3",
    publicKey: "03d5f0a7cc993f8a296111637c6dd2d80ab917ebeedcb6ed30a600cef49a4d63a1",
  },
  btcP2wsh: {
    privateKey: "cT6pGoCE6CvWaejAkLcESXZHuMDMfVnx844LH1vet9f31fzjKUM6",
    publicKey: "02232bd030355da6e9c035d91382a0f68112a4630c3715f9d4106899609a848d8b",
    address: "tb1qar0qmnftfnqr9emnfdchqse54ylsz6t2s7s3qq02glvu7x0702vqwdjuzp",
  },
  btcTaproot: {
    address: "tb1p0q0ya6q34wml2h2katjm8486f27czctx7vghcvh08pmvhu9zdvlq7ne7zu",
    privateKey: "cPQEyhkUdfSCTZfEcWsFm5JLBo2ysAvsTzsYJ9Vv1mYTJmSZAj8A",
    publicKey: "5b0e1610c136eaa57159acd0bd602278b5de45f9664691b9c39ed244a4d46dd7",
  },
};

const TESTNET_EXTRINSIC_PRIVATE_KEY = {
  btcLegacy: { privateKey: "cRT3XuJ4s2WwaQ6qqyRmg3Fepqnt5Tdfv2nteS1oLrf5p6rVY682" },
  btcP2wshInP2sh: { privateKey: "cNx9Q1RnbNY1PA3si6wJpaZnoP6V2fmm7ParGqwxX4iaSpgbZJwN" },
  btcSegWit: { privateKey: "cRS9uk4CpLwt18JumoEWktvHhjPJr5v5Av4935oz24YyM4t8zz1k" },
  btcNativeSegWit: { privateKey: "cS7AkZ9egSxXdL9na7QaB1D5K6GwrHNSNN4kjQT55bqyNRqoMJ1E" },
  btcP2wsh: { privateKey: "cNDE1QCiu2zZEhD8QyfHLN3BMfqAiwoXzeoQhnW8THfUeKiaz9zn" },
  btcTaproot: { privateKey: "cVzdFcKWvtSpSEuLyPVcZbyAamhfsd3PsWbBmMTuhtFtcSKDSKN1" },
};

const TESTNET_ITEM = {
  btcLegacy: {
    ...TESTNET_CREDENTIAL.btcLegacy,
    derivationPath: DERIVATION_PATH.testnet.btcLegacy,
  },
  btcP2wshInP2sh: {
    ...TESTNET_CREDENTIAL.btcP2wshInP2sh,
    derivationPath: DERIVATION_PATH.testnet.btcP2wshInP2sh,
  },
  btcSegWit: {
    ...TESTNET_CREDENTIAL.btcSegWit,
    derivationPath: DERIVATION_PATH.testnet.btcSegWit,
  },
  btcNativeSegWit: {
    ...TESTNET_CREDENTIAL.btcNativeSegWit,
    derivationPath: DERIVATION_PATH.testnet.btcNativeSegWit,
  },
  btcP2wsh: {
    ...TESTNET_CREDENTIAL.btcP2wsh,
    derivationPath: DERIVATION_PATH.testnet.btcP2wsh,
  },
  btcTaproot: {
    ...TESTNET_CREDENTIAL.btcTaproot,
    derivationPath: DERIVATION_PATH.testnet.btcTaproot,
  },
};

const REGTEST_CREDENTIAL = {
  btcLegacy: {
    ...TESTNET_CREDENTIAL.btcLegacy,
  },
  btcP2wshInP2sh: {
    ...TESTNET_CREDENTIAL.btcP2wshInP2sh,
  },
  btcSegWit: {
    ...TESTNET_CREDENTIAL.btcSegWit,
  },
  btcNativeSegWit: {
    ...TESTNET_CREDENTIAL.btcNativeSegWit,
    address: "bcrt1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlve437h",
  },
  btcP2wsh: {
    ...TESTNET_CREDENTIAL.btcP2wsh,
    address: "bcrt1qar0qmnftfnqr9emnfdchqse54ylsz6t2s7s3qq02glvu7x0702vqr5c6hm",
  },
  btcTaproot: {
    ...TESTNET_CREDENTIAL.btcTaproot,
    address: "bcrt1p0q0ya6q34wml2h2katjm8486f27czctx7vghcvh08pmvhu9zdvlqn2nchx",
  },
};

const REGTEST_ITEM = {
  btcLegacy: {
    ...REGTEST_CREDENTIAL.btcLegacy,
    derivationPath: DERIVATION_PATH.testnet.btcLegacy,
  },
  btcP2wshInP2sh: {
    ...REGTEST_CREDENTIAL.btcP2wshInP2sh,
    derivationPath: DERIVATION_PATH.testnet.btcP2wshInP2sh,
  },
  btcSegWit: {
    ...REGTEST_CREDENTIAL.btcSegWit,
    derivationPath: DERIVATION_PATH.testnet.btcSegWit,
  },
  btcNativeSegWit: {
    ...REGTEST_CREDENTIAL.btcNativeSegWit,
    derivationPath: DERIVATION_PATH.testnet.btcNativeSegWit,
  },
  btcP2wsh: {
    ...REGTEST_CREDENTIAL.btcP2wsh,
    derivationPath: DERIVATION_PATH.testnet.btcP2wsh,
  },
  btcTaproot: {
    ...REGTEST_CREDENTIAL.btcTaproot,
    derivationPath: DERIVATION_PATH.testnet.btcTaproot,
  },
};

type NetworkDerivationsInstances = {
  [key in CommonNetworkPurposeRegTestExtendedUnion]: {
    [key in DerivationTypeUnionByNetwork["btc"]]: Btc;
  };
};

let networkDerivationsInstances = {} as NetworkDerivationsInstances;

beforeAll(() => {
  const networkPurposes: CommonNetworkPurposeRegTestExtendedUnion[] = [
    "regtest",
    "testnet",
    "mainnet",
  ] as const;

  const derivationTypes: DerivationTypeUnionByNetwork["btc"][] = [
    "btcLegacy",
    "btcSegWit",
    "btcNativeSegWit",
    "btcTaproot",
    "btcP2wsh",
    "btcP2wshInP2sh",
  ] as const;

  networkDerivationsInstances = networkPurposes.reduce<NetworkDerivationsInstances>(
    (networkDerivationsInstances, networkPurpose) => {
      networkDerivationsInstances[networkPurpose] = derivationTypes.reduce<
        NetworkDerivationsInstances[CommonNetworkPurposeRegTestExtendedUnion]
      >(
        (derivations, derivationType) => {
          derivations[derivationType] = getNetwork({
            network: "btc",
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

describe("Btc", () => {
  describe("mainnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.btcLegacy.deriveItemFromMnemonic({
          derivationPath: MAINNET_ITEM.btcLegacy.derivationPath,
        });

        expect(MAINNET_ITEM.btcLegacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.btcSegWit.deriveItemFromMnemonic({
          derivationPath: MAINNET_ITEM.btcSegWit.derivationPath,
        });

        expect(MAINNET_ITEM.btcSegWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem =
          networkDerivationsInstances.mainnet.btcNativeSegWit.deriveItemFromMnemonic({
            derivationPath: MAINNET_ITEM.btcNativeSegWit.derivationPath,
          });

        expect(MAINNET_ITEM.btcNativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.btcTaproot.deriveItemFromMnemonic({
          derivationPath: MAINNET_ITEM.btcTaproot.derivationPath,
        });

        expect(MAINNET_ITEM.btcTaproot).toEqual(derivedItem);
      });

      it("Derives correct p2wsh (1-of-1 multisig) item", () => {
        const derivedItem = networkDerivationsInstances.mainnet.btcP2wsh.deriveItemFromMnemonic({
          derivationPath: MAINNET_ITEM.btcP2wsh.derivationPath,
        });

        expect(MAINNET_ITEM.btcP2wsh).toEqual(derivedItem);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
        const derivedItem =
          networkDerivationsInstances.mainnet.btcP2wshInP2sh.deriveItemFromMnemonic({
            derivationPath: MAINNET_ITEM.btcP2wshInP2sh.derivationPath,
          });

        expect(MAINNET_ITEM.btcP2wshInP2sh).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networkDerivationsInstances.mainnet.btcLegacy.getCredentialFromPK({
          privateKey: MAINNET_CREDENTIAL.btcLegacy.privateKey,
        });

        expect(credential).toEqual(MAINNET_CREDENTIAL.btcLegacy);
      });

      it("Derives correct segWit credential", () => {
        const credential = networkDerivationsInstances.mainnet.btcSegWit.getCredentialFromPK({
          privateKey: MAINNET_CREDENTIAL.btcSegWit.privateKey,
        });

        expect(credential).toEqual(MAINNET_CREDENTIAL.btcSegWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networkDerivationsInstances.mainnet.btcNativeSegWit.getCredentialFromPK({
          privateKey: MAINNET_CREDENTIAL.btcNativeSegWit.privateKey,
        });

        expect(credential).toEqual(MAINNET_CREDENTIAL.btcNativeSegWit);
      });

      it("Derives correct taproot credential", () => {
        const credential = networkDerivationsInstances.mainnet.btcTaproot.getCredentialFromPK({
          privateKey: MAINNET_CREDENTIAL.btcTaproot.privateKey,
        });

        expect(credential).toEqual(MAINNET_CREDENTIAL.btcTaproot);
      });

      it("Derives correct p2wsh (1-of-1 multisig) credential", () => {
        const credential = networkDerivationsInstances.mainnet.btcP2wsh.getCredentialFromPK({
          privateKey: MAINNET_CREDENTIAL.btcP2wsh.privateKey,
        });

        expect(credential).toEqual(MAINNET_CREDENTIAL.btcP2wsh);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) credential", () => {
        const credential = networkDerivationsInstances.mainnet.btcP2wshInP2sh.getCredentialFromPK({
          privateKey: MAINNET_CREDENTIAL.btcP2wshInP2sh.privateKey,
        });

        expect(credential).toEqual(MAINNET_CREDENTIAL.btcP2wshInP2sh);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networkDerivationsInstances.mainnet.btcLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.mainnet.btcLegacy,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MAINNET_ITEM.btcLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct segWit items batch", () => {
        const items = networkDerivationsInstances.mainnet.btcSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.mainnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MAINNET_ITEM.btcSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items =
          networkDerivationsInstances.mainnet.btcNativeSegWit.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.mainnet.btcNativeSegWit,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MAINNET_ITEM.btcNativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct taproot items batch", () => {
        const items = networkDerivationsInstances.mainnet.btcTaproot.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.mainnet.btcTaproot,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MAINNET_ITEM.btcTaproot);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh (1-of-1 multisig) items batch", () => {
        const items = networkDerivationsInstances.mainnet.btcP2wsh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.mainnet.btcP2wsh,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MAINNET_ITEM.btcP2wsh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) items batch", () => {
        const items =
          networkDerivationsInstances.mainnet.btcP2wshInP2sh.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.mainnet.btcP2wshInP2sh,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MAINNET_ITEM.btcP2wshInP2sh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networkDerivationsInstances.mainnet.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MAINNET_CREDENTIAL.btcLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networkDerivationsInstances.mainnet.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MAINNET_CREDENTIAL.btcSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.mainnet.btcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.mainnet.btcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MAINNET_CREDENTIAL.btcNativeSegWit.privateKey,
            });

          expect(isNative).toBe(true);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networkDerivationsInstances.mainnet.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MAINNET_CREDENTIAL.btcTaproot.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networkDerivationsInstances.mainnet.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MAINNET_CREDENTIAL.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative =
            networkDerivationsInstances.mainnet.btcP2wshInP2sh.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.mainnet.btcP2wshInP2sh.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MAINNET_CREDENTIAL.btcP2wshInP2sh.privateKey,
            });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networkDerivationsInstances.mainnet.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MAINNET_EXTRINSIC_PRIVATE_KEY.btcLegacy.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for segWit private key", () => {
          const isNative = networkDerivationsInstances.mainnet.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MAINNET_EXTRINSIC_PRIVATE_KEY.btcSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.mainnet.btcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.mainnet.btcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MAINNET_EXTRINSIC_PRIVATE_KEY.btcNativeSegWit.privateKey,
            });

          expect(isNative).toBe(false);
        });

        it("Returns false for taproot private key", () => {
          const isNative = networkDerivationsInstances.mainnet.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MAINNET_EXTRINSIC_PRIVATE_KEY.btcTaproot.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networkDerivationsInstances.mainnet.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MAINNET_EXTRINSIC_PRIVATE_KEY.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for p2wsh (1-of-1 multisig) private key", () => {
          const isNative =
            networkDerivationsInstances.mainnet.btcP2wshInP2sh.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.mainnet.btcP2wshInP2sh.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: MAINNET_EXTRINSIC_PRIVATE_KEY.btcP2wshInP2sh.privateKey,
            });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networkDerivationsInstances.testnet.btcLegacy.deriveItemFromMnemonic({
          derivationPath: TESTNET_ITEM.btcLegacy.derivationPath,
        });

        expect(TESTNET_ITEM.btcLegacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = networkDerivationsInstances.testnet.btcSegWit.deriveItemFromMnemonic({
          derivationPath: TESTNET_ITEM.btcSegWit.derivationPath,
        });

        expect(TESTNET_ITEM.btcSegWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem =
          networkDerivationsInstances.testnet.btcNativeSegWit.deriveItemFromMnemonic({
            derivationPath: TESTNET_ITEM.btcNativeSegWit.derivationPath,
          });

        expect(TESTNET_ITEM.btcNativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = networkDerivationsInstances.testnet.btcTaproot.deriveItemFromMnemonic({
          derivationPath: TESTNET_ITEM.btcTaproot.derivationPath,
        });

        expect(TESTNET_ITEM.btcTaproot).toEqual(derivedItem);
      });

      it("Derives correct p2wsh (1-of-1 multisig) item", () => {
        const derivedItem = networkDerivationsInstances.testnet.btcP2wsh.deriveItemFromMnemonic({
          derivationPath: TESTNET_ITEM.btcP2wsh.derivationPath,
        });

        expect(TESTNET_ITEM.btcP2wsh).toEqual(derivedItem);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
        const derivedItem =
          networkDerivationsInstances.testnet.btcP2wshInP2sh.deriveItemFromMnemonic({
            derivationPath: TESTNET_ITEM.btcP2wshInP2sh.derivationPath,
          });

        expect(TESTNET_ITEM.btcP2wshInP2sh).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networkDerivationsInstances.testnet.btcLegacy.getCredentialFromPK({
          privateKey: TESTNET_CREDENTIAL.btcLegacy.privateKey,
        });

        expect(credential).toEqual(TESTNET_CREDENTIAL.btcLegacy);
      });

      it("Derives correct segWit credential", () => {
        const credential = networkDerivationsInstances.testnet.btcSegWit.getCredentialFromPK({
          privateKey: TESTNET_CREDENTIAL.btcSegWit.privateKey,
        });

        expect(credential).toEqual(TESTNET_CREDENTIAL.btcSegWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networkDerivationsInstances.testnet.btcNativeSegWit.getCredentialFromPK({
          privateKey: TESTNET_CREDENTIAL.btcNativeSegWit.privateKey,
        });

        expect(credential).toEqual(TESTNET_CREDENTIAL.btcNativeSegWit);
      });

      it("Derives correct taproot credential", () => {
        const credential = networkDerivationsInstances.testnet.btcTaproot.getCredentialFromPK({
          privateKey: TESTNET_CREDENTIAL.btcTaproot.privateKey,
        });

        expect(credential).toEqual(TESTNET_CREDENTIAL.btcTaproot);
      });

      it("Derives correct p2wsh (1-of-1 multisig) credential", () => {
        const credential = networkDerivationsInstances.testnet.btcP2wsh.getCredentialFromPK({
          privateKey: TESTNET_CREDENTIAL.btcP2wsh.privateKey,
        });

        expect(credential).toEqual(TESTNET_CREDENTIAL.btcP2wsh);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) credential", () => {
        const credential = networkDerivationsInstances.testnet.btcP2wshInP2sh.getCredentialFromPK({
          privateKey: TESTNET_CREDENTIAL.btcP2wshInP2sh.privateKey,
        });

        expect(credential).toEqual(TESTNET_CREDENTIAL.btcP2wshInP2sh);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networkDerivationsInstances.testnet.btcLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcLegacy,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_ITEM.btcLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct segWit items batch", () => {
        const items = networkDerivationsInstances.testnet.btcSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_ITEM.btcSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items =
          networkDerivationsInstances.testnet.btcNativeSegWit.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcNativeSegWit,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_ITEM.btcNativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct taproot items batch", () => {
        const items = networkDerivationsInstances.testnet.btcTaproot.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcTaproot,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_ITEM.btcTaproot);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh (1-of-1 multisig) items batch", () => {
        const items = networkDerivationsInstances.testnet.btcP2wsh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcP2wsh,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_ITEM.btcP2wsh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) items batch", () => {
        const items =
          networkDerivationsInstances.testnet.btcP2wshInP2sh.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcP2wshInP2sh,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(TESTNET_ITEM.btcP2wshInP2sh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networkDerivationsInstances.testnet.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_CREDENTIAL.btcLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networkDerivationsInstances.testnet.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_CREDENTIAL.btcSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.testnet.btcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.testnet.btcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_CREDENTIAL.btcNativeSegWit.privateKey,
            });

          expect(isNative).toBe(true);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networkDerivationsInstances.testnet.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_CREDENTIAL.btcTaproot.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networkDerivationsInstances.testnet.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_CREDENTIAL.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative =
            networkDerivationsInstances.testnet.btcP2wshInP2sh.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.testnet.btcP2wshInP2sh.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_CREDENTIAL.btcP2wshInP2sh.privateKey,
            });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networkDerivationsInstances.testnet.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcLegacy.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for segWit private key", () => {
          const isNative = networkDerivationsInstances.testnet.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.testnet.btcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.testnet.btcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcNativeSegWit.privateKey,
            });

          expect(isNative).toBe(false);
        });

        it("Returns false for taproot private key", () => {
          const isNative = networkDerivationsInstances.testnet.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcTaproot.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networkDerivationsInstances.testnet.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for p2wsh (1-of-1 multisig) private key", () => {
          const isNative =
            networkDerivationsInstances.testnet.btcP2wshInP2sh.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.testnet.btcP2wshInP2sh.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcP2wshInP2sh.privateKey,
            });

          expect(isNative).toBe(false);
        });
      });
    });
  });

  describe("regtest", () => {
    describe("deriveItemFromMnemonic", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = networkDerivationsInstances.regtest.btcLegacy.deriveItemFromMnemonic({
          derivationPath: REGTEST_ITEM.btcLegacy.derivationPath,
        });

        expect(REGTEST_ITEM.btcLegacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = networkDerivationsInstances.regtest.btcSegWit.deriveItemFromMnemonic({
          derivationPath: REGTEST_ITEM.btcSegWit.derivationPath,
        });

        expect(REGTEST_ITEM.btcSegWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem =
          networkDerivationsInstances.regtest.btcNativeSegWit.deriveItemFromMnemonic({
            derivationPath: REGTEST_ITEM.btcNativeSegWit.derivationPath,
          });

        expect(REGTEST_ITEM.btcNativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = networkDerivationsInstances.regtest.btcTaproot.deriveItemFromMnemonic({
          derivationPath: REGTEST_ITEM.btcTaproot.derivationPath,
        });

        expect(REGTEST_ITEM.btcTaproot).toEqual(derivedItem);
      });

      it("Derives correct p2wsh (1-of-1 multisig) item", () => {
        const derivedItem = networkDerivationsInstances.regtest.btcP2wsh.deriveItemFromMnemonic({
          derivationPath: REGTEST_ITEM.btcP2wsh.derivationPath,
        });

        expect(REGTEST_ITEM.btcP2wsh).toEqual(derivedItem);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
        const derivedItem =
          networkDerivationsInstances.regtest.btcP2wshInP2sh.deriveItemFromMnemonic({
            derivationPath: REGTEST_ITEM.btcP2wshInP2sh.derivationPath,
          });

        expect(REGTEST_ITEM.btcP2wshInP2sh).toEqual(derivedItem);
      });
    });

    describe("getCredentialFromPK", () => {
      it("Derives correct legacy credential", () => {
        const credential = networkDerivationsInstances.regtest.btcLegacy.getCredentialFromPK({
          privateKey: REGTEST_CREDENTIAL.btcLegacy.privateKey,
        });

        expect(credential).toEqual(REGTEST_CREDENTIAL.btcLegacy);
      });

      it("Derives correct segWit credential", () => {
        const credential = networkDerivationsInstances.regtest.btcSegWit.getCredentialFromPK({
          privateKey: REGTEST_CREDENTIAL.btcSegWit.privateKey,
        });

        expect(credential).toEqual(REGTEST_CREDENTIAL.btcSegWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networkDerivationsInstances.regtest.btcNativeSegWit.getCredentialFromPK({
          privateKey: REGTEST_CREDENTIAL.btcNativeSegWit.privateKey,
        });

        expect(credential).toEqual(REGTEST_CREDENTIAL.btcNativeSegWit);
      });

      it("Derives correct taproot credential", () => {
        const credential = networkDerivationsInstances.regtest.btcTaproot.getCredentialFromPK({
          privateKey: REGTEST_CREDENTIAL.btcTaproot.privateKey,
        });

        expect(credential).toEqual(REGTEST_CREDENTIAL.btcTaproot);
      });

      it("Derives correct p2wsh (1-of-1 multisig) credential", () => {
        const credential = networkDerivationsInstances.regtest.btcP2wsh.getCredentialFromPK({
          privateKey: REGTEST_CREDENTIAL.btcP2wsh.privateKey,
        });

        expect(credential).toEqual(REGTEST_CREDENTIAL.btcP2wsh);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) credential", () => {
        const credential = networkDerivationsInstances.regtest.btcP2wshInP2sh.getCredentialFromPK({
          privateKey: REGTEST_CREDENTIAL.btcP2wshInP2sh.privateKey,
        });

        expect(credential).toEqual(REGTEST_CREDENTIAL.btcP2wshInP2sh);
      });
    });

    describe("deriveItemsBatchFromMnemonic", () => {
      it("Derives correct legacy items batch", () => {
        const items = networkDerivationsInstances.regtest.btcLegacy.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcLegacy,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(REGTEST_ITEM.btcLegacy);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct segWit items batch", () => {
        const items = networkDerivationsInstances.regtest.btcSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(REGTEST_ITEM.btcSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items =
          networkDerivationsInstances.regtest.btcNativeSegWit.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcNativeSegWit,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(REGTEST_ITEM.btcNativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct taproot items batch", () => {
        const items = networkDerivationsInstances.regtest.btcTaproot.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcTaproot,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(REGTEST_ITEM.btcTaproot);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh (1-of-1 multisig) items batch", () => {
        const items = networkDerivationsInstances.regtest.btcP2wsh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcP2wsh,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(REGTEST_ITEM.btcP2wsh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) items batch", () => {
        const items =
          networkDerivationsInstances.regtest.btcP2wshInP2sh.deriveItemsBatchFromMnemonic({
            derivationPathPrefix: DERIVATION_PATH_BATCH_PREFIX.testnet.btcP2wshInP2sh,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
          });

        expect(items[FIRST_ITEM_INDEX]).toEqual(REGTEST_ITEM.btcP2wshInP2sh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });
    });

    describe("doesPKBelongToMnemonic", () => {
      describe("Validates native private key correctly", () => {
        it("Returns true for legacy private key", () => {
          const isNative = networkDerivationsInstances.regtest.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: REGTEST_CREDENTIAL.btcLegacy.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for segWit private key", () => {
          const isNative = networkDerivationsInstances.regtest.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: REGTEST_CREDENTIAL.btcSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.regtest.btcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.regtest.btcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: REGTEST_CREDENTIAL.btcNativeSegWit.privateKey,
            });

          expect(isNative).toBe(true);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networkDerivationsInstances.regtest.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: REGTEST_CREDENTIAL.btcTaproot.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networkDerivationsInstances.regtest.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: REGTEST_CREDENTIAL.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative =
            networkDerivationsInstances.regtest.btcP2wshInP2sh.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.regtest.btcP2wshInP2sh.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: REGTEST_CREDENTIAL.btcP2wshInP2sh.privateKey,
            });

          expect(isNative).toBe(true);
        });
      });

      describe("Validates extrinsic private key correctly", () => {
        it("Returns false for legacy private key", () => {
          const isNative = networkDerivationsInstances.regtest.btcLegacy.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcLegacy.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcLegacy.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for segWit private key", () => {
          const isNative = networkDerivationsInstances.regtest.btcSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for native segWit private key", () => {
          const isNative =
            networkDerivationsInstances.regtest.btcNativeSegWit.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.regtest.btcNativeSegWit.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcNativeSegWit.privateKey,
            });

          expect(isNative).toBe(false);
        });

        it("Returns false for taproot private key", () => {
          const isNative = networkDerivationsInstances.regtest.btcTaproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcTaproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcTaproot.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networkDerivationsInstances.regtest.btcP2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.btcP2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcP2wsh.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns false for p2wsh (1-of-1 multisig) private key", () => {
          const isNative =
            networkDerivationsInstances.regtest.btcP2wshInP2sh.doesPKBelongToMnemonic({
              derivationPathPrefix: btcConfig.regtest.btcP2wshInP2sh.derivationPathPrefix,
              indexLookupFrom: INDEX_LOOKUP_FROM,
              indexLookupTo: INDEX_LOOKUP_TO,
              privateKey: TESTNET_EXTRINSIC_PRIVATE_KEY.btcP2wshInP2sh.privateKey,
            });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
