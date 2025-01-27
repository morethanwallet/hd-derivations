import type {  NetworkTypeUnion } from "../libs/types/index.js";
import type { ConstructorParameters } from "./libs/types/index.js";
import { Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { ExceptionMessage } from "../libs/enums/index.js";
import { Bitcoin } from "../bitcoin/index.js";
import { Ada } from "../ada/index.js";
import { Avax } from "../avax/index.js";
import { Trx } from "../trx/index.js";
import { Ton } from "../ton/index.js";
import { Sui } from "../sui/index.js";

type Network = {
  // question: what's the diff between `InstanceType<typeof Bitcoin>` and `Bitcoin`?
  // summary: looks like it can be simplified but should be double checked
  btc: Bitcoin;
  ada: InstanceType<typeof Ada>;
  avax: InstanceType<typeof Avax>;
  trx: InstanceType<typeof Trx>;
  ton: InstanceType<typeof Ton>;
  sui: InstanceType<typeof Sui>;
};

// class NetworkFacade<T extends NetworkTypeUnion> implements  AbstractNetwork<T> {
class NetworkFacade<T extends NetworkTypeUnion> {
  private network: Network[T];

  constructor(parameters: ConstructorParameters<T>) {
    const { network, mnemonic } = parameters;
    const mnemonicInstance = new Mnemonic(mnemonic);

    // TODO: Fix assertions
    switch (network) {
      case "btc":
        {
          this.network = new Bitcoin({
            ...(parameters as ConstructorParameters<"btc">),
            mnemonic: mnemonicInstance,
          }) as Network[T];
        }
        break;
      case "ada":
        {
          this.network = new Ada({
            ...(parameters as ConstructorParameters<"ada">),
            mnemonic: mnemonicInstance,
          }) as Network[T];
        }
        break;
      case "avax":
        {
          this.network = new Avax({
            ...(parameters as ConstructorParameters<"avax">),
            mnemonic: mnemonicInstance,
          }) as Network[T];
        }
        break;
      case "trx":
        {
          this.network = new Trx({
            ...(parameters as ConstructorParameters<"trx">),
            mnemonic: mnemonicInstance,
          }) as Network[T];
        }
        break;
      case "ton":
        {
          this.network = new Ton({
            ...(parameters as ConstructorParameters<"ton">),
            mnemonic: mnemonicInstance,
          }) as Network[T];
        }
        break;
      case "sui":
        {
          this.network = new Sui({
            ...(parameters as ConstructorParameters<"sui">),
            mnemonic: mnemonicInstance,
          }) as Network[T];
        }
        break;
      default:
        throw new Error(ExceptionMessage.NETWORK_IS_NOT_SUPPORTED);
    }
  }

  public getNetwork(): Network[T] {
    return this.network;
  }

  // public deriveItemFromMnemonic(...parameters: ConstructorParameters<T>["deriveItemFromMnemonic"]) {
  //   return this.network.deriveItemFromMnemonic(parameters);
  // }

  // public getCredentialFromPrivateKey(parameters: ConstructorParameters<T>["getCredentialFromPrivateKey"]) {
  //   return this.network.getCredentialFromPrivateKey(parameters);
  // }

  // public deriveItemsBatchFromMnemonic(parameters: ConstructorParameters<T>["deriveItemsBatchFromMnemonic"]) {
  //   return this.network.deriveItemsBatchFromMnemonic(parameters);
  // }

  // public checkIfPrivateKeyBelongsToMnemonic(parameters: ConstructorParameters<T>["checkIfPrivateKeyBelongsToMnemonic"]) {
  //   return this.network.checkIfPrivateKeyBelongsToMnemonic(parameters);
  // }
}

export { NetworkFacade };

const test = new NetworkFacade({
  network: "btc",
  networkPurpose: "mainnet",
  derivationConfigs: [
    {
      derivationType: "legacy",
      prefixConfig: {
        scriptHash: 0,
        wif: 0,
        messagePrefix: "",
        bech32: "",
        bip32: {
          private: 0,
          public: 0,
        },
        pubKeyHash: 0,
      },
    },
  ],
});

const test1 = new NetworkFacade({
  network: "trx",
  derivationConfigs: [],
});


// question: can we instead of `test.getNetwork().method()` do `test.method()`?
// test.getNetwork();
// summary: should be possible, but could be caveats with types

// question: sometimes case can be bitcoinCash, sometimes bitcoin-cash
// summary: we always can use kebab-case

// question: there are multiple folders with `network` name
// ./modules/address/networks
// ./modules/keyDerivation/networks
// ./modules/network

// 1. why so? 
// 2. can we move ./modules/network to ./modules?


// summary: add command to build the package in JS 