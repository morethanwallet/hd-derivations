import type { NetworkTypeUnion } from "../libs/types/index.js";
import type { GetNetworkParameters, NetworkNameToNetwork } from "./libs/types/index.js";
import { DotMnemonic, Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { ExceptionMessage } from "../libs/enums/index.js";
import { NetworkError } from "../libs/exceptions/index.js";

const AdaModule = import("../ada/index.js");
const BtcModule = import("../btc/index.js");
const AvaxModule = import("../avax/index.js");
const TrxModule = import("../trx/index.js");
const TonModule = import("../ton/index.js");
const SuiModule = import("../sui/index.js");
const BchModule = import("../bch/index.js");
const XrpModule = import("../xrp/index.js");
const BnbModule = import("../bnb/index.js");
const EvmModule = import("../evm/index.js");
const DotModule = import("../dot/index.js");
const SolModule = import("../sol/index.js");
const DogeModule = import("../doge/index.js");
const ZecModule = import("../zec/index.js");
const AptModule = import("../apt/index.js");
const LtcModule = import("../ltc/index.js");
const cryptoWaitReadyModule = import("@polkadot/util-crypto");

async function getNetwork<T extends NetworkTypeUnion>(
  parameters: GetNetworkParameters<T>,
): Promise<NetworkNameToNetwork[T]> {
  const { network, mnemonic } = parameters;
  const mnemonicInstance = new Mnemonic(mnemonic);

  // TODO: Fix assertions
  switch (network) {
    case "btc": {
      const { Btc } = await BtcModule;

      return new Btc({
        ...(parameters as GetNetworkParameters<"btc">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "ada": {
      const { Ada } = await AdaModule;

      return new Ada({
        ...(parameters as GetNetworkParameters<"ada">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "avax": {
      const { Avax } = await AvaxModule;

      return new Avax({
        ...(parameters as GetNetworkParameters<"avax">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "trx": {
      const { Trx } = await TrxModule;

      return new Trx({
        ...(parameters as GetNetworkParameters<"trx">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "ton": {
      const { Ton } = await TonModule;

      return new Ton({
        ...(parameters as GetNetworkParameters<"ton">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "sui": {
      const { Sui } = await SuiModule;

      return new Sui({
        ...(parameters as GetNetworkParameters<"sui">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "bch": {
      const { Bch } = await BchModule;

      return new Bch({
        ...(parameters as GetNetworkParameters<"bch">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "xrp": {
      const { Xrp } = await XrpModule;

      return new Xrp({
        ...(parameters as GetNetworkParameters<"xrp">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "bnb": {
      const { Bnb } = await BnbModule;

      return new Bnb({
        ...(parameters as GetNetworkParameters<"bnb">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "evm": {
      const { Evm } = await EvmModule;

      return new Evm({
        ...(parameters as GetNetworkParameters<"evm">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "dot": {
      const { cryptoWaitReady } = await cryptoWaitReadyModule;
      await cryptoWaitReady();
      const { Dot } = await DotModule;
      const dotMnemonicInstance = new DotMnemonic(mnemonic);

      return new Dot({
        ...(parameters as GetNetworkParameters<"dot">),
        mnemonic: mnemonicInstance,
        dotMnemonic: dotMnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "sol": {
      const { Sol } = await SolModule;

      return new Sol({
        ...(parameters as GetNetworkParameters<"sol">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "doge": {
      const { Doge } = await DogeModule;

      return new Doge({
        ...(parameters as GetNetworkParameters<"doge">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "zec": {
      const { Zec } = await ZecModule;

      return new Zec({
        ...(parameters as GetNetworkParameters<"zec">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "apt": {
      const { Apt } = await AptModule;

      return new Apt({
        ...(parameters as GetNetworkParameters<"apt">),
        mnemonic: mnemonicInstance,
      }) as NetworkNameToNetwork[T];
    }
    case "ltc": {
      const { Ltc } = await LtcModule;

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
