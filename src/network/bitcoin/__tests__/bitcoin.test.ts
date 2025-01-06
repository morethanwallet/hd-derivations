import { Mnemonic } from "@/mnemonic/index.js";
import { Bitcoin } from "../index.js";
import { describe, it, expect } from "vitest";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";

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
      describe("Import from a private key from a native mnemonic", () => {
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

      describe("Import from a private key from a non-native mnemonic", () => {
        it("Imports correct legacy address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy,
            mnemonic: EMPTY_MNEMONIC,
            address: "1DpokrQjdBPbgxhvA7DuwEa2d4sAWxGe2K",
            privateKey: "L2qPambu4AcbJTfATtyJDyMpTRDdeTX1A8RpNDSvcHWbFADogPwK",
            publicKey: "03ef3463bbb9bb2de72842c2d45035f7cdcc1d6de6c339a6dd504445e4019626bc",
          };

          const addressData = bitcoinMainnet.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "legacy"
          );

          expect(addressData).toEqual(mockAddressData);
        });

        it("Imports correct segWit address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_MAINNET_ADDRESS_DATA.segWit,
            mnemonic: EMPTY_MNEMONIC,
            address: "3Kbe5cjR2c7GBzwcK3GRCaUxkP88KEbseh",
            privateKey: "KxvjmXm3z1s7L4WeRvbWHD54UhKnGVqst9QL9vd2jZ4zUKsHZrKx",
            publicKey: "0217007e56bf94ddba9898ed2bedcd1692dbbbf34824bcd81bd0f55ac5329e6098",
          };

          const addressData = bitcoinMainnet.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "segWit"
          );

          expect(addressData).toEqual(mockAddressData);
        });
      });

      it("Imports correct native segWit address data", () => {
        const mockAddressData = {
          ...MOCK_COMMON_MAINNET_ADDRESS_DATA.nativeSegWit,
          mnemonic: EMPTY_MNEMONIC,
          address: "bc1qsy9hltg0u8an5g0kuty23e3hdve2eqaxaadv3y",
          privateKey: "L2oT3UVFFqESwhuwJBsV3LX61aDRQWfiiFKpbghtbArTVWMP84uH",
          publicKey: "035e80a741f89eb8dbe171d7841968a7296dd6dc0cb75d4d85b45de16c1014fa71",
        };

        const addressData = bitcoinMainnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "nativeSegWit"
        );

        expect(addressData).toEqual(mockAddressData);
      });

      it("Imports correct taproot address data", () => {
        const mockAddressData = {
          ...MOCK_COMMON_MAINNET_ADDRESS_DATA.taproot,
          mnemonic: EMPTY_MNEMONIC,
          address: "bc1pndv2wuuprqu4ku5c4dz3uvke3s8n0yf4wkdejcu53uprwfwc9h8qv59h9a",
          privateKey: "L17b91gnDPNZiqaubKXrDzzRQaiJkizmvzMWqxc4mxuy7WkFGQLL",
          publicKey: "c5a5b24c05fcc0c98a217ef9df5984a08ab2db876be75b4f6fb64fdfb2149499",
        };

        const addressData = bitcoinMainnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "taproot"
        );

        expect(addressData).toEqual(mockAddressData);
      });

      it("Imports correct p2wsh (1-of-1 multisig) address data", () => {
        const mockAddressData = {
          ...MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wsh,
          mnemonic: EMPTY_MNEMONIC,
          address: "bc1qrg29edwwkhjvtd8lv34l78auknm96zhrd23sgmvfeuw6e3qt0yqqz4zgjj",
          privateKey: "KxvjmXm3z1s7L4WeRvbWHD54UhKnGVqst9QL9vd2jZ4zUKsHZrKx",
          publicKey: "0217007e56bf94ddba9898ed2bedcd1692dbbbf34824bcd81bd0f55ac5329e6098",
        };

        const addressData = bitcoinMainnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "p2wsh"
        );

        expect(addressData).toEqual(mockAddressData);
      });

      it("Imports correct p2wsh in p2sh (1-of-1 multisig) address data", () => {
        const mockAddressData = {
          ...MOCK_COMMON_MAINNET_ADDRESS_DATA.p2wshInP2sh,
          mnemonic: EMPTY_MNEMONIC,
          address: "3P1EYk9YYSBoDuKcQj2C6bPMbvTvVuoy2j",
          privateKey: "KxvjmXm3z1s7L4WeRvbWHD54UhKnGVqst9QL9vd2jZ4zUKsHZrKx",
          publicKey: "0217007e56bf94ddba9898ed2bedcd1692dbbbf34824bcd81bd0f55ac5329e6098",
        };

        const addressData = bitcoinMainnet.importByPrivateKey(
          mockAddressData.path,
          mockAddressData.privateKey,
          "p2wshInP2sh"
        );

        expect(addressData).toEqual(mockAddressData);
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
      describe("Import from a private key from a native mnemonic", () => {
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
      describe("Import from a private key from a non-native mnemonic", () => {
        it("Imports correct legacy address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy,
            mnemonic: EMPTY_MNEMONIC,
            address: "n48G9HDQafyjS2fbPstLGt4n1dSR1NESS8",
            privateKey: "cNR3CCytyuoqq9oK9iALZ1E6Q2brp2izuQ3ZWQApa3GposUD4bhN",
            publicKey: "03d57fe1f3989eda6bc663cf844cb3804db972d309ebd56f7ef5536b338d2756a8",
          };

          const addressData = bitcoinTestnet.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "legacy"
          );

          expect(addressData).toEqual(mockAddressData);
        });

        it("Imports correct segWit address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit,
            mnemonic: EMPTY_MNEMONIC,
            address: "2MwFm1ozdLiXfc1PMP7u7D7vQojWxXTGXsr",
            privateKey: "cVhAbPqGLxUNtDRKrADt6PWyaoAiic7xxUPkB2SzKqM658VwkxZT",
            publicKey: "033e504e8e281c8a8c96cc17e3874fbfeb5cb68208d0caa8ef1becd82a110946b9",
          };

          const addressData = bitcoinTestnet.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "segWit"
          );

          expect(addressData).toEqual(mockAddressData);
        });

        it("Imports correct native segWit address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit,
            mnemonic: EMPTY_MNEMONIC,
            address: "tb1qe8deaenmchr00kr7r2vt9dmp55zjyagtr3safk",
            privateKey: "cUVDbb4yxqEZ2iQ2by2H2YiYUXUtc5FTBtk4v2EGz1Aza2LjxXUy",
            publicKey: "02c55122c6123a5cacfa827756eb4e989a218182da09080b1749ceb168a3b2fb6d",
          };

          const addressData = bitcoinTestnet.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "nativeSegWit"
          );

          expect(addressData).toEqual(mockAddressData);
        });

        it("Imports correct taproot address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot,
            mnemonic: EMPTY_MNEMONIC,
            address: "tb1pdc89mkscf59pctu2q70vkx7569p4fh8vk54jxdng9qugeyf4slzqeresaf",
            privateKey: "cRxhDCSgAgYupdH6XGmBdHhbwDhqkjyRtKbYYC7U99ywddBDZPQ1",
            publicKey: "069522ff55becbb9a056ba1eb892c8c83c16db8a6de54fe22752daa4d74f58fe",
          };

          const addressData = bitcoinTestnet.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "taproot"
          );

          expect(addressData).toEqual(mockAddressData);
        });

        it("Imports correct p2wsh (1-of-1 multisig) address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wsh,
            mnemonic: EMPTY_MNEMONIC,
            address: "tb1qr7nx25twp7awuat8k3d65vk8kr0lqmey9p8qjvgmtufux9fp0xfsujxkm8",
            privateKey: "cVhAbPqGLxUNtDRKrADt6PWyaoAiic7xxUPkB2SzKqM658VwkxZT",
            publicKey: "033e504e8e281c8a8c96cc17e3874fbfeb5cb68208d0caa8ef1becd82a110946b9",
          };

          const addressData = bitcoinTestnet.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "p2wsh"
          );

          expect(addressData).toEqual(mockAddressData);
        });

        it("Imports correct p2wsh in p2sh (1-of-1 multisig) address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_TESTNET_ADDRESS_DATA.p2wshInP2sh,
            mnemonic: EMPTY_MNEMONIC,
            address: "2NFSbMft1JJLzJxsri6pqTUb1PTEo2NGKQA",
            privateKey: "cVhAbPqGLxUNtDRKrADt6PWyaoAiic7xxUPkB2SzKqM658VwkxZT",
            publicKey: "033e504e8e281c8a8c96cc17e3874fbfeb5cb68208d0caa8ef1becd82a110946b9",
          };

          const addressData = bitcoinTestnet.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "p2wshInP2sh"
          );

          expect(addressData).toEqual(mockAddressData);
        });
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
      describe("Import from a private key from a native mnemonic", () => {
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

      describe("Import from a private key from a non-native mnemonic", () => {
        it("Imports correct legacy address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy,
            mnemonic: EMPTY_MNEMONIC,
            address: "n48G9HDQafyjS2fbPstLGt4n1dSR1NESS8",
            privateKey: "cNR3CCytyuoqq9oK9iALZ1E6Q2brp2izuQ3ZWQApa3GposUD4bhN",
            publicKey: "03d57fe1f3989eda6bc663cf844cb3804db972d309ebd56f7ef5536b338d2756a8",
          };

          const addressData = bitcoinRegtest.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "legacy"
          );

          expect(addressData).toEqual(mockAddressData);
        });

        it("Imports correct segWit address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_REGTEST_ADDRESS_DATA.segWit,
            mnemonic: EMPTY_MNEMONIC,
            address: "2MwFm1ozdLiXfc1PMP7u7D7vQojWxXTGXsr",
            privateKey: "cVhAbPqGLxUNtDRKrADt6PWyaoAiic7xxUPkB2SzKqM658VwkxZT",
            publicKey: "033e504e8e281c8a8c96cc17e3874fbfeb5cb68208d0caa8ef1becd82a110946b9",
          };

          const addressData = bitcoinRegtest.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "segWit"
          );

          expect(addressData).toEqual(mockAddressData);
        });

        it("Imports correct native segWit address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_REGTEST_ADDRESS_DATA.nativeSegWit,
            mnemonic: EMPTY_MNEMONIC,
            address: "bcrt1qe8deaenmchr00kr7r2vt9dmp55zjyagtpcfs7l",
            privateKey: "cUVDbb4yxqEZ2iQ2by2H2YiYUXUtc5FTBtk4v2EGz1Aza2LjxXUy",
            publicKey: "02c55122c6123a5cacfa827756eb4e989a218182da09080b1749ceb168a3b2fb6d",
          };

          const addressData = bitcoinRegtest.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "nativeSegWit"
          );

          expect(addressData).toEqual(mockAddressData);
        });

        it("Imports correct taproot address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_REGTEST_ADDRESS_DATA.taproot,
            mnemonic: EMPTY_MNEMONIC,
            address: "bcrt1pdc89mkscf59pctu2q70vkx7569p4fh8vk54jxdng9qugeyf4slzq56nkgn",
            privateKey: "cRxhDCSgAgYupdH6XGmBdHhbwDhqkjyRtKbYYC7U99ywddBDZPQ1",
            publicKey: "069522ff55becbb9a056ba1eb892c8c83c16db8a6de54fe22752daa4d74f58fe",
          };

          const addressData = bitcoinRegtest.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "taproot"
          );

          expect(addressData).toEqual(mockAddressData);
        });

        it("Imports correct p2wsh (1-of-1 multisig) address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wsh,
            mnemonic: EMPTY_MNEMONIC,
            address: "bcrt1qr7nx25twp7awuat8k3d65vk8kr0lqmey9p8qjvgmtufux9fp0xfs3tvswa",
            privateKey: "cVhAbPqGLxUNtDRKrADt6PWyaoAiic7xxUPkB2SzKqM658VwkxZT",
            publicKey: "033e504e8e281c8a8c96cc17e3874fbfeb5cb68208d0caa8ef1becd82a110946b9",
          };

          const addressData = bitcoinRegtest.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "p2wsh"
          );

          expect(addressData).toEqual(mockAddressData);
        });

        it("Imports correct p2wsh in p2sh (1-of-1 multisig) address data", () => {
          const mockAddressData = {
            ...MOCK_COMMON_REGTEST_ADDRESS_DATA.p2wshInP2sh,
            mnemonic: EMPTY_MNEMONIC,
            address: "2NFSbMft1JJLzJxsri6pqTUb1PTEo2NGKQA",
            privateKey: "cVhAbPqGLxUNtDRKrADt6PWyaoAiic7xxUPkB2SzKqM658VwkxZT",
            publicKey: "033e504e8e281c8a8c96cc17e3874fbfeb5cb68208d0caa8ef1becd82a110946b9",
          };

          const addressData = bitcoinRegtest.importByPrivateKey(
            mockAddressData.path,
            mockAddressData.privateKey,
            "p2wshInP2sh"
          );

          expect(addressData).toEqual(mockAddressData);
        });
      });
    });
  });
});
