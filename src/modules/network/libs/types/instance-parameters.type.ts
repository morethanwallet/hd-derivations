import { type MnemonicProperty } from "@/libs/modules/mnemonic/index.js";
import type {
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  TonDerivationConfig,
  TrxDerivationConfig,
  SuiDerivationConfig,
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

export type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BtcInstanceParameters,
  TrxInstanceParameters,
  TonInstanceParameters,
  SuiInstanceParameters,
};
