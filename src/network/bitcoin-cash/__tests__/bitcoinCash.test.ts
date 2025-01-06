import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { BitcoinCash } from "../bitcoinCash.network.js";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = "m/44'/145'/0'/0/0";

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    privateKey: "Kysn6FCsYUwSwYVdUD4c6kdntJeZCZWpPYPj6LjEV2pDPyWNFhjX",
    publicKey: "0333d222cc1fd501e74b6d64cb1e4dd85bbcb28d9ce3fd6a30133f5aa6211a8fc3",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    privateKey: "KxUYbZfVLLEFehzKcNXJSJvmBjbYswf9ZEsasfH5vFbdvvwS1F31",
    publicKey: "03d3a1e1860cf3946b00ee9831a8df63557b820e71a004a842bb12e0dd1acb6c6a",
    path: MOCK_COMMON_DERIVATION_PATH,
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
    ...MOCK_COMMON_MAINNET_ADDRESS_DATA.native,
    privateKey: "cQEmZACiyYdi6yxtrcsjU58rWXwxs1cWTaYCCmBjz9UDeiXPuAjp",
  },
  nonNative: {
    ...MOCK_COMMON_MAINNET_ADDRESS_DATA.nonNative,
    privateKey: "cNqY4UfLmPvWp9TaznLRodRpoxtxYPkqdH23z5jbRNFeBg39dg4L",
  },
};

const MOCK_TESTNET_ADDRESS_DATA = {
  native: {
    legacy: {
      ...MOCK_COMMON_TESTNET_ADDRESS_DATA.native,
      address: "n3XkFdF1uRXJcbGhvVadfgqcMe18L2M4Tc",
    },
    cashAddr: {
      ...MOCK_COMMON_TESTNET_ADDRESS_DATA.native,
      address: "bchtest:qrchjgvn4keqa6qwesjvywyj2fy46x2ex5sgzuxsdq",
    },
  },
  nonNative: {
    legacy: {
      ...MOCK_COMMON_TESTNET_ADDRESS_DATA.nonNative,
      address: "mraJ6VfzYaTxvPdxaT7dVngSBt8SmH4bF2",
    },
    cashAddr: {
      ...MOCK_COMMON_TESTNET_ADDRESS_DATA.nonNative,
      address: "bchtest:qpu5k2gfmn34jmlmqjtyqvmq75753sq63y3eqmmrrw",
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
      address: "bchreg:qrchjgvn4keqa6qwesjvywyj2fy46x2ex5sgzuxsdq",
    },
  },
  nonNative: {
    legacy: {
      ...MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy,
    },
    cashAddr: {
      ...MOCK_TESTNET_ADDRESS_DATA.nonNative.cashAddr,
      address: "bchreg:qpu5k2gfmn34jmlmqjtyqvmq75753sq63y3eqmmrrw",
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
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinCashMainnet.getAddressData(
          MOCK_MAINNET_ADDRESS_DATA.native.legacy.path,
          "legacy"
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.native.legacy).toEqual(addressData);
      });

      it("Generates correct cashAddr address data", () => {
        const addressData = bitcoinCashMainnet.getAddressData(
          MOCK_MAINNET_ADDRESS_DATA.native.cashAddr.path,
          "cashAddr"
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.native.cashAddr).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a private key from a native mnemonic", () => {
        it("Imports correct legacy address data", () => {
          const addressData = bitcoinCashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.legacy.path,
            MOCK_MAINNET_ADDRESS_DATA.native.legacy.privateKey,
            "legacy"
          );

          expect(addressData).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.legacy);
        });

        it("Imports correct cashAddr address data", () => {
          const addressData = bitcoinCashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.cashAddr.path,
            MOCK_MAINNET_ADDRESS_DATA.native.cashAddr.privateKey,
            "cashAddr"
          );

          expect(addressData).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.cashAddr);
        });
      });

      describe("Import from a private key from a non-native mnemonic", () => {
        it("Imports correct legacy address data", () => {
          const addressData = bitcoinCashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.legacy.path,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.legacy.privateKey,
            "legacy"
          );

          expect(addressData).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.legacy);
        });

        it("Imports correct cashAddr address data", () => {
          const addressData = bitcoinCashMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.cashAddr.path,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.cashAddr.privateKey,
            "cashAddr"
          );

          expect(addressData).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.cashAddr);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinCashTestnet.getAddressData(
          MOCK_TESTNET_ADDRESS_DATA.native.legacy.path,
          "legacy"
        );

        expect(MOCK_TESTNET_ADDRESS_DATA.native.legacy).toEqual(addressData);
      });

      it("Generates correct cashAddr address data", () => {
        const addressData = bitcoinCashTestnet.getAddressData(
          MOCK_TESTNET_ADDRESS_DATA.native.cashAddr.path,
          "cashAddr"
        );

        expect(MOCK_TESTNET_ADDRESS_DATA.native.cashAddr).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a private key from a native mnemonic", () => {
        it("Imports correct legacy address data", () => {
          const addressData = bitcoinCashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.native.legacy.path,
            MOCK_TESTNET_ADDRESS_DATA.native.legacy.privateKey,
            "legacy"
          );

          expect(addressData).toEqual(MOCK_TESTNET_ADDRESS_DATA.native.legacy);
        });

        it("Imports correct cashAddr address data", () => {
          const addressData = bitcoinCashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.native.cashAddr.path,
            MOCK_TESTNET_ADDRESS_DATA.native.cashAddr.privateKey,
            "cashAddr"
          );

          expect(addressData).toEqual(MOCK_TESTNET_ADDRESS_DATA.native.cashAddr);
        });
      });

      describe("Import from a private key from a non-native mnemonic", () => {
        it("Imports correct legacy address data", () => {
          const addressData = bitcoinCashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy.path,
            MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy.privateKey,
            "legacy"
          );

          expect(addressData).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative.legacy);
        });

        it("Imports correct cashAddr address data", () => {
          const addressData = bitcoinCashTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.nonNative.cashAddr.path,
            MOCK_TESTNET_ADDRESS_DATA.nonNative.cashAddr.privateKey,
            "cashAddr"
          );

          expect(addressData).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative.cashAddr);
        });
      });
    });
  });

  describe("regtest", () => {
    describe("getAddressData", () => {
      it("Generates correct legacy address data", () => {
        const addressData = bitcoinCashRegtest.getAddressData(
          MOCK_REGTEST_ADDRESS_DATA.native.legacy.path,
          "legacy"
        );

        expect(MOCK_REGTEST_ADDRESS_DATA.native.legacy).toEqual(addressData);
      });

      it("Generates correct cashAddr address data", () => {
        const addressData = bitcoinCashRegtest.getAddressData(
          MOCK_REGTEST_ADDRESS_DATA.native.cashAddr.path,
          "cashAddr"
        );

        expect(MOCK_REGTEST_ADDRESS_DATA.native.cashAddr).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a private key from a native mnemonic", () => {
        it("Imports correct legacy address data", () => {
          const addressData = bitcoinCashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.native.legacy.path,
            MOCK_REGTEST_ADDRESS_DATA.native.legacy.privateKey,
            "legacy"
          );

          expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.native.legacy);
        });

        it("Imports correct cashAddr address data", () => {
          const addressData = bitcoinCashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.native.cashAddr.path,
            MOCK_REGTEST_ADDRESS_DATA.native.cashAddr.privateKey,
            "cashAddr"
          );

          expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.native.cashAddr);
        });
      });

      describe("Import from a private key from a non-native mnemonic", () => {
        it("Imports correct legacy address data", () => {
          const addressData = bitcoinCashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.nonNative.legacy.path,
            MOCK_REGTEST_ADDRESS_DATA.nonNative.legacy.privateKey,
            "legacy"
          );

          expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative.legacy);
        });

        it("Imports correct cashAddr address data", () => {
          const addressData = bitcoinCashRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.nonNative.cashAddr.path,
            MOCK_REGTEST_ADDRESS_DATA.nonNative.cashAddr.privateKey,
            "cashAddr"
          );

          expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative.cashAddr);
        });
      });
    });
  });
});
