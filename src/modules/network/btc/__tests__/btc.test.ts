import type { BtcDerivationTypeUnion } from "@/libs/types/index.js";
import { getNetwork } from "../../get-network/index.js";
import { btcConfig } from "../../libs/modules/config/index.js";
import type { CommonNetworkPurposeRegTestExtendedUnion } from "../../libs/types/index.js";
import { Btc } from "../btc.network.js";
import { describe, it, expect } from "vitest";
import { FIRST_ITEM_INDEX, INDEX_LOOKUP_FROM, INDEX_LOOKUP_TO } from "../../constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = {
  mainnet: {
    btcLegacy: "m/44'/0'/0'/0/0",
    segWit: "m/49'/0'/0'/0/0",
    nativeSegWit: "m/84'/0'/0'/0/0",
    taproot: "m/86'/0'/0'/0/0",
  },
  testnet: {
    btcLegacy: "m/44'/1'/0'/0/0",
    segWit: "m/49'/1'/0'/0/0",
    nativeSegWit: "m/84'/1'/0'/0/0",
    taproot: "m/86'/1'/0'/0/0",
  },
};

const MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX = {
  mainnet: {
    btcLegacy: "m/44'/0'/0'/0",
    segWit: "m/49'/0'/0'/0",
    nativeSegWit: "m/84'/0'/0'/0",
    taproot: "m/86'/0'/0'/0",
  },
  testnet: {
    btcLegacy: "m/44'/1'/0'/0",
    segWit: "m/49'/1'/0'/0",
    nativeSegWit: "m/84'/1'/0'/0",
    taproot: "m/86'/1'/0'/0",
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
  segWit: {
    ...MOCK_COMMON_MAINNET_SEG_WIT_CREDENTIAL,
    address: "3QZgY2mGE3ugcjjjq956v4JsbFVjr6xCd9",
  },
  nativeSegWit: {
    privateKey: "L4VQdCsiDczvSBSAro7GvS41qkFdMAy8htNF5Zcx6g4ip5C88DKC",
    publicKey: "02326c7f6b115952cf752f27bfbedcebfa93f6b3f460aac780e76be12d805a9d04",
    address: "bc1qzccrsckwsr7t76sz54kjwmhkxyts94e573hpd8",
  },
  taproot: {
    privateKey: "L4obzibVhVrw5V2hCUQAiipuXBw5X8W1bdR3WzTZUgafDLmeUzzR",
    publicKey: "eb2c29de66f2581f95f881847492bab0a9e9000856202bf1f10d537f6eeacfe5",
    address: "bc1pqlgwhczvyfftzu8kjwkmyxay4xd2qghmazwqty8dtw5sempknd2qhkag2t",
  },
  p2wsh: {
    ...MOCK_COMMON_MAINNET_SEG_WIT_CREDENTIAL,
    address: "bc1q6vdym5mjce2jc00qv03eu7t0g7cprr5kye6xcvvw5xs2uf250nns3r3sn6",
  },
  p2wshInP2sh: {
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
  segWit: { privateKey: MOCK_COMMON_MAINNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY },
  nativeSegWit: {
    privateKey: "L1kBHe9oFPGGTtgXBhbSogi1gryYBqGkJKvHcyzZaVBy7gjfdMKP",
  },
  taproot: {
    privateKey: "L5ddnhKfVpkZGoS5aygVCHU6xYQGDAwhoUSiew1QCmbtMhEnmhf8",
  },
  p2wsh: {
    privateKey: MOCK_COMMON_MAINNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY,
  },
  p2wshInP2sh: { privateKey: MOCK_COMMON_MAINNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY },
};

const MOCK_MAINNET_ITEM = {
  btcLegacy: {
    ...MOCK_MAINNET_CREDENTIAL.btcLegacy,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.btcLegacy,
  },
  segWit: {
    ...MOCK_MAINNET_CREDENTIAL.segWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.segWit,
  },
  nativeSegWit: {
    ...MOCK_MAINNET_CREDENTIAL.nativeSegWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.nativeSegWit,
  },
  taproot: {
    ...MOCK_MAINNET_CREDENTIAL.taproot,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.taproot,
  },
  p2wsh: {
    ...MOCK_MAINNET_CREDENTIAL.p2wsh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.segWit,
  },
  p2wshInP2sh: {
    ...MOCK_MAINNET_CREDENTIAL.p2wshInP2sh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.mainnet.segWit,
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
  segWit: {
    ...MOCK_COMMON_TESTNET_SEG_WIT_CREDENTIAL,
    address: "2NDrscWiWSvuxUmQp3stwgauM7PLXyA5Jba",
  },
  nativeSegWit: {
    address: "tb1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlwsvuf7",
    privateKey: "cU7MwjFKfWjDPkaKhEJmsbG6DwPjSZs6WLY4BYXiSzeGRnd232i3",
    publicKey: "03d5f0a7cc993f8a296111637c6dd2d80ab917ebeedcb6ed30a600cef49a4d63a1",
  },
  taproot: {
    address: "tb1p0q0ya6q34wml2h2katjm8486f27czctx7vghcvh08pmvhu9zdvlq7ne7zu",
    privateKey: "cPQEyhkUdfSCTZfEcWsFm5JLBo2ysAvsTzsYJ9Vv1mYTJmSZAj8A",
    publicKey: "5b0e1610c136eaa57159acd0bd602278b5de45f9664691b9c39ed244a4d46dd7",
  },
  p2wsh: {
    ...MOCK_COMMON_TESTNET_SEG_WIT_CREDENTIAL,
    address: "tb1qaan4la2jzw7ww7f8f2uqrmcyyfyfqcmlxvn7r2dtc4gfhy2gl7fseyq9wd",
  },
  p2wshInP2sh: {
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
  segWit: { privateKey: MOCK_COMMON_TESTNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY },
  nativeSegWit: {
    privateKey: "cS7AkZ9egSxXdL9na7QaB1D5K6GwrHNSNN4kjQT55bqyNRqoMJ1E",
  },
  taproot: {
    privateKey: "cVzdFcKWvtSpSEuLyPVcZbyAamhfsd3PsWbBmMTuhtFtcSKDSKN1",
  },
  p2wsh: {
    privateKey: MOCK_COMMON_TESTNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY,
  },
  p2wshInP2sh: { privateKey: MOCK_COMMON_TESTNET_EXTRINSIC_SEG_WIT_PRIVATE_KEY },
};

const MOCK_TESTNET_ITEM = {
  btcLegacy: {
    ...MOCK_TESTNET_CREDENTIAL.btcLegacy,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcLegacy,
  },
  segWit: {
    ...MOCK_TESTNET_CREDENTIAL.segWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.segWit,
  },
  nativeSegWit: {
    ...MOCK_TESTNET_CREDENTIAL.nativeSegWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.nativeSegWit,
  },
  taproot: {
    ...MOCK_TESTNET_CREDENTIAL.taproot,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.taproot,
  },
  p2wsh: {
    ...MOCK_TESTNET_CREDENTIAL.p2wsh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.segWit,
  },
  p2wshInP2sh: {
    ...MOCK_TESTNET_CREDENTIAL.p2wshInP2sh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.segWit,
  },
};

const MOCK_REGTEST_CREDENTIAL = {
  btcLegacy: {
    ...MOCK_TESTNET_CREDENTIAL.btcLegacy,
  },
  segWit: {
    ...MOCK_TESTNET_CREDENTIAL.segWit,
  },
  nativeSegWit: {
    ...MOCK_TESTNET_CREDENTIAL.nativeSegWit,
    address: "bcrt1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlve437h",
  },
  taproot: {
    ...MOCK_TESTNET_CREDENTIAL.taproot,
    address: "bcrt1p0q0ya6q34wml2h2katjm8486f27czctx7vghcvh08pmvhu9zdvlqn2nchx",
  },
  p2wsh: {
    ...MOCK_TESTNET_CREDENTIAL.p2wsh,
    address: "bcrt1qaan4la2jzw7ww7f8f2uqrmcyyfyfqcmlxvn7r2dtc4gfhy2gl7fs5a2rmh",
  },
  p2wshInP2sh: {
    ...MOCK_TESTNET_CREDENTIAL.p2wshInP2sh,
  },
};

const MOCK_REGTEST_ITEM = {
  btcLegacy: {
    ...MOCK_REGTEST_CREDENTIAL.btcLegacy,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.btcLegacy,
  },
  segWit: {
    ...MOCK_REGTEST_CREDENTIAL.segWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.segWit,
  },
  nativeSegWit: {
    ...MOCK_REGTEST_CREDENTIAL.nativeSegWit,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.nativeSegWit,
  },
  taproot: {
    ...MOCK_REGTEST_CREDENTIAL.taproot,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.taproot,
  },
  p2wsh: {
    ...MOCK_REGTEST_CREDENTIAL.p2wsh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.segWit,
  },
  p2wshInP2sh: {
    ...MOCK_REGTEST_CREDENTIAL.p2wshInP2sh,
    derivationPath: MOCK_COMMON_DERIVATION_PATH.testnet.segWit,
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
    "segWit",
    "nativeSegWit",
    "taproot",
    "p2wsh",
    "p2wshInP2sh",
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
        const derivedItem = networksDerivations.mainnet.segWit.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.segWit.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.segWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem = networksDerivations.mainnet.nativeSegWit.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.nativeSegWit.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.nativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = networksDerivations.mainnet.taproot.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.taproot.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.taproot).toEqual(derivedItem);
      });

      it("Derives correct p2wsh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.mainnet.p2wsh.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.p2wsh.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.p2wsh).toEqual(derivedItem);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.mainnet.p2wshInP2sh.deriveItemFromMnemonic({
          derivationPath: MOCK_MAINNET_ITEM.p2wshInP2sh.derivationPath,
        });

        expect(MOCK_MAINNET_ITEM.p2wshInP2sh).toEqual(derivedItem);
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
        const credential = networksDerivations.mainnet.segWit.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.segWit.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.segWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networksDerivations.mainnet.nativeSegWit.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.nativeSegWit.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.nativeSegWit);
      });

      it("Derives correct taproot credential", () => {
        const credential = networksDerivations.mainnet.taproot.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.taproot.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.taproot);
      });

      it("Derives correct p2wsh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.mainnet.p2wsh.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.p2wsh.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.p2wsh);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.mainnet.p2wshInP2sh.getCredentialFromPK({
          privateKey: MOCK_MAINNET_CREDENTIAL.p2wshInP2sh.privateKey,
        });

        expect(credential).toEqual(MOCK_MAINNET_CREDENTIAL.p2wshInP2sh);
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
        const items = networksDerivations.mainnet.segWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet.segWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.segWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items = networksDerivations.mainnet.nativeSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet.nativeSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.nativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct taproot items batch", () => {
        const items = networksDerivations.mainnet.taproot.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet.taproot,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.taproot);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.mainnet.p2wsh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet.segWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.p2wsh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.mainnet.p2wshInP2sh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.mainnet.segWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_MAINNET_ITEM.p2wshInP2sh);
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
          const isNative = networksDerivations.mainnet.segWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.segWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.segWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.mainnet.nativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.nativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.nativeSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.mainnet.taproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.taproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.taproot.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.mainnet.p2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.p2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.p2wsh.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.mainnet.p2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.p2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_CREDENTIAL.p2wshInP2sh.privateKey,
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
          const isNative = networksDerivations.mainnet.segWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.segWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.segWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.mainnet.nativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.nativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.nativeSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.mainnet.taproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.taproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.taproot.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.mainnet.p2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.p2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.p2wsh.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.mainnet.p2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.mainnet.p2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_MAINNET_EXTRINSIC_PRIVATE_KEY.p2wshInP2sh.privateKey,
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
        const derivedItem = networksDerivations.testnet.segWit.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.segWit.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.segWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem = networksDerivations.testnet.nativeSegWit.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.nativeSegWit.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.nativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = networksDerivations.testnet.taproot.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.taproot.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.taproot).toEqual(derivedItem);
      });

      it("Derives correct p2wsh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.testnet.p2wsh.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.p2wsh.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.p2wsh).toEqual(derivedItem);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.testnet.p2wshInP2sh.deriveItemFromMnemonic({
          derivationPath: MOCK_TESTNET_ITEM.p2wshInP2sh.derivationPath,
        });

        expect(MOCK_TESTNET_ITEM.p2wshInP2sh).toEqual(derivedItem);
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
        const credential = networksDerivations.testnet.segWit.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.segWit.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.segWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networksDerivations.testnet.nativeSegWit.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.nativeSegWit.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.nativeSegWit);
      });

      it("Derives correct taproot credential", () => {
        const credential = networksDerivations.testnet.taproot.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.taproot.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.taproot);
      });

      it("Derives correct p2wsh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.testnet.p2wsh.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.p2wsh.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.p2wsh);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.testnet.p2wshInP2sh.getCredentialFromPK({
          privateKey: MOCK_TESTNET_CREDENTIAL.p2wshInP2sh.privateKey,
        });

        expect(credential).toEqual(MOCK_TESTNET_CREDENTIAL.p2wshInP2sh);
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
        const items = networksDerivations.testnet.segWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.segWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.segWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items = networksDerivations.testnet.nativeSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.nativeSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.nativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct taproot items batch", () => {
        const items = networksDerivations.testnet.taproot.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.taproot,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.taproot);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.testnet.p2wsh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.segWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.p2wsh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.testnet.p2wshInP2sh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.segWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_TESTNET_ITEM.p2wshInP2sh);
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
          const isNative = networksDerivations.testnet.segWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.segWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.segWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.testnet.nativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.nativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.nativeSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.testnet.taproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.taproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.taproot.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.testnet.p2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.p2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.p2wsh.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.testnet.p2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.p2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_CREDENTIAL.p2wshInP2sh.privateKey,
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
          const isNative = networksDerivations.testnet.segWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.segWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.segWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.testnet.nativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.nativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.nativeSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.testnet.taproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.taproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.taproot.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.testnet.p2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.p2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.p2wsh.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.testnet.p2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.testnet.p2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.p2wshInP2sh.privateKey,
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
        const derivedItem = networksDerivations.regtest.segWit.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.segWit.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.segWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem = networksDerivations.regtest.nativeSegWit.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.nativeSegWit.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.nativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = networksDerivations.regtest.taproot.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.taproot.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.taproot).toEqual(derivedItem);
      });

      it("Derives correct p2wsh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.regtest.p2wsh.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.p2wsh.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.p2wsh).toEqual(derivedItem);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) item", () => {
        const derivedItem = networksDerivations.regtest.p2wshInP2sh.deriveItemFromMnemonic({
          derivationPath: MOCK_REGTEST_ITEM.p2wshInP2sh.derivationPath,
        });

        expect(MOCK_REGTEST_ITEM.p2wshInP2sh).toEqual(derivedItem);
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
        const credential = networksDerivations.regtest.segWit.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.segWit.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.segWit);
      });

      it("Derives correct native segWit credential", () => {
        const credential = networksDerivations.regtest.nativeSegWit.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.nativeSegWit.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.nativeSegWit);
      });

      it("Derives correct taproot credential", () => {
        const credential = networksDerivations.regtest.taproot.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.taproot.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.taproot);
      });

      it("Derives correct p2wsh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.regtest.p2wsh.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.p2wsh.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.p2wsh);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) credential", () => {
        const credential = networksDerivations.regtest.p2wshInP2sh.getCredentialFromPK({
          privateKey: MOCK_REGTEST_CREDENTIAL.p2wshInP2sh.privateKey,
        });

        expect(credential).toEqual(MOCK_REGTEST_CREDENTIAL.p2wshInP2sh);
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
        const items = networksDerivations.regtest.segWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.segWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.segWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct native segWit items batch", () => {
        const items = networksDerivations.regtest.nativeSegWit.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.nativeSegWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.nativeSegWit);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct taproot items batch", () => {
        const items = networksDerivations.regtest.taproot.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.taproot,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.taproot);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.regtest.p2wsh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.segWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.p2wsh);
        expect(items.length).toBe(INDEX_LOOKUP_TO);
      });

      it("Derives correct p2wsh in p2sh (1-of-1 multisig) items batch", () => {
        const items = networksDerivations.regtest.p2wshInP2sh.deriveItemsBatchFromMnemonic({
          derivationPathPrefix: MOCK_COMMON_DERIVATION_PATH_BATCH_PREFIX.testnet.segWit,
          indexLookupFrom: INDEX_LOOKUP_FROM,
          indexLookupTo: INDEX_LOOKUP_TO,
        });

        expect(items[FIRST_ITEM_INDEX]).toEqual(MOCK_REGTEST_ITEM.p2wshInP2sh);
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
          const isNative = networksDerivations.regtest.segWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.segWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.segWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.regtest.nativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.nativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.nativeSegWit.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.regtest.taproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.taproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.taproot.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.regtest.p2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.p2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.p2wsh.privateKey,
          });

          expect(isNative).toBe(true);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.regtest.p2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.p2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_REGTEST_CREDENTIAL.p2wshInP2sh.privateKey,
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
          const isNative = networksDerivations.regtest.segWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.segWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.segWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for native segWit private key", () => {
          const isNative = networksDerivations.regtest.nativeSegWit.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.nativeSegWit.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.nativeSegWit.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for taproot private key", () => {
          const isNative = networksDerivations.regtest.taproot.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.taproot.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.taproot.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.regtest.p2wsh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.p2wsh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.p2wsh.privateKey,
          });

          expect(isNative).toBe(false);
        });

        it("Returns true for p2wsh (1-of-1 multisig) private key", () => {
          const isNative = networksDerivations.regtest.p2wshInP2sh.doesPKBelongToMnemonic({
            derivationPathPrefix: btcConfig.regtest.p2wshInP2sh.derivationPathPrefix,
            indexLookupFrom: INDEX_LOOKUP_FROM,
            indexLookupTo: INDEX_LOOKUP_TO,
            privateKey: MOCK_TESTNET_EXTRINSIC_PRIVATE_KEY.p2wshInP2sh.privateKey,
          });

          expect(isNative).toBe(false);
        });
      });
    });
  });
});
