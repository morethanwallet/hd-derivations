import { type MnemonicProperty } from "@/libs/modules/mnemonic/index.js";
import type {
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  TonDerivationConfig,
  TrxDerivationConfig,
  SuiDerivationConfig,
  BchDerivationConfig,
  DotDerivationConfig,
  XrpDerivationConfig,
  CommonDerivationConfig,
  DogeDerivationConfig,
  ZecDerivationConfig,
  AptDerivationConfig,
} from "./derivation-config.type.js";
import type { NetworkTypeMap } from "./network-type-map.type.js";

type AdaInstanceParameters = {
  network: NetworkTypeMap["ada"];
  derivationConfig: AdaDerivationConfig;
} & MnemonicProperty;

type AvaxInstanceParameters = {
  network: NetworkTypeMap["avax"];
  derivationConfig: AvaxDerivationConfig;
} & MnemonicProperty;

type BtcInstanceParameters = {
  network: NetworkTypeMap["btc"];
  derivationConfig: BtcDerivationConfig;
} & MnemonicProperty;

type TrxInstanceParameters = {
  network: NetworkTypeMap["trx"];
  derivationConfig: TrxDerivationConfig;
} & MnemonicProperty;

type TonInstanceParameters = {
  network: NetworkTypeMap["ton"];
  derivationConfig: TonDerivationConfig;
} & MnemonicProperty;

type SuiInstanceParameters = {
  network: NetworkTypeMap["sui"];
  derivationConfig: SuiDerivationConfig;
} & MnemonicProperty;

type BchInstanceParameters = {
  network: NetworkTypeMap["bch"];
  derivationConfig: BchDerivationConfig;
} & MnemonicProperty;

type DotInstanceParameters = {
  network: NetworkTypeMap["dot"];
  derivationConfig: DotDerivationConfig;
} & MnemonicProperty;

type XrpInstanceParameters = {
  network: NetworkTypeMap["xrp"];
  derivationConfig: XrpDerivationConfig;
} & MnemonicProperty;

type BnbInstanceParameters = {
  network: NetworkTypeMap["bnb"];
  derivationConfig: CommonDerivationConfig;
} & MnemonicProperty;

type EvmInstanceParameters = {
  network: NetworkTypeMap["evm"];
  derivationConfig: CommonDerivationConfig;
} & MnemonicProperty;

type SolInstanceParameters = {
  network: NetworkTypeMap["sol"];
} & MnemonicProperty;

type DogeInstanceParameters = {
  network: NetworkTypeMap["doge"];
  derivationConfig: DogeDerivationConfig;
} & MnemonicProperty;

type ZecInstanceParameters = {
  network: NetworkTypeMap["zec"];
  derivationConfig: ZecDerivationConfig;
} & MnemonicProperty;

type AptInstanceParameters = {
  network: NetworkTypeMap["apt"];
  derivationConfig: AptDerivationConfig;
} & MnemonicProperty;

export type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BtcInstanceParameters,
  TrxInstanceParameters,
  TonInstanceParameters,
  SuiInstanceParameters,
  BchInstanceParameters,
  DotInstanceParameters,
  XrpInstanceParameters,
  BnbInstanceParameters,
  EvmInstanceParameters,
  SolInstanceParameters,
  DogeInstanceParameters,
  ZecInstanceParameters,
  AptInstanceParameters,
};
