import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Cardano } from "../cardano.network.js";

const MNEMONIC =
  "relax grief spatial deer glass fish column rifle square license dry jealous water spoon salon";

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  enterprise: {
    mnemonic: MNEMONIC,
    address: "addr1vy55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48skpr66m",
    privateKey:
      "e064be3c720832a235807601a93d7681a9d802342da100972e748505836cd84d1e2f7a95607e5726e4d95f833d698668b526c361150f925cac0af419c935dfa7",
    publicKey: "d6d4d074388d31c86b6e348f4218a6e6bd3682c2d89f0ee3b3908486d0b61ea6",
    path: "m/1852'/1815'/0'/0/0",
  },
  reward: {
    mnemonic: MNEMONIC,
    address: "stake1uxhhajkk9gu4xl8p34hqen7fay2j529h8ynlk0t9yq8ujfg4rqhxx",
    privateKey:
      "d83a9bc8cc31735a679e31a6a1f57ba0f9601049dce1c9367a58fed9876cd84dfacca5ca6455fef78d27a679b86b853f08c4d733cccd59d2d1e759ff31d675a0",
    publicKey: "6634f8c5e7608e330bac48b22fc400ead26622ce29344507228698960419533e",
    path: "m/1852'/1815'/0'/2/0",
  },
  base: {
    mnemonic: MNEMONIC,
    address:
      "addr1qy55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48400m9dv23e2d7wrrtwpn8un6g49g5twwf8lv7k2gq0eyjseme3ur",
    enterprisePrivateKey:
      "e064be3c720832a235807601a93d7681a9d802342da100972e748505836cd84d1e2f7a95607e5726e4d95f833d698668b526c361150f925cac0af419c935dfa7",
    enterprisePublicKey: "d6d4d074388d31c86b6e348f4218a6e6bd3682c2d89f0ee3b3908486d0b61ea6",
    enterprisePath: "m/1852'/1815'/0'/0/0",
    rewardPrivateKey:
      "d83a9bc8cc31735a679e31a6a1f57ba0f9601049dce1c9367a58fed9876cd84dfacca5ca6455fef78d27a679b86b853f08c4d733cccd59d2d1e759ff31d675a0",
    rewardPublicKey: "6634f8c5e7608e330bac48b22fc400ead26622ce29344507228698960419533e",
    rewardPath: "m/1852'/1815'/0'/2/0",
  },
};

const MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA = {
  enterprise: {
    ...MOCK_COMMON_MAINNET_ADDRESS_DATA.enterprise,
    address: "addr_test1vq55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48sdfhx47",
  },
  reward: {
    ...MOCK_COMMON_MAINNET_ADDRESS_DATA.reward,
    address: "stake_test1uzhhajkk9gu4xl8p34hqen7fay2j529h8ynlk0t9yq8ujfgjf24zm",
  },
  base: {
    ...MOCK_COMMON_MAINNET_ADDRESS_DATA.base,
    address:
      "addr_test1qq55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48400m9dv23e2d7wrrtwpn8un6g49g5twwf8lv7k2gq0eyjs6dy3su",
  },
};

const MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA = {
  enterprise: {
    ...MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.enterprise,
  },
  reward: {
    ...MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.reward,
  },
  base: {
    ...MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.base,
  },
};

let mnemonic: Mnemonic;
let cardanoMainnet: Cardano;
let cardanoTestnetPreview: Cardano;
let cardanoTestnetPreprod: Cardano;

beforeEach(() => {
  mnemonic = new Mnemonic(MNEMONIC);
  cardanoMainnet = new Cardano(mnemonic, "mainnet");
  cardanoTestnetPreview = new Cardano(mnemonic, "testnetPreview");
  cardanoTestnetPreprod = new Cardano(mnemonic, "testnetPreprod");
});

describe("Cardano", () => {
  describe("mainnet", () => {
    describe("getAddressData", () => {
      it("Generates correct enterprise address data", () => {
        const addressData = cardanoMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.enterprise.path,
          "enterprise"
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.enterprise).toEqual(addressData);
      });

      it("Generates correct reward address data", () => {
        const addressData = cardanoMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.reward.path,
          "reward"
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.reward).toEqual(addressData);
      });

      it("Generates correct base address data", () => {
        const addressData = cardanoMainnet.getAddressData(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.base.enterprisePath,
          "base"
        );

        expect(MOCK_COMMON_MAINNET_ADDRESS_DATA.base).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct enterprise address data", () => {
        console.log(MOCK_COMMON_MAINNET_ADDRESS_DATA.enterprise.path);
        console.log(MOCK_COMMON_MAINNET_ADDRESS_DATA.enterprise.privateKey);
        const addressData = cardanoMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.enterprise.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.enterprise.privateKey,
          "enterprise"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.enterprise);
      });

      it("Imports correct reward address data", () => {
        const addressData = cardanoMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.reward.path,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.reward.privateKey,
          "reward"
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.reward);
      });

      it("Imports correct base address data", () => {
        const addressData = cardanoMainnet.importByPrivateKey(
          MOCK_COMMON_MAINNET_ADDRESS_DATA.base.enterprisePath,
          MOCK_COMMON_MAINNET_ADDRESS_DATA.base.enterprisePrivateKey,
          "base",
          MOCK_COMMON_MAINNET_ADDRESS_DATA.base.rewardPrivateKey
        );

        expect(addressData).toEqual(MOCK_COMMON_MAINNET_ADDRESS_DATA.base);
      });
    });
  });

  describe("testnet preview", () => {
    describe("getAddressData", () => {
      it("Generates correct enterprise address data", () => {
        const addressData = cardanoTestnetPreview.getAddressData(
          MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.enterprise.path,
          "enterprise"
        );

        expect(MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.enterprise).toEqual(addressData);
      });

      it("Generates correct reward address data", () => {
        const addressData = cardanoTestnetPreview.getAddressData(
          MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.reward.path,
          "reward"
        );

        expect(MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.reward).toEqual(addressData);
      });

      it("Generates correct base address data", () => {
        const addressData = cardanoTestnetPreview.getAddressData(
          MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.base.enterprisePath,
          "base"
        );

        expect(MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.base).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct enterprise address data", () => {
        const addressData = cardanoTestnetPreview.importByPrivateKey(
          MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.enterprise.path,
          MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.enterprise.privateKey,
          "enterprise"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.enterprise);
      });

      it("Imports correct reward address data", () => {
        const addressData = cardanoTestnetPreview.importByPrivateKey(
          MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.reward.path,
          MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.reward.privateKey,
          "reward"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.reward);
      });

      it("Imports correct base address data", () => {
        const addressData = cardanoTestnetPreview.importByPrivateKey(
          MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.base.enterprisePath,
          MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.base.enterprisePrivateKey,
          "base",
          MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.base.rewardPrivateKey
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_PREVIEW_ADDRESS_DATA.base);
      });
    });
  });

  describe("testnet preprod", () => {
    describe("getAddressData", () => {
      it("Generates correct enterprise address data", () => {
        const addressData = cardanoTestnetPreprod.getAddressData(
          MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.enterprise.path,
          "enterprise"
        );

        expect(MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.enterprise).toEqual(addressData);
      });

      it("Generates correct reward address data", () => {
        const addressData = cardanoTestnetPreprod.getAddressData(
          MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.reward.path,
          "reward"
        );

        expect(MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.reward).toEqual(addressData);
      });

      it("Generates correct base address data", () => {
        const addressData = cardanoTestnetPreprod.getAddressData(
          MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.base.enterprisePath,
          "base"
        );

        expect(MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.base).toEqual(addressData);
      });
    });

    describe("importByPrivateKey", () => {
      it("Imports correct enterprise address data", () => {
        const addressData = cardanoTestnetPreprod.importByPrivateKey(
          MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.enterprise.path,
          MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.enterprise.privateKey,
          "enterprise"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.enterprise);
      });

      it("Imports correct reward address data", () => {
        const addressData = cardanoTestnetPreprod.importByPrivateKey(
          MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.reward.path,
          MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.reward.privateKey,
          "reward"
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.reward);
      });

      it("Imports correct base address data", () => {
        const addressData = cardanoTestnetPreprod.importByPrivateKey(
          MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.base.enterprisePath,
          MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.base.enterprisePrivateKey,
          "base",
          MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.base.rewardPrivateKey
        );

        expect(addressData).toEqual(MOCK_COMMON_TESTNET_PREPROD_ADDRESS_DATA.base);
      });
    });
  });
});
