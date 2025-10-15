import type { Mnemonic } from "@/libs/modules/mnemonic/index.js";
import type { GetDerivationConfig } from "./derivation-config.type.js";
import type { NetworkTypeMap } from "./network-type-map.type.js";

type MnemonicProperty = { mnemonic?: Mnemonic["mnemonic"] };

type AdaInstanceParameters = {
  network: NetworkTypeMap["ada"];
  derivationConfig: GetDerivationConfig<"ada">;
} & MnemonicProperty;

type AvaxInstanceParameters = {
  network: NetworkTypeMap["avax"];
  derivationConfig: GetDerivationConfig<"avax">;
} & MnemonicProperty;

type BtcInstanceParameters = {
  network: NetworkTypeMap["btc"];
  derivationConfig: GetDerivationConfig<"btc">;
} & MnemonicProperty;

type TrxInstanceParameters = {
  network: NetworkTypeMap["trx"];
  derivationConfig: GetDerivationConfig<"trx">;
} & MnemonicProperty;

type TonInstanceParameters = {
  network: NetworkTypeMap["ton"];
  derivationConfig: GetDerivationConfig<"ton">;
} & MnemonicProperty;

type SuiInstanceParameters = {
  network: NetworkTypeMap["sui"];
  derivationConfig: GetDerivationConfig<"sui">;
} & MnemonicProperty;

type BchInstanceParameters = {
  network: NetworkTypeMap["bch"];
  derivationConfig: GetDerivationConfig<"bch">;
} & MnemonicProperty;

type DotInstanceParameters = {
  network: NetworkTypeMap["dot"];
  derivationConfig: GetDerivationConfig<"dot">;
} & MnemonicProperty;

type XrpInstanceParameters = {
  network: NetworkTypeMap["xrp"];
  derivationConfig: GetDerivationConfig<"xrp">;
} & MnemonicProperty;

type BnbInstanceParameters = {
  network: NetworkTypeMap["bnb"];
  derivationConfig?: GetDerivationConfig<"bnb">;
} & MnemonicProperty;

type EvmInstanceParameters = {
  network: NetworkTypeMap["evm"];
  derivationConfig?: GetDerivationConfig<"evm">;
} & MnemonicProperty;

type SolInstanceParameters = {
  network: NetworkTypeMap["sol"];
  derivationConfig: GetDerivationConfig<"sol">;
} & MnemonicProperty;

type DogeInstanceParameters = {
  network: NetworkTypeMap["doge"];
  derivationConfig: GetDerivationConfig<"doge">;
} & MnemonicProperty;

type ZecInstanceParameters = {
  network: NetworkTypeMap["zec"];
  derivationConfig: GetDerivationConfig<"zec">;
} & MnemonicProperty;

type AptInstanceParameters = {
  network: NetworkTypeMap["apt"];
  derivationConfig: GetDerivationConfig<"apt">;
} & MnemonicProperty;

type LtcInstanceParameters = {
  network: NetworkTypeMap["ltc"];
  derivationConfig: GetDerivationConfig<"ltc">;
} & MnemonicProperty;

type InstanceParameters = {
  ada: AdaInstanceParameters;
  avax: AvaxInstanceParameters;
  btc: BtcInstanceParameters;
  trx: TrxInstanceParameters;
  ton: TonInstanceParameters;
  sui: SuiInstanceParameters;
  bch: BchInstanceParameters;
  dot: DotInstanceParameters;
  xrp: XrpInstanceParameters;
  bnb: BnbInstanceParameters;
  evm: EvmInstanceParameters;
  sol: SolInstanceParameters;
  doge: DogeInstanceParameters;
  zec: ZecInstanceParameters;
  apt: AptInstanceParameters;
  ltc: LtcInstanceParameters;
};

export type { InstanceParameters };
