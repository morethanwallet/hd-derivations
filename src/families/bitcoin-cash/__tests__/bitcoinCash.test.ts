import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { BitcoinCash } from "../bitcoinCash.network.js";
import { EMPTY_MNEMONIC } from "@/keyDerivation/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = { mainnet: "m/44'/145'/0'/0/0", testnet: "m/44'/1'/0'/0/0" };

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    privateKey: "Kysn6FCsYUwSwYVdUD4c6kdntJeZCZWpPYPj6LjEV2pDPyWNFhjX",
    publicKey: "0333d222cc1fd501e74b6d64cb1e4dd85bbcb28d9ce3fd6a30133f5aa6211a8fc3",
    path: MOCK_COMMON_DERIVATION_PATH.mainnet,
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    privateKey: "KxUYbZfVLLEFehzKcNXJSJvmBjbYswf9ZEsasfH5vFbdvvwS1F31",
    publicKey: "03d3a1e1860cf3946b00ee9831a8df63557b820e71a004a842bb12e0dd1acb6c6a",
    path: MOCK_COMMON_DERIVATION_PATH.mainnet,
  },
};

const MOCK_MAINNET_ADDRESS_DATA = {
  native: {
    legacy: {
      ...MOCK_COMMON_MAINNET_ADDRESS_DATA.native,
      address: "1P1nxaA36Q63qUo6CvcFqmdHVeQRSECH3Z",
    },
    cashAddr: {
      ...MOCK_COMMON_MAINNET_ADDRESS_DATA.native,
      address: "bitcoincash:qrchjgvn4keqa6qwesjvywyj2fy46x2ex556xmy82u",
    },
  },
  nonNative: {
    legacy: {
      ...MOCK_COMMON_MAINNET_ADDRESS_DATA.nonNative,
      address: "1C4LoSb1jZ2i9HALrt9FfsU7KtXjoNrPwZ",
    },
    cashAddr: {
      ...MOCK_COMMON_MAINNET_ADDRESS_DATA.nonNative,
      address: "bitcoincash:qpu5k2gfmn34jmlmqjtyqvmq75753sq63y4tyue5yj",
    },
  },
};

const MOCK_COMMON_TESTNET_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    privateKey: "cQEPGT34NWGzWnW1JE3d5GKaBcEQJqUsDdxH2jXD97CkXaAaXHEn",
    publicKey: "02d76e63231c59c216550ef886d362d58ba96ee30eb56caa99f5cdaf651b9a9a6e",
    path: MOCK_COMMON_DERIVATION_PATH.testnet,
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    privateKey: "cPS2rfjHVcJxNCTnxgoALhzeqCFFHadE4tButfB4L2aoowkMP4m7",
    publicKey: "028db811636159b5b3e2b949e70630ef75dabab371c56f5ebd8f86677a24c5c2ee",
    path: MOCK_COMMON_DERIVATION_PATH.testnet,
  },
};

const MOCK_TESTNET_ADDRESS_DATA = {
  native: {
    legacy: {
      ...MOCK_COMMON_TESTNET_ADDRESS_DATA.native,
      address: "mk2hF1aSuKkBZtCUM9jDfjgFLE5gGJ8U8c",
    },
    cashAddr: {
      ...MOCK_COMMON_TESTNET_ADDRESS_DATA.native,
      address: "bchtest:qqccq645kqhy9sp3vz2xx293a0xa5ywcwgvc06zrfh",
    },
  },
  nonNative: {
    legacy: {
      ...MOCK_COMMON_TESTNET_ADDRESS_DATA.nonNative,
      address: "mv6xfUhaYnC3HzGmtdCu2edHLnm4VHUyxi",
    },
    cashAddr: {
      ...MOCK_COMMON_TESTNET_ADDRESS_DATA.nonNative,
      address: "bchtest:qzsqqdj8px2eqpyt3llvjalc7pjfel7cqgxgpm9m55",
    },
  },
};

const MOCK_REGTEST_ADDRESS_DATA = {
  native: {
    legacy: {
      ...MOCK_TESTNET_ADDRESS_DATA.native.legacy,
    },
    cashAddr: {
      ...MOCK_TESTNET_ADDRESS_DATA.native.cashAddr,
      address: "bchreg:qqccq645kqhy9sp3vz2xx293a0xa5ywcwgvc06zrfh",
    },
  },
  nonNative: {
    legacy: {
      ...MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy,
    },
    cashAddr: {
      ...MOCK_TESTNET_ADDRESS_DATA.nonNative.cashAddr,
      address: "bchreg:qzsqqdj8px2eqpyt3llvjalc7pjfel7cqgxgpm9m55",
    },
  },
};

let mnemonic: Mnemonic;
let bitcoinCashMainnet: BitcoinCash;
let bitcoinCashTestnet: BitcoinCash;
let bitcoinCashRegtest: BitcoinCash;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  bitcoinCashMainnet = new BitcoinCash(mnemonic, "mainnet");
  bitcoinCashTestnet = new BitcoinCash(mnemonic, "testnet");
  bitcoinCashRegtest = new BitcoinCash(mnemonic, "regtest");
});

describe("Bitcoin Cash", () => {
  describe("mainnet", () => {
    describe("derive", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = bitcoinCashMainnet.derive(
          MOCK_MAINNET_ADDRESS_DATA.native.legacy.path,
          "legacy"
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.native.legacy).toEqual(derivedItem);
      });

      it("Derives correct cashAddr item", () => {
        const derivedItem = bitcoinCashMainnet.derive(
          MOCK_MAINNET_ADDRESS_DATA.native.cashAddr.path,
          "cashAddr"
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.native.cashAddr).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct legacy item", () => {
          const credential = bitcoinCashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.legacy.path,
            MOCK_MAINNET_ADDRESS_DATA.native.legacy.privateKey,
            "legacy"
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.legacy);
        });

        it("Imports correct cashAddr item", () => {
          const credential = bitcoinCashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.cashAddr.path,
            MOCK_MAINNET_ADDRESS_DATA.native.cashAddr.privateKey,
            "cashAddr"
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.cashAddr);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct legacy item", () => {
          const credential = bitcoinCashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.legacy.path,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.legacy.privateKey,
            "legacy"
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.legacy);
        });

        it("Imports correct cashAddr item", () => {
          const credential = bitcoinCashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.cashAddr.path,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.cashAddr.privateKey,
            "cashAddr"
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.cashAddr);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("derive", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = bitcoinCashTestnet.derive(
          MOCK_TESTNET_ADDRESS_DATA.native.legacy.path,
          "legacy"
        );

        expect(MOCK_TESTNET_ADDRESS_DATA.native.legacy).toEqual(derivedItem);
      });

      it("Derives correct cashAddr item", () => {
        const derivedItem = bitcoinCashTestnet.derive(
          MOCK_TESTNET_ADDRESS_DATA.native.cashAddr.path,
          "cashAddr"
        );

        expect(MOCK_TESTNET_ADDRESS_DATA.native.cashAddr).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct legacy item", () => {
          const credential = bitcoinCashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.native.legacy.path,
            MOCK_TESTNET_ADDRESS_DATA.native.legacy.privateKey,
            "legacy"
          );

          expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.native.legacy);
        });

        it("Imports correct cashAddr item", () => {
          const credential = bitcoinCashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.native.cashAddr.path,
            MOCK_TESTNET_ADDRESS_DATA.native.cashAddr.privateKey,
            "cashAddr"
          );

          expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.native.cashAddr);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct legacy item", () => {
          const credential = bitcoinCashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy.path,
            MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy.privateKey,
            "legacy"
          );

          expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy);
        });

        it("Imports correct cashAddr item", () => {
          const credential = bitcoinCashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.nonNative.cashAddr.path,
            MOCK_TESTNET_ADDRESS_DATA.nonNative.cashAddr.privateKey,
            "cashAddr"
          );

          expect(credential).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative.cashAddr);
        });
      });
    });
  });

  describe("regtest", () => {
    describe("derive", () => {
      it("Derives correct legacy item", () => {
        const derivedItem = bitcoinCashRegtest.derive(
          MOCK_REGTEST_ADDRESS_DATA.native.legacy.path,
          "legacy"
        );

        expect(MOCK_REGTEST_ADDRESS_DATA.native.legacy).toEqual(derivedItem);
      });

      it("Derives correct cashAddr item", () => {
        const derivedItem = bitcoinCashRegtest.derive(
          MOCK_REGTEST_ADDRESS_DATA.native.cashAddr.path,
          "cashAddr"
        );

        expect(MOCK_REGTEST_ADDRESS_DATA.native.cashAddr).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct legacy item", () => {
          const credential = bitcoinCashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.native.legacy.path,
            MOCK_REGTEST_ADDRESS_DATA.native.legacy.privateKey,
            "legacy"
          );

          expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.native.legacy);
        });

        it("Imports correct cashAddr item", () => {
          const credential = bitcoinCashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.native.cashAddr.path,
            MOCK_REGTEST_ADDRESS_DATA.native.cashAddr.privateKey,
            "cashAddr"
          );

          expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.native.cashAddr);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct legacy item", () => {
          const credential = bitcoinCashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.nonNative.legacy.path,
            MOCK_REGTEST_ADDRESS_DATA.nonNative.legacy.privateKey,
            "legacy"
          );

          expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative.legacy);
        });

        it("Imports correct cashAddr item", () => {
          const credential = bitcoinCashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.nonNative.cashAddr.path,
            MOCK_REGTEST_ADDRESS_DATA.nonNative.cashAddr.privateKey,
            "cashAddr"
          );

          expect(credential).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative.cashAddr);
        });
      });
    });
  });
});
