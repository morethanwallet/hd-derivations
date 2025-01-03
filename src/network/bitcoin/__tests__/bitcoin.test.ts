import { Mnemonic } from "@/mnemonic/index.js";
import { Bitcoin } from "../index.js";
import { describe, it, expect } from "vitest";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  legacy: {
    mnemonic: MNEMONIC,
    address: "176d1FZHP88mMFoyaTA2sZ5UA19CY33Phn",
    privateKey: "L3hhRruT6ZGHKutu49Spfq68zHuhGDm8b7ahr4bcLD2AbTJWBJnr",
    publicKey: "03d3f020b78cc3c5b0e7bb49ef8e13d9718ef223b34819fb4c5c35ddec76bc90c0",
    path: "m/44'/0'/0'/0/0",
  },
  segWit: {
    mnemonic: MNEMONIC,
    address: "3QZgY2mGE3ugcjjjq956v4JsbFVjr6xCd9",
    privateKey: "KzJPKD7B7wezTn9QZvHAGSH2CXvdhmcurq3WoEvsgPpBwzitdC81",
    publicKey: "0317e1f9c3fd3d6d630cf1f1f4ec442cb9a93ff8c076ab71bcad5bb7ed8d17348c",
    path: "m/49'/0'/0'/0/0",
  },
  nativeSegWit: {
    mnemonic: MNEMONIC,
    address: "bc1qzccrsckwsr7t76sz54kjwmhkxyts94e573hpd8",
    privateKey: "L4VQdCsiDczvSBSAro7GvS41qkFdMAy8htNF5Zcx6g4ip5C88DKC",
    publicKey: "02326c7f6b115952cf752f27bfbedcebfa93f6b3f460aac780e76be12d805a9d04",
    path: "m/84'/0'/0'/0/0",
  },
  taproot: {
    mnemonic: MNEMONIC,
    address: "bc1pqlgwhczvyfftzu8kjwkmyxay4xd2qghmazwqty8dtw5sempknd2qhkag2t",
    privateKey: "L4obzibVhVrw5V2hCUQAiipuXBw5X8W1bdR3WzTZUgafDLmeUzzR",
    publicKey: "eb2c29de66f2581f95f881847492bab0a9e9000856202bf1f10d537f6eeacfe5",
    path: "m/86'/0'/0'/0/0",
  },
  p2wsh: {
    mnemonic: MNEMONIC,
    address: "bc1q6vdym5mjce2jc00qv03eu7t0g7cprr5kye6xcvvw5xs2uf250nns3r3sn6",
    privateKey: "KzJPKD7B7wezTn9QZvHAGSH2CXvdhmcurq3WoEvsgPpBwzitdC81",
    publicKey: "0317e1f9c3fd3d6d630cf1f1f4ec442cb9a93ff8c076ab71bcad5bb7ed8d17348c",
    path: "m/49'/0'/0'/0/0",
  },
  p2wshInP2sh: {
    mnemonic: MNEMONIC,
    address: "3HRjXgMDRKK8rn9wfVFad28jyHT82KPfo3",
    privateKey: "KzJPKD7B7wezTn9QZvHAGSH2CXvdhmcurq3WoEvsgPpBwzitdC81",
    publicKey: "0317e1f9c3fd3d6d630cf1f1f4ec442cb9a93ff8c076ab71bcad5bb7ed8d17348c",
    path: "m/49'/0'/0'/0/0",
  },
};

const MOCK_COMMON_TESTNET_ADDRESS_DATA = {
  legacy: {
    mnemonic: MNEMONIC,
    address: "mk2hF1aSuKkBZtCUM9jDfjgFLE5gGJ8U8c",
    privateKey: "cQEPGT34NWGzWnW1JE3d5GKaBcEQJqUsDdxH2jXD97CkXaAaXHEn",
    publicKey: "02d76e63231c59c216550ef886d362d58ba96ee30eb56caa99f5cdaf651b9a9a6e",
    path: "m/44'/1'/0'/0/0",
  },
  segWit: {
    mnemonic: MNEMONIC,
    address: "2NDrscWiWSvuxUmQp3stwgauM7PLXyA5Jba",
    privateKey: "cQjBQLBCeuyn1FeJE72M93vQJgMjoMXH9CkgidtjqjBsiLRjJKLK",
    publicKey: "0338848902420d91c7789bd62edb88814ce27ecd48f5ac9dd1d0f08682864c6755",
    path: "m/49'/1'/0'/0/0",
  },
  nativeSegWit: {
    mnemonic: MNEMONIC,
    address: "tb1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlwsvuf7",
    privateKey: "cU7MwjFKfWjDPkaKhEJmsbG6DwPjSZs6WLY4BYXiSzeGRnd232i3",
    publicKey: "03d5f0a7cc993f8a296111637c6dd2d80ab917ebeedcb6ed30a600cef49a4d63a1",
    path: "m/84'/1'/0'/0/0",
  },
  taproot: {
    mnemonic: MNEMONIC,
    address: "tb1p0q0ya6q34wml2h2katjm8486f27czctx7vghcvh08pmvhu9zdvlq7ne7zu",
    privateKey: "cPQEyhkUdfSCTZfEcWsFm5JLBo2ysAvsTzsYJ9Vv1mYTJmSZAj8A",
    publicKey: "5b0e1610c136eaa57159acd0bd602278b5de45f9664691b9c39ed244a4d46dd7",
    path: "m/86'/1'/0'/0/0",
  },
  p2wsh: {
    mnemonic: MNEMONIC,
    address: "tb1qaan4la2jzw7ww7f8f2uqrmcyyfyfqcmlxvn7r2dtc4gfhy2gl7fseyq9wd",
    privateKey: "cQjBQLBCeuyn1FeJE72M93vQJgMjoMXH9CkgidtjqjBsiLRjJKLK",
    publicKey: "0338848902420d91c7789bd62edb88814ce27ecd48f5ac9dd1d0f08682864c6755",
    path: "m/49'/1'/0'/0/0",
  },
  p2wshInP2sh: {
    mnemonic: MNEMONIC,
    address: "2NFcaS5rkUcss4LrN9SKwN2FkBTaLtfEaiL",
    privateKey: "cQjBQLBCeuyn1FeJE72M93vQJgMjoMXH9CkgidtjqjBsiLRjJKLK",
    publicKey: "0338848902420d91c7789bd62edb88814ce27ecd48f5ac9dd1d0f08682864c6755",
    path: "m/49'/1'/0'/0/0",
  },
};

const MOCK_COMMON_REGTEST_ADDRESS_DATA = {
  legacy: {
    ...MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy,
  },
  segWit: {
    ...MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit,
  },
  nativeSegWit: {
    ...MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit,
    address: "bcrt1q3vuwtgm82zhsc6yppzuq25rvkdcknuqlve437h",
  },
  taproot: {
    ...MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot,
    address: "bcrt1p0q0ya6q34wml2h2katjm8486f27czctx7vghcvh08pmvhu9zdvlqn2nchx",
  },
  p2wsh: {
    ...MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wsh,
    address: "bcrt1qaan4la2jzw7ww7f8f2uqrmcyyfyfqcmlxvn7r2dtc4gfhy2gl7fs5a2rmh",
  },
  p2wshInP2sh: {
    ...MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wshInP2sh,
  },
};

let mnemonic: Mnemonic;
let bitcoinMainnet: Bitcoin;
let bitcoinTestnet: Bitcoin;
let bitcoinRegtest: Bitcoin;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  bitcoinMainnet = new Bitcoin(mnemonic, "mainnet");
  bitcoinTestnet = new Bitcoin(mnemonic, "testnet");
  bitcoinRegtest = new Bitcoin(mnemonic, "regtest");
});

describe("Bitcoin", () => {
  describe("mainnet", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy.path,
          "legacy"
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy).toEqual(addressData);
      });

      it("Generates correct segWit address data", () => {
        const addressData = bitcoinMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.segWit.path,
          "segWit"
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.segWit).toEqual(addressData);
      });

      it("Generates correct native segWit address data", () => {
        const addressData = bitcoinMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.nativeSegWit.path,
          "nativeSegWit"
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.nativeSegWit).toEqual(addressData);
      });

      it("Generates correct taproot address data", () => {
        const addressData = bitcoinMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.taproot.path,
          "taproot"
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.taproot).toEqual(addressData);
      });

      it("Generates correct p2wsh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wsh.path,
          "p2wsh"
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wsh).toEqual(addressData);
      });

      it("Generates correct p2wsh in p2sh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wshInP2sh.path,
          "p2wshInP2sh"
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wshInP2sh).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = bitcoinMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy.privateKey,
          "legacy"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy);
      });

      it("Imports correct segWit address data", () => {
        const addressData = bitcoinMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.segWit.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.segWit.privateKey,
          "segWit"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.segWit);
      });

      it("Imports correct native segWit address data", () => {
        const addressData = bitcoinMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.nativeSegWit.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.nativeSegWit.privateKey,
          "nativeSegWit"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.nativeSegWit);
      });

      it("Imports correct taproot address data", () => {
        const addressData = bitcoinMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.taproot.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.taproot.privateKey,
          "taproot"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.taproot);
      });

      it("Imports correct p2wsh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wsh.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wsh.privateKey,
          "p2wsh"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wsh);
      });

      it("Imports correct p2wsh in p2sh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wshInP2sh.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wshInP2sh.privateKey,
          "p2wshInP2sh"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wshInP2sh);
      });
    });
  });

  describe("testnet", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy.path,
          "legacy"
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy).toEqual(addressData);
      });

      it("Generates correct segWit address data", () => {
        const addressData = bitcoinTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit.path,
          "segWit"
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit).toEqual(addressData);
      });

      it("Generates correct native segWit address data", () => {
        const addressData = bitcoinTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit.path,
          "nativeSegWit"
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit).toEqual(addressData);
      });

      it("Generates correct taproot address data", () => {
        const addressData = bitcoinTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot.path,
          "taproot"
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot).toEqual(addressData);
      });

      it("Generates correct p2wsh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wsh.path,
          "p2wsh"
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wsh).toEqual(addressData);
      });

      it("Generates correct p2wsh in p2sh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wshInP2sh.path,
          "p2wshInP2sh"
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wshInP2sh).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = bitcoinTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy.privateKey,
          "legacy"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy);
      });

      it("Imports correct segWit address data", () => {
        const addressData = bitcoinTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit.privateKey,
          "segWit"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit);
      });

      it("Imports correct native segWit address data", () => {
        const addressData = bitcoinTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit.privateKey,
          "nativeSegWit"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit);
      });

      it("Imports correct taproot address data", () => {
        const addressData = bitcoinTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot.privateKey,
          "taproot"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot);
      });

      it("Imports correct p2wsh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wsh.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wsh.privateKey,
          "p2wsh"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wsh);
      });

      it("Imports correct p2wsh in p2sh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wshInP2sh.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wshInP2sh.privateKey,
          "p2wshInP2sh"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wshInP2sh);
      });
    });
  });

  describe("regtest", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy.path,
          "legacy"
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy).toEqual(addressData);
      });

      it("Generates correct segWit address data", () => {
        const addressData = bitcoinRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.segWit.path,
          "segWit"
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.segWit).toEqual(addressData);
      });

      it("Generates correct native segWit address data", () => {
        const addressData = bitcoinRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.nativeSegWit.path,
          "nativeSegWit"
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.nativeSegWit).toEqual(addressData);
      });

      it("Generates correct taproot address data", () => {
        const addressData = bitcoinRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.taproot.path,
          "taproot"
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.taproot).toEqual(addressData);
      });

      it("Generates correct p2wsh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wsh.path,
          "p2wsh"
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wsh).toEqual(addressData);
      });

      it("Generates correct p2wsh in p2sh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wshInP2sh.path,
          "p2wshInP2sh"
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wshInP2sh).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = bitcoinRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy.privateKey,
          "legacy"
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy);
      });

      it("Imports correct segWit address data", () => {
        const addressData = bitcoinRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.segWit.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.segWit.privateKey,
          "segWit"
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.segWit);
      });

      it("Imports correct native segWit address data", () => {
        const addressData = bitcoinRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.nativeSegWit.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.nativeSegWit.privateKey,
          "nativeSegWit"
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.nativeSegWit);
      });

      it("Imports correct taproot address data", () => {
        const addressData = bitcoinRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.taproot.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.taproot.privateKey,
          "taproot"
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.taproot);
      });

      it("Imports correct p2wsh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wsh.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wsh.privateKey,
          "p2wsh"
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wsh);
      });

      it("Imports correct p2wsh in p2sh (1-of-1 multisig) address data", () => {
        const addressData = bitcoinRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wshInP2sh.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wshInP2sh.privateKey,
          "p2wshInP2sh"
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wshInP2sh);
      });
    });
  });
});
