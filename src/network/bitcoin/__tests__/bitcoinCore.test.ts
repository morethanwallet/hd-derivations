import { Mnemonic } from "@/mnemonic/index.js";
import { BitcoinCore } from "../index.js";
import { describe, it, expect } from "vitest";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";
const BASE58_ROOT_KEY =
  "xprv9s21ZrQH143K3YUjneyHb6vt9zazjahQ2odtmGFLCtFngSTY7byQbbxqBkiQLMtyUXhLfrananx8F6WvdtRKbQNQnvCZbgg58b4zqB6ZTkw";

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  legacy: {
    mnemonic: EMPTY_MNEMONIC,
    address: "1K7kjgwibEETCfkDe7fiSz7pjijDG7jKBi",
    privateKey: "L348o5sR9LrxNM8mjGUHh9JCivarV98v4hFMUdrhsm6HUYznRipm",
    publicKey: "021ef4f82ec6436aa28c0f847db310e85b05e078b239715bfc3981df6027fb9960",
    path: "m/44'/0'/0'/0/3",
  },
  segWit: {
    mnemonic: EMPTY_MNEMONIC,
    address: "3G9kkEoVStp5brWYKyk7ag8Z5JY4LWg961",
    privateKey: "KykC82SYfGHwWuvxQpyYgpBkBmfJRvtphEndppJi4zzV9K6ZgpKJ",
    publicKey: "0394c89f7d523d824dc4a2f40ad47fb160da265c28787f50f14cabfa4b32fbf0aa",
    path: "m/49'/0'/0'/0/3",
  },
  nativeSegWit: {
    mnemonic: EMPTY_MNEMONIC,
    address: "bc1q8cejar452ul4j5sr4vgv0uw03u6ch0uaa454gz",
    privateKey: "L2wyba3JH9tKZgaEG9qGgc1Q2AkyW8Q5RkieKoomkic2k1x3U5wr",
    publicKey: "03bd8dd4ea029742ceb7b79c0da2118a61e78af2193acf62bbf638445d7bf3e627",
    path: "m/84'/0'/0'/0/3",
  },
  taproot: {
    mnemonic: EMPTY_MNEMONIC,
    address: "bc1pjj75ulc2hytxnvpmcefndw87tgsh3jar3k4p9j59ptzsgy0h0x6qqacd7d",
    privateKey: "KwdqxtRckvLywyDEAUkEd9uZEMyUWrc7iMiRm7S9BChCehE7oUrq",
    publicKey: "ef3743894be766e05b38a2a0b9e6c83927e2b04947d9574cdc3580148c64dc81",
    path: "m/86'/0'/0'/0/5",
  },
};

const MOCK_COMMON_TESTNET_ADDRESS_DATA = {
  legacy: {
    mnemonic: EMPTY_MNEMONIC,
    address: "mt3g135aijz8KKzY8KWHHhELiUvBJw7ZaV",
    privateKey: "L1DY4NF8DyWPP8fiy787Au9L48TNk6x5fPZtCVxP5npgL7B7VkdS",
    publicKey: "0272bf7ef034cab9e0cd72aff6902f4a401fd5ad3dc68e6d46db5a016ac6e26ac5",
    path: "m/44'/1'/0'/0/3",
  },
  segWit: {
    mnemonic: EMPTY_MNEMONIC,
    address: "2N63XGQKDHES9mSuas84jLT7GwtBmjVH231",
    privateKey: "L5doRfdDzhfijYGmSnh9UBxHB8RGQTkQAcpSAwWpgd43e819uiWg",
    publicKey: "02066063380d08e100333f32c38ef81d4694c1104547e74f1c88bcadbbdc818300",
    path: "m/49'/1'/0'/0/3",
  },
  nativeSegWit: {
    mnemonic: EMPTY_MNEMONIC,
    address: "tb1qc2a6nu2pm3es63v32q8k8d9mg0pekpqajhctt6",
    privateKey: "L3QfEqbsENbjuK6y5iFAySm9skueK2FRneeG7C7M3VvcGzdKGxnL",
    publicKey: "021eb59b65589de8a34ad1960297a866045c88ea0045f16aff6b159cc50936b182",
    path: "m/84'/1'/0'/0/3",
  },
  taproot: {
    mnemonic: EMPTY_MNEMONIC,
    address: "tb1pv532s48lxsftqvg97yepvqvcw83cw3v0l9pm6m2t2mc32frguntsn970ze",
    privateKey: "L44Lzgq9H642QkeSDDH6kGvCW3U9iRg9cCKB4CSFMG78vA6M3937",
    publicKey: "f1a3b678e585cfb1f3b99774574d13011183d90a1d68f92e2de890f2032a8d9c",
    path: "m/86'/1'/0'/0/5",
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
    address: "bcrt1qc2a6nu2pm3es63v32q8k8d9mg0pekpqas7pxun",
  },
  taproot: {
    ...MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot,
    address: "bcrt1pv532s48lxsftqvg97yepvqvcw83cw3v0l9pm6m2t2mc32frgunts7u5fhr",
  },
};

let mnemonic: Mnemonic;
let bitcoinCoreMainnet: BitcoinCore;
let bitcoinCoreTestnet: BitcoinCore;
let bitcoinCoreRegtest: BitcoinCore;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  bitcoinCoreMainnet = new BitcoinCore(mnemonic, "mainnet");
  bitcoinCoreTestnet = new BitcoinCore(mnemonic, "testnet");
  bitcoinCoreRegtest = new BitcoinCore(mnemonic, "regtest");
});

describe("Bitcoin Core", () => {
  describe("mainnet", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinCoreMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy.path,
          "legacy",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy).toEqual(addressData);
      });

      it("Generates correct segWit address data", () => {
        const addressData = bitcoinCoreMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.segWit.path,
          "segWit",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.segWit).toEqual(addressData);
      });

      it("Generates correct native segWit address data", () => {
        const addressData = bitcoinCoreMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.nativeSegWit.path,
          "nativeSegWit",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.nativeSegWit).toEqual(addressData);
      });

      it("Generates correct taproot address data", () => {
        const addressData = bitcoinCoreMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.taproot.path,
          "taproot",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.taproot).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = bitcoinCoreMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy.privateKey,
          "legacy",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.legacy);
      });

      it("Imports correct segWit address data", () => {
        const addressData = bitcoinCoreMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.segWit.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.segWit.privateKey,
          "segWit",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.segWit);
      });

      it("Imports correct native segWit address data", () => {
        const addressData = bitcoinCoreMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.nativeSegWit.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.nativeSegWit.privateKey,
          "nativeSegWit",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.nativeSegWit);
      });

      it("Imports correct taproot address data", () => {
        const addressData = bitcoinCoreMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.taproot.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.taproot.privateKey,
          "taproot",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.taproot);
      });
    });
  });

  describe("testnet", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinCoreTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy.path,
          "legacy",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy).toEqual(addressData);
      });

      it("Generates correct segWit address data", () => {
        const addressData = bitcoinCoreTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit.path,
          "segWit",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit).toEqual(addressData);
      });

      it("Generates correct native segWit address data", () => {
        const addressData = bitcoinCoreTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit.path,
          "nativeSegWit",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit).toEqual(addressData);
      });

      it("Generates correct taproot address data", () => {
        const addressData = bitcoinCoreTestnet.getAddressData(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot.path,
          "taproot",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = bitcoinCoreTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy.privateKey,
          "legacy",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.legacy);
      });

      it("Imports correct segWit address data", () => {
        const addressData = bitcoinCoreTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit.privateKey,
          "segWit",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.segWit);
      });

      it("Imports correct native segWit address data", () => {
        const addressData = bitcoinCoreTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit.privateKey,
          "nativeSegWit",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.nativeSegWit);
      });

      it("Imports correct taproot address data", () => {
        const addressData = bitcoinCoreTestnet.importByPrivateKey(
          MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot.path,
          MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot.privateKey,
          "taproot",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_ADDRESS_DATA.taproot);
      });
    });
  });

  describe("regtest", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinCoreRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy.path,
          "legacy",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy).toEqual(addressData);
      });

      it("Generates correct segWit address data", () => {
        const addressData = bitcoinCoreRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.segWit.path,
          "segWit",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.segWit).toEqual(addressData);
      });

      it("Generates correct native segWit address data", () => {
        const addressData = bitcoinCoreRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.nativeSegWit.path,
          "nativeSegWit",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.nativeSegWit).toEqual(addressData);
      });

      it("Generates correct taproot address data", () => {
        const addressData = bitcoinCoreRegtest.getAddressData(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.taproot.path,
          "taproot",
          BASE58_ROOT_KEY
        );

        expect(MOCK_COMMON_REGTEST_ADDRESS_DATA.taproot).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy address data", () => {
        const addressData = bitcoinCoreRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy.privateKey,
          "legacy",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.legacy);
      });

      it("Imports correct segWit address data", () => {
        const addressData = bitcoinCoreRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.segWit.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.segWit.privateKey,
          "segWit",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.segWit);
      });

      it("Imports correct native segWit address data", () => {
        const addressData = bitcoinCoreRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.nativeSegWit.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.nativeSegWit.privateKey,
          "nativeSegWit",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.nativeSegWit);
      });

      it("Imports correct taproot address data", () => {
        const addressData = bitcoinCoreRegtest.importByPrivateKey(
          MOCK_COMMON_REGTEST_ADDRESS_DATA.taproot.path,
          MOCK_COMMON_REGTEST_ADDRESS_DATA.taproot.privateKey,
          "taproot",
          BASE58_ROOT_KEY
        );

        expect(addressData).toEqual(MOCK_COMMON_REGTEST_ADDRESS_DATA.taproot);
      });
    });
  });
});
