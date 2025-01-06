import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Dogecoin } from "../dogecoin.network.js";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";

const MNEMONIC = "drill exotic title fall ivory boy praise unfold search foil surge tip";

const MOCK_COMMON_DERIVATION_PATH = "m/44'/3'/0'/0/0";

const MOCK_MAINNET_ADDRESS_DATA = {
  native: {
    mnemonic: MNEMONIC,
    address: "DTdPxCi432Vu2yQZqQYAeFBtJMsATtFeyc",
    privateKey: "QSziipfZmwGTd67cn9qQ5xCGpF8tC8bU2JeVVd2HwLWBdkMWVVqC",
    publicKey: "03ba5622f900d6eda980366d9b6f3eb319681727870d5e520df1d4964c5f6f1020",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
  nonNative: {
    mnemonic: EMPTY_MNEMONIC,
    address: "DMgym4pWdstBAgK6jCTe76sM6YTftznm19",
    privateKey: "QUUWv51Jn4XyzD3p1tFQpt12ezFDNt6WgTtaCbdTMXQy284vHCD7",
    publicKey: "0309080b819078aee24872876349d2f3b3272e8f94bea5686da70e1f331e6c8c7b",
    path: MOCK_COMMON_DERIVATION_PATH,
  },
};

const MOCK_TESTNET_ADDRESS_DATA = {
  native: {
    ...MOCK_MAINNET_ADDRESS_DATA.native,
    address: "nrgTgDSxxzxcuwyksEBctenBYEFTS3suSn",
    privateKey: "cj84BDaEJhJsW3DNgSbXAQ3hUJp2Us6oXyMJwKn9h44G1Dob6ALp",
  },
  nonNative: {
    ...MOCK_MAINNET_ADDRESS_DATA.nonNative,
    address: "nkk3V5ZRZrLu3etHm276MWTeLQqxqVtSqs",
    privateKey: "ckbrNTuyJpaPsA9ZvB1XuKrTK3vMfcbrC8bPeJPK7Ey3PbXzosPo",
  },
};

const MOCK_REGTEST_ADDRESS_DATA = {
  native: {
    ...MOCK_MAINNET_ADDRESS_DATA.native,
    address: "n41FhzrPYe2sH5hapPWyvQEcHDja1MvsS8",
    privateKey: "cRxo2trRxPUbZ1BqaHoja3riySQip2ZMD673pR5xi6YqSZTxTcsK",
  },
  nonNative: {
    ...MOCK_MAINNET_ADDRESS_DATA.nonNative,
    address: "mx4qWrxr9VR9Qnc7iBSTPFv55QL5Sq9rYj",
    privateKey: "cTSbE9CAxWk7v882p2DkJyfUpBX3zn4PsFM8XPh88HTcpw8JafxY",
  },
};

let mnemonic: Mnemonic;
let dogecoinMainnet: Dogecoin;
let dogecoinTestnet: Dogecoin;
let dogecoinRegtest: Dogecoin;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  dogecoinMainnet = new Dogecoin(mnemonic, "mainnet");
  dogecoinTestnet = new Dogecoin(mnemonic, "testnet");
  dogecoinRegtest = new Dogecoin(mnemonic, "regtest");
});

describe("Dogecoin", () => {
  describe("mainnet", () => {
    describe("getAddressData", () => {
      it("Generates correct address data", () => {
        const addressData = dogecoinMainnet.getAddressData(MOCK_MAINNET_ADDRESS_DATA.native.path);

        expect(addressData).toEqual(MOCK_MAINNET_ADDRESS_DATA.native);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct address data", () => {
          const addressData = dogecoinMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.path,
            MOCK_MAINNET_ADDRESS_DATA.native.privateKey
          );

          expect(addressData).toEqual(MOCK_MAINNET_ADDRESS_DATA.native);
        });
      });
      describe("Import from a non-native mnemonic", () => {
        it("Imports correct address data", () => {
          const addressData = dogecoinMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.path,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.privateKey
          );

          expect(addressData).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative);
        });
      });
    });
  });

  describe("testnet", () => {
    describe("getAddressData", () => {
      it("Generates correct address data", () => {
        const addressData = dogecoinTestnet.getAddressData(MOCK_TESTNET_ADDRESS_DATA.native.path);

        expect(addressData).toEqual(MOCK_TESTNET_ADDRESS_DATA.native);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct address data", () => {
          const addressData = dogecoinTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.native.path,
            MOCK_TESTNET_ADDRESS_DATA.native.privateKey
          );

          expect(addressData).toEqual(MOCK_TESTNET_ADDRESS_DATA.native);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct address data", () => {
          const addressData = dogecoinTestnet.importByPrivateKey(
            MOCK_TESTNET_ADDRESS_DATA.nonNative.path,
            MOCK_TESTNET_ADDRESS_DATA.nonNative.privateKey
          );

          expect(addressData).toEqual(MOCK_TESTNET_ADDRESS_DATA.nonNative);
        });
      });
    });
  });

  describe("regtest", () => {
    describe("getAddressData", () => {
      it("Generates correct address data", () => {
        const addressData = dogecoinRegtest.getAddressData(MOCK_REGTEST_ADDRESS_DATA.native.path);

        expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.native);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct address data", () => {
          const addressData = dogecoinRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.native.path,
            MOCK_REGTEST_ADDRESS_DATA.native.privateKey
          );

          expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.native);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct address data", () => {
          const addressData = dogecoinRegtest.importByPrivateKey(
            MOCK_REGTEST_ADDRESS_DATA.nonNative.path,
            MOCK_REGTEST_ADDRESS_DATA.nonNative.privateKey
          );

          expect(addressData).toEqual(MOCK_REGTEST_ADDRESS_DATA.nonNative);
        });
      });
    });
  });
});
