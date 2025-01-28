import { type MnemonicProperty } from "@/libs/modules/mnemonic/index.js";
import type {
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  TonDerivationConfig,
  TrxDerivationConfig,
  SuiDerivationConfig,
} from "./derivation-config.type.js";
import type {
  AdaNetworkPurposeUnion,
  CommonNetworkPurposeRegTestExtendedUnion,
  CommonNetworkPurposeUnion,
} from "./network-purpose-union.type.js";
import type { NetworkTypeMap } from "./network-type-map.type.js";
import type { SignatureSchemeUnion } from "@/libs/types/index.js";

type AdaInstanceParameters = {
  network: NetworkTypeMap["ada"];
  networkPurpose: AdaNetworkPurposeUnion;
  derivationConfig: AdaDerivationConfig;
} & MnemonicProperty;

type AvaxInstanceParameters = {
  network: NetworkTypeMap["avax"];
  networkPurpose: CommonNetworkPurposeUnion;
  derivationConfig: AvaxDerivationConfig;
} & MnemonicProperty;

type BtcInstanceParameters = {
  network: NetworkTypeMap["btc"];
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationConfig: BtcDerivationConfig;
} & MnemonicProperty;

type TrxInstanceParameters = {
  network: NetworkTypeMap["trx"];
  derivationConfig: TrxDerivationConfig;
} & MnemonicProperty;

type TonInstanceParameters = {
  network: NetworkTypeMap["ton"];
  networkPurpose: CommonNetworkPurposeUnion;
  derivationConfig: TonDerivationConfig;
} & MnemonicProperty;

type SuiInstanceParameters = {
  network: NetworkTypeMap["sui"];
  scheme: SignatureSchemeUnion;
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
