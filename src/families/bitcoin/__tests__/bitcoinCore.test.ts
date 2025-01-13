import { Mnemonic } from "@/mnemonic/index.js";
import { BitcoinCore } from "../index.js";
import { describe, it, expect } from "vitest";
import { EMPTY_MNEMONIC } from "@/keyDerivation/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";
const MOCK_MAINNET_BASE58_ROOT_KEY =
  "xprv9s21ZrQH143K3YUjneyHb6vt9zazjahQ2odtmGFLCtFngSTY7byQbbxqBkiQLMtyUXhLfrananx8F6WvdtRKbQNQnvCZbgg58b4zqB6ZTkw";
const MOCK_TESTNET_BASE58_ROOT_KEY =
  "tprv8ZgxMBicQKsPeFEpt7eKry87VLERMJnhewHcRLs9D6VxLe4D5Uh8omt4HpNhj8wrnSaoTANw151WGqsiZz3Qw2z7Gv7Jn5ApwftwD8HrZ2p";
const MOCK_REGTEST_BASE58_ROOT_KEY =
  "tprv8ZgxMBicQKsPeGDV4kjnRnSQLgZ7XkAX865JEAWGmafNoC547ze9v5qoQ7kBLVNYtAEEXf5wEaRuJi5MYLA5aQQkgQ6HJftmvEKiCocPVtk";

const MOCK_MAINNET_ADDRESS_DATA = {
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

const MOCK_TESTNET_ADDRESS_DATA = {
  legacy: {
    mnemonic: EMPTY_MNEMONIC,
    address: "mn5qavm24T71bNQFBgX5Ai1K7mvoETir8P",
    privateKey: "cS425vtTUSCf1s1y3c6gJvVyBvjL7cmHNrKBCE6MLpcT1zEYVWKe",
    publicKey: "038095c7b111b24045a827e91b3593d4d8916874164e8410ff15816cd8240ad040",
    path: "m/44'/1'/0'/0/0",
  },
  segWit: {
    mnemonic: EMPTY_MNEMONIC,
    address: "2Mw2pZTv2pPoaHk5k19WJDvAcNSJHbmnqEr",
    privateKey: "cTRdfBcU3mrn4zHB238g7ixjMzVohLNyXDG5sZfu56KvCEASD7ZH",
    publicKey: "02912e08187152e8f6c591c8c82b585467ab58420ee078917480e856c7115be00a",
    path: "m/49'/1'/0'/0/0",
  },
  nativeSegWit: {
    mnemonic: EMPTY_MNEMONIC,
    address: "tb1qu8tyxff2ujh30k3xf33dt5wh4shuwkzg0rzzhl",
    privateKey: "cVBdijhsE58XUyMJq1gbstiQb4uwPaiGbKfs2UikRZrjdb62twmK",
    publicKey: "0233daf36998b48d458ed986847f17595061a14b5d0c91e7b742a32787139c8ec8",
    path: "m/84'/1'/0'/0/2",
  },
  taproot: {
    mnemonic: EMPTY_MNEMONIC,
    address: "tb1pxp3tyngnjjyqxgsydhjacpdalu9737v0qe0e9ag6jcln9v8fgddqfdc00z",
    privateKey: "cS8Kta9psMut3k5Xb47zKF66uwgdcCqiC2L1SSrXon22zdTUKNRh",
    publicKey: "d0d374e22ad8ff098366c96732809624b1f9fd073053e95d42c35c79a8a0b0cc",
    path: "m/86'/1'/0'/0/0",
  },
};

const MOCK_REGTEST_ADDRESS_DATA = {
  legacy: {
    mnemonic: EMPTY_MNEMONIC,
    address: "n2ByQmfCWwj8wKaPYWqyea4e8jkzTRSujm",
    privateKey: "cMkgWCqUtycwWXmbWuKEL2MJEoBtzYh6quH148RBvKA6dqTEHxEg",
    publicKey: "030692884e85f960460bc00c94b5fe813de1b8635a56586524322770019e31af2c",
    path: "m/44'/1'/0'/0/0",
  },
  segWit: {
    mnemonic: EMPTY_MNEMONIC,
    address: "2NEoYCKxkqkHzoPvJja3rSYDQaphF5KFFQT",
    privateKey: "cQo2zzA2VzvwwQsQrGR6nehAA2Fxw21kgTkU3yUWHSdevx3KvUxG",
    publicKey: "03df4fe090aa38ec0efe88ac15051ddff60c97c37602423e6800ec4553bcdc2610",
    path: "m/49'/1'/0'/0/0",
  },
  nativeSegWit: {
    mnemonic: EMPTY_MNEMONIC,
    address: "bcrt1qs6fjs349d0a4fh3hhl688fvss4d9wpaen85ty2",
    privateKey: "cRrAq9bwToxS3sW4Dyc4bo2w7Mg9RaJbXfh2tLRosEWwiTHUVqCW",
    publicKey: "0208c0f34068a4617085db68275a18d68347ca6a433d62aca4b02cd7826ddc877d",
    path: "m/84'/1'/0'/0/0",
  },
  taproot: {
    mnemonic: EMPTY_MNEMONIC,
    address: "bcrt1pnz4x87kwd9vudakr0spu37r59jt9jsvt8l8us2wz7lf4rtpdhqeqgnf7yy",
    privateKey: "cV2pJmYyM7uJi2rY4HcJuXPYGLibzuv93EhSPqcKpoGupLGQU9vw",
    publicKey: "19c7182e9759b85d149805f2aa235a68de54fe4f4362d2ca875b04317c310bfd",
    path: "m/86'/1'/0'/0/1",
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
    describe("derive", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = bitcoinCoreMainnet.derive(
          MOCK_MAINNET_ADDRESS_DATA.legacy.path,
          "legacy",
          MOCK_MAINNET_BASE58_ROOT_KEY
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.legacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = bitcoinCoreMainnet.derive(
          MOCK_MAINNET_ADDRESS_DATA.segWit.path,
          "segWit",
          MOCK_MAINNET_BASE58_ROOT_KEY
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.segWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem = bitcoinCoreMainnet.derive(
          MOCK_MAINNET_ADDRESS_DATA.nativeSegWit.path,
          "nativeSegWit",
          MOCK_MAINNET_BASE58_ROOT_KEY
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.nativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = bitcoinCoreMainnet.derive(
          MOCK_MAINNET_ADDRESS_DATA.taproot.path,
          "taproot",
          MOCK_MAINNET_BASE58_ROOT_KEY
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.taproot).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy item", () => {
        const credential = bitcoinCoreMainnet.importByPrivateKey(
          MOCK_MAINNET_ADDRESS_DATA.legacy.path,
          MOCK_MAINNET_ADDRESS_DATA.legacy.privateKey,
          "legacy",
          MOCK_MAINNET_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.legacy);
      });

      it("Imports correct segWit item", () => {
        const credential = bitcoinCoreMainnet.importByPrivateKey(
          MOCK_MAINNET_ADDRESS_DATA.segWit.path,
          MOCK_MAINNET_ADDRESS_DATA.segWit.privateKey,
          "segWit",
          MOCK_MAINNET_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.segWit);
      });

      it("Imports correct native segWit item", () => {
        const credential = bitcoinCoreMainnet.importByPrivateKey(
          MOCK_MAINNET_ADDRESS_DATA.nativeSegWit.path,
          MOCK_MAINNET_ADDRESS_DATA.nativeSegWit.privateKey,
          "nativeSegWit",
          MOCK_MAINNET_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nativeSegWit);
      });

      it("Imports correct taproot item", () => {
        const credential = bitcoinCoreMainnet.importByPrivateKey(
          MOCK_MAINNET_ADDRESS_DATA.taproot.path,
          MOCK_MAINNET_ADDRESS_DATA.taproot.privateKey,
          "taproot",
          MOCK_MAINNET_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.taproot);
      });
    });
  });

  describe("testnet", () => {
    describe("derive", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = bitcoinCoreTestnet.derive(
          MOCK_TESTNET_ADDRESS_DATA.legacy.path,
          "legacy",
          MOCK_TESTNET_BASE58_ROOT_KEY
        );

        expect(MOCK_TESTNET_ADDRESS_DATA.legacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = bitcoinCoreTestnet.derive(
          MOCK_TESTNET_ADDRESS_DATA.segWit.path,
          "segWit",
          MOCK_TESTNET_BASE58_ROOT_KEY
        );

        expect(MOCK_TESTNET_ADDRESS_DATA.segWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem = bitcoinCoreTestnet.derive(
          MOCK_TESTNET_ADDRESS_DATA.nativeSegWit.path,
          "nativeSegWit",
          MOCK_TESTNET_BASE58_ROOT_KEY
        );

        expect(MOCK_TESTNET_ADDRESS_DATA.nativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = bitcoinCoreTestnet.derive(
          MOCK_TESTNET_ADDRESS_DATA.taproot.path,
          "taproot",
          MOCK_TESTNET_BASE58_ROOT_KEY
        );

        expect(MOCK_TESTNET_ADDRESS_DATA.taproot).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy item", () => {
        const credential = bitcoinCoreTestnet.importByPrivateKey(
          MOCK_TESTNET_ADDRESS_DATA.legacy.path,
          MOCK_TESTNET_ADDRESS_DATA.legacy.privateKey,
          "legacy",
          MOCK_TESTNET_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.legacy);
      });

      it("Imports correct segWit item", () => {
        const credential = bitcoinCoreTestnet.importByPrivateKey(
          MOCK_TESTNET_ADDRESS_DATA.segWit.path,
          MOCK_TESTNET_ADDRESS_DATA.segWit.privateKey,
          "segWit",
          MOCK_TESTNET_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.segWit);
      });

      it("Imports correct native segWit item", () => {
        const credential = bitcoinCoreTestnet.importByPrivateKey(
          MOCK_TESTNET_ADDRESS_DATA.nativeSegWit.path,
          MOCK_TESTNET_ADDRESS_DATA.nativeSegWit.privateKey,
          "nativeSegWit",
          MOCK_TESTNET_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nativeSegWit);
      });

      it("Imports correct taproot item", () => {
        const credential = bitcoinCoreTestnet.importByPrivateKey(
          MOCK_TESTNET_ADDRESS_DATA.taproot.path,
          MOCK_TESTNET_ADDRESS_DATA.taproot.privateKey,
          "taproot",
          MOCK_TESTNET_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.taproot);
      });
    });
  });

  describe("regtest", () => {
    describe("derive", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = bitcoinCoreRegtest.derive(
          MOCK_REGTEST_ADDRESS_DATA.legacy.path,
          "legacy",
          MOCK_REGTEST_BASE58_ROOT_KEY
        );

        expect(MOCK_REGTEST_ADDRESS_DATA.legacy).toEqual(derivedItem);
      });

      it("Derives correct segWit item", () => {
        const derivedItem = bitcoinCoreRegtest.derive(
          MOCK_REGTEST_ADDRESS_DATA.segWit.path,
          "segWit",
          MOCK_REGTEST_BASE58_ROOT_KEY
        );

        expect(MOCK_REGTEST_ADDRESS_DATA.segWit).toEqual(derivedItem);
      });

      it("Derives correct native segWit item", () => {
        const derivedItem = bitcoinCoreRegtest.derive(
          MOCK_REGTEST_ADDRESS_DATA.nativeSegWit.path,
          "nativeSegWit",
          MOCK_REGTEST_BASE58_ROOT_KEY
        );

        expect(MOCK_REGTEST_ADDRESS_DATA.nativeSegWit).toEqual(derivedItem);
      });

      it("Derives correct taproot item", () => {
        const derivedItem = bitcoinCoreRegtest.derive(
          MOCK_REGTEST_ADDRESS_DATA.taproot.path,
          "taproot",
          MOCK_REGTEST_BASE58_ROOT_KEY
        );

        expect(MOCK_REGTEST_ADDRESS_DATA.taproot).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct legacy item", () => {
        const credential = bitcoinCoreRegtest.importByPrivateKey(
          MOCK_REGTEST_ADDRESS_DATA.legacy.path,
          MOCK_REGTEST_ADDRESS_DATA.legacy.privateKey,
          "legacy",
          MOCK_REGTEST_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.legacy);
      });

      it("Imports correct segWit item", () => {
        const credential = bitcoinCoreRegtest.importByPrivateKey(
          MOCK_REGTEST_ADDRESS_DATA.segWit.path,
          MOCK_REGTEST_ADDRESS_DATA.segWit.privateKey,
          "segWit",
          MOCK_REGTEST_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.segWit);
      });

      it("Imports correct native segWit item", () => {
        const credential = bitcoinCoreRegtest.importByPrivateKey(
          MOCK_REGTEST_ADDRESS_DATA.nativeSegWit.path,
          MOCK_REGTEST_ADDRESS_DATA.nativeSegWit.privateKey,
          "nativeSegWit",
          MOCK_REGTEST_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.nativeSegWit);
      });

      it("Imports correct taproot item", () => {
        const credential = bitcoinCoreRegtest.importByPrivateKey(
          MOCK_REGTEST_ADDRESS_DATA.taproot.path,
          MOCK_REGTEST_ADDRESS_DATA.taproot.privateKey,
          "taproot",
          MOCK_REGTEST_BASE58_ROOT_KEY
        );

        expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.taproot);
      });
    });
  });
});
