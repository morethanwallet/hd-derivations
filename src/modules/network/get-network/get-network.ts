import type { NetworkTypeUnion } from "../libs/types/index.js";
import type { GetNetworkParameters, NetworkNameToNetwork } from "./libs/types/index.js";
import { DotMnemonic, Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { ExceptionMessage } from "../libs/enums/index.js";
import { Btc } from "../btc/index.js";
import { Ada } from "../ada/index.js";
import { Avax } from "../avax/index.js";
import { Trx } from "../trx/index.js";
import { Ton } from "../ton/index.js";
import { Sui } from "../sui/index.js";
import { Bch } from "../bch/index.js";
import { Xrp } from "../xrp/index.js";
import { Bnb } from "../bnb/index.js";
import { Evm } from "../evm/index.js";
import { Dot } from "../dot/dot.js";
import { Sol } from "../sol/index.js";
import { Doge } from "../doge/index.js";
import { Zec } from "../zec/index.js";
import { Apt } from "../apt/index.js";
import { Ltc } from "../ltc/index.js";
import { NetworkError } from "../libs/exceptions/index.js";
import { cryptoWaitReady } from "@polkadot/util-crypto";

// Initialization is necessary for the @polkadot/util-crypto WASM package to work correctly
await cryptoWaitReady();

function getNetwork<T extends NetworkTypeUnion>(
  parameters: GetNetworkParameters<T>,
): NetworkNameToNetwork[T] {
  const { network, mnemonic } = parameters;
  const mnemonicInstance = new Mnemonic(mnemonic);

  // TODO: Fix assertions
  switch (network) {
    case "btc": {
      return new Btc({
        ...(parameters as GetNetworkParameters<"btc">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "ada": {
      return new Ada({
        ...(parameters as GetNetworkParameters<"ada">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "avax": {
      return new Avax({
        ...(parameters as GetNetworkParameters<"avax">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "trx": {
      return new Trx({
        ...(parameters as GetNetworkParameters<"trx">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "ton": {
      return new Ton({
        ...(parameters as GetNetworkParameters<"ton">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "sui": {
      return new Sui({
        ...(parameters as GetNetworkParameters<"sui">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "bch": {
      return new Bch({
        ...(parameters as GetNetworkParameters<"bch">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "xrp": {
      return new Xrp({
        ...(parameters as GetNetworkParameters<"xrp">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "bnb": {
      return new Bnb({
        ...(parameters as GetNetworkParameters<"bnb">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "evm": {
      return new Evm({
        ...(parameters as GetNetworkParameters<"evm">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "dot": {
      const dotMnemonicInstance = new DotMnemonic(mnemonic);

      return new Dot({
        ...(parameters as GetNetworkParameters<"dot">),
        mnemonic: mnemonicInstance,
        dotMnemonic: dotMnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "sol": {
      return new Sol({
        ...(parameters as GetNetworkParameters<"sol">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "doge": {
      return new Doge({
        ...(parameters as GetNetworkParameters<"doge">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "zec": {
      return new Zec({
        ...(parameters as GetNetworkParameters<"zec">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "apt": {
      return new Apt({
        ...(parameters as GetNetworkParameters<"apt">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "ltc": {
      return new Ltc({
        ...(parameters as GetNetworkParameters<"ltc">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    default: {
      throw new NetworkError(ExceptionMessage.NETWORK_IS_NOT_SUPPORTED);
    }
  }
}

export { getNetwork };
