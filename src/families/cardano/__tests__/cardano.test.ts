import { Mnemonic } from "@/mnemonic/index.js";
import { describe, it, expect } from "vitest";
import { Cardano } from "../cardano.network.js";
import { EMPTY_MNEMONIC } from "@/address/constants/index.js";
import { AddressList } from "@/address/index.js";

const MNEMONIC =
  "relax grief spatial deer glass fish column rifle square license dry jealous water spoon salon";

const MOCK_COMMON_DERIVATION_PATH = {
  enterprise: "m/1852'/1815'/0'/0/0",
  reward: "m/1852'/1815'/0'/2/0",
};

const MOCK_COMMON_MAINNET_ADDRESS_DATA = {
  native: {
    enterprise: {
      privateKey:
        "e064be3c720832a235807601a93d7681a9d802342da100972e748505836cd84d1e2f7a95607e5726e4d95f833d698668b526c361150f925cac0af419c935dfa7",
      publicKey: "d6d4d074388d31c86b6e348f4218a6e6bd3682c2d89f0ee3b3908486d0b61ea6",
      path: MOCK_COMMON_DERIVATION_PATH.enterprise,
    },
    reward: {
      privateKey:
        "d83a9bc8cc31735a679e31a6a1f57ba0f9601049dce1c9367a58fed9876cd84dfacca5ca6455fef78d27a679b86b853f08c4d733cccd59d2d1e759ff31d675a0",
      publicKey: "6634f8c5e7608e330bac48b22fc400ead26622ce29344507228698960419533e",
      path: MOCK_COMMON_DERIVATION_PATH.reward,
    },
  },
  nonNative: {
    enterprise: {
      privateKey:
        "301e186987de764dfa02e84b883597236479568f79aa57ea656ddd5464e626598e1951feeca2013fe1376b090cc5ec077445f37df82428776280d5e67ee36c7b",
      publicKey: "81183f3a111e2cf2e399afe3ca0b5cbbff894bfc3fb5f5ac3903b92167cf7bff",
      path: MOCK_COMMON_DERIVATION_PATH.enterprise,
    },
    reward: {
      privateKey:
        "f08123cd07c0580c3fbf8dd5a7aa15008c74b0316349a300fa03dfdb6ae6265969b7300e93dc1a57026518c60993d0cce7392d40137f721e49f716b90dbc9cd8",
      publicKey: "29067dcb3f8e44c543f69302b794d59b2f693adab3723f8270840de509025c76",
      path: MOCK_COMMON_DERIVATION_PATH.reward,
    },
  },
};

const MOCK_MAINNET_ADDRESS_DATA = {
  native: {
    enterprise: {
      ...MOCK_COMMON_MAINNET_ADDRESS_DATA.native.enterprise,
      mnemonic: MNEMONIC,
      address: "addr1vy55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48skpr66m",
    },
    reward: {
      ...MOCK_COMMON_MAINNET_ADDRESS_DATA.native.reward,
      mnemonic: MNEMONIC,
      address: "stake1uxhhajkk9gu4xl8p34hqen7fay2j529h8ynlk0t9yq8ujfg4rqhxx",
    },
    base: {
      mnemonic: MNEMONIC,
      address:
        "addr1qy55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48400m9dv23e2d7wrrtwpn8un6g49g5twwf8lv7k2gq0eyjseme3ur",
      enterprisePrivateKey: MOCK_COMMON_MAINNET_ADDRESS_DATA.native.enterprise.privateKey,
      enterprisePublicKey: MOCK_COMMON_MAINNET_ADDRESS_DATA.native.enterprise.publicKey,
      enterprisePath: MOCK_COMMON_MAINNET_ADDRESS_DATA.native.enterprise.path,
      rewardPrivateKey: MOCK_COMMON_MAINNET_ADDRESS_DATA.native.reward.privateKey,
      rewardPublicKey: MOCK_COMMON_MAINNET_ADDRESS_DATA.native.reward.publicKey,
      rewardPath: MOCK_COMMON_MAINNET_ADDRESS_DATA.native.reward.path,
    },
  },
  nonNative: {
    enterprise: {
      ...MOCK_COMMON_MAINNET_ADDRESS_DATA.nonNative.enterprise,
      mnemonic: EMPTY_MNEMONIC,
      address: "addr1vyd67wvkdm4cp84qw0hpj8ddqj3slqktg5td790qlesnr9gpsmq8w",
    },
    reward: {
      ...MOCK_COMMON_MAINNET_ADDRESS_DATA.nonNative.reward,
      mnemonic: EMPTY_MNEMONIC,
      address: "stake1u8gggeaf6dfjwtydh3ee7mmtgpme2736s5y20q94jqedg6gs43n79",
    },
    base: {
      mnemonic: EMPTY_MNEMONIC,
      address:
        "addr1qyd67wvkdm4cp84qw0hpj8ddqj3slqktg5td790qlesnr9wss3n6n56nyukgm0rnnahkksrhj4ar4pgg57qttypj635sklawma",
      enterprisePrivateKey: MOCK_COMMON_MAINNET_ADDRESS_DATA.nonNative.enterprise.privateKey,
      enterprisePublicKey: MOCK_COMMON_MAINNET_ADDRESS_DATA.nonNative.enterprise.publicKey,
      enterprisePath: MOCK_COMMON_MAINNET_ADDRESS_DATA.nonNative.enterprise.path,
      rewardPrivateKey: MOCK_COMMON_MAINNET_ADDRESS_DATA.nonNative.reward.privateKey,
      rewardPublicKey: MOCK_COMMON_MAINNET_ADDRESS_DATA.nonNative.reward.publicKey,
      rewardPath: MOCK_COMMON_MAINNET_ADDRESS_DATA.nonNative.reward.path,
    },
  },
};

const MOCK_TESTNET_PREVIEW_ADDRESS_DATA = {
  native: {
    enterprise: {
      ...MOCK_MAINNET_ADDRESS_DATA.native.enterprise,
      address: "addr_test1vq55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48sdfhx47",
    },
    reward: {
      ...MOCK_MAINNET_ADDRESS_DATA.native.reward,
      address: "stake_test1uzhhajkk9gu4xl8p34hqen7fay2j529h8ynlk0t9yq8ujfgjf24zm",
    },
    base: {
      ...MOCK_MAINNET_ADDRESS_DATA.native.base,
      address:
        "addr_test1qq55py2lewnz4suyqg9jxnk6ra6tnuqlt5yjzhdzyyzk48400m9dv23e2d7wrrtwpn8un6g49g5twwf8lv7k2gq0eyjs6dy3su",
    },
  },
  nonNative: {
    enterprise: {
      ...MOCK_MAINNET_ADDRESS_DATA.nonNative.enterprise,
      address: "addr_test1vqd67wvkdm4cp84qw0hpj8ddqj3slqktg5td790qlesnr9g6c0ugt",
    },
    reward: {
      ...MOCK_MAINNET_ADDRESS_DATA.nonNative.reward,
      address: "stake_test1urgggeaf6dfjwtydh3ee7mmtgpme2736s5y20q94jqedg6ghlm36c",
    },
    base: {
      ...MOCK_MAINNET_ADDRESS_DATA.nonNative.base,
      address:
        "addr_test1qqd67wvkdm4cp84qw0hpj8ddqj3slqktg5td790qlesnr9wss3n6n56nyukgm0rnnahkksrhj4ar4pgg57qttypj635s4fqwhz",
    },
  },
};

const MOCK_TESTNET_PREPROD_ADDRESS_DATA = {
  native: {
    enterprise: {
      ...MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.enterprise,
    },
    reward: {
      ...MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.reward,
    },
    base: {
      ...MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.base,
    },
  },
  nonNative: {
    enterprise: {
      ...MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.enterprise,
    },
    reward: {
      ...MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.reward,
    },
    base: {
      ...MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.base,
    },
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
    describe("derive", () => {
      it("Derives correct enterprise item", () => {
        const derivedItem = cardanoMainnet.derive(
          MOCK_MAINNET_ADDRESS_DATA.native.enterprise.path,
          AddressList.ADA_ENTERPRISE
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.native.enterprise).toEqual(derivedItem);
      });

      it("Derives correct reward item", () => {
        const derivedItem = cardanoMainnet.derive(
          MOCK_MAINNET_ADDRESS_DATA.native.reward.path,
          AddressList.ADA_REWARD
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.native.reward).toEqual(derivedItem);
      });

      it("Derives correct base item", () => {
        const derivedItem = cardanoMainnet.derive(
          MOCK_MAINNET_ADDRESS_DATA.native.base.enterprisePath,
          AddressList.ADA_BASE
        );

        expect(MOCK_MAINNET_ADDRESS_DATA.native.base).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct enterprise item", () => {
          const credential = cardanoMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.enterprise.path,
            MOCK_MAINNET_ADDRESS_DATA.native.enterprise.privateKey,
            AddressList.ADA_ENTERPRISE
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.enterprise);
        });

        it("Imports correct reward item", () => {
          const credential = cardanoMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.reward.path,
            MOCK_MAINNET_ADDRESS_DATA.native.reward.privateKey,
            AddressList.ADA_REWARD
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.reward);
        });

        it("Imports correct base item", () => {
          const credential = cardanoMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.native.base.enterprisePath,
            MOCK_MAINNET_ADDRESS_DATA.native.base.enterprisePrivateKey,
            AddressList.ADA_BASE,
            MOCK_MAINNET_ADDRESS_DATA.native.base.rewardPrivateKey
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.native.base);
        });
      });
      describe("Import from a non-native mnemonic", () => {
        it("Imports correct enterprise item", () => {
          const credential = cardanoMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.enterprise.path,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.enterprise.privateKey,
            AddressList.ADA_ENTERPRISE
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.enterprise);
        });

        it("Imports correct reward item", () => {
          const credential = cardanoMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.reward.path,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.reward.privateKey,
            AddressList.ADA_REWARD
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.reward);
        });

        it("Imports correct base item", () => {
          const credential = cardanoMainnet.importByPrivateKey(
            MOCK_MAINNET_ADDRESS_DATA.nonNative.base.enterprisePath,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.base.enterprisePrivateKey,
            AddressList.ADA_BASE,
            MOCK_MAINNET_ADDRESS_DATA.nonNative.base.rewardPrivateKey
          );

          expect(credential).toEqual(MOCK_MAINNET_ADDRESS_DATA.nonNative.base);
        });
      });
    });
  });

  describe("testnet preview", () => {
    describe("derive", () => {
      it("Derives correct enterprise item", () => {
        const derivedItem = cardanoTestnetPreview.derive(
          MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.enterprise.path,
          AddressList.ADA_ENTERPRISE
        );

        expect(MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.enterprise).toEqual(derivedItem);
      });

      it("Derives correct reward item", () => {
        const derivedItem = cardanoTestnetPreview.derive(
          MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.reward.path,
          AddressList.ADA_REWARD
        );

        expect(MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.reward).toEqual(derivedItem);
      });

      it("Derives correct base item", () => {
        const derivedItem = cardanoTestnetPreview.derive(
          MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.base.enterprisePath,
          AddressList.ADA_BASE
        );

        expect(MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.base).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct enterprise item", () => {
          const credential = cardanoTestnetPreview.importByPrivateKey(
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.enterprise.path,
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.enterprise.privateKey,
            AddressList.ADA_ENTERPRISE
          );

          expect(credential).toEqual(MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.enterprise);
        });

        it("Imports correct reward item", () => {
          const credential = cardanoTestnetPreview.importByPrivateKey(
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.reward.path,
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.reward.privateKey,
            AddressList.ADA_REWARD
          );

          expect(credential).toEqual(MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.reward);
        });

        it("Imports correct base item", () => {
          const credential = cardanoTestnetPreview.importByPrivateKey(
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.base.enterprisePath,
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.base.enterprisePrivateKey,
            AddressList.ADA_BASE,
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.base.rewardPrivateKey
          );

          expect(credential).toEqual(MOCK_TESTNET_PREVIEW_ADDRESS_DATA.native.base);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct enterprise item", () => {
          const credential = cardanoTestnetPreview.importByPrivateKey(
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.enterprise.path,
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.enterprise.privateKey,
            AddressList.ADA_ENTERPRISE
          );

          expect(credential).toEqual(MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.enterprise);
        });

        it("Imports correct reward item", () => {
          const credential = cardanoTestnetPreview.importByPrivateKey(
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.reward.path,
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.reward.privateKey,
            AddressList.ADA_REWARD
          );

          expect(credential).toEqual(MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.reward);
        });

        it("Imports correct base item", () => {
          const credential = cardanoTestnetPreview.importByPrivateKey(
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.base.enterprisePath,
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.base.enterprisePrivateKey,
            AddressList.ADA_BASE,
            MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.base.rewardPrivateKey
          );

          expect(credential).toEqual(MOCK_TESTNET_PREVIEW_ADDRESS_DATA.nonNative.base);
        });
      });
    });
  });

  describe("testnet preprod", (derivedItem) => {
    describe("derive", () => {
      it("Derives correct enterprise item", () => {
        const derivedItem = cardanoTestnetPreprod.derive(
          MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.enterprise.path,
          AddressList.ADA_ENTERPRISE
        );

        expect(MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.enterprise).toEqual(derivedItem);
      });

      it("Derives correct reward item", () => {
        const derivedItem = cardanoTestnetPreprod.derive(
          MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.reward.path,
          AddressList.ADA_REWARD
        );

        expect(MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.reward).toEqual(derivedItem);
      });

      it("Derives correct base item", () => {
        const derivedItem = cardanoTestnetPreprod.derive(
          MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.base.enterprisePath,
          AddressList.ADA_BASE
        );

        expect(MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.base).toEqual(derivedItem);
      });
    });

    describe("importByPrivateKey", () => {
      describe("Import from a native mnemonic", () => {
        it("Imports correct enterprise item", () => {
          const credential = cardanoTestnetPreprod.importByPrivateKey(
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.enterprise.path,
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.enterprise.privateKey,
            AddressList.ADA_ENTERPRISE
          );

          expect(credential).toEqual(MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.enterprise);
        });

        it("Imports correct reward item", () => {
          const credential = cardanoTestnetPreprod.importByPrivateKey(
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.reward.path,
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.reward.privateKey,
            AddressList.ADA_REWARD
          );

          expect(credential).toEqual(MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.reward);
        });

        it("Imports correct base item", () => {
          const credential = cardanoTestnetPreprod.importByPrivateKey(
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.base.enterprisePath,
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.base.enterprisePrivateKey,
            AddressList.ADA_BASE,
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.base.rewardPrivateKey
          );

          expect(credential).toEqual(MOCK_TESTNET_PREPROD_ADDRESS_DATA.native.base);
        });
      });

      describe("Import from a non-native mnemonic", () => {
        it("Imports correct enterprise item", () => {
          const credential = cardanoTestnetPreprod.importByPrivateKey(
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.nonNative.enterprise.path,
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.nonNative.enterprise.privateKey,
            AddressList.ADA_ENTERPRISE
          );

          expect(credential).toEqual(MOCK_TESTNET_PREPROD_ADDRESS_DATA.nonNative.enterprise);
        });

        it("Imports correct reward item", () => {
          const credential = cardanoTestnetPreprod.importByPrivateKey(
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.nonNative.reward.path,
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.nonNative.reward.privateKey,
            AddressList.ADA_REWARD
          );

          expect(credential).toEqual(MOCK_TESTNET_PREPROD_ADDRESS_DATA.nonNative.reward);
        });

        it("Imports correct base item", () => {
          const credential = cardanoTestnetPreprod.importByPrivateKey(
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.nonNative.base.enterprisePath,
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.nonNative.base.enterprisePrivateKey,
            AddressList.ADA_BASE,
            MOCK_TESTNET_PREPROD_ADDRESS_DATA.nonNative.base.rewardPrivateKey
          );

          expect(credential).toEqual(MOCK_TESTNET_PREPROD_ADDRESS_DATA.nonNative.base);
        });
      });
    });
  });
});
