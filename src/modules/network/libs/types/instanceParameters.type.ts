import { type MnemonicProperty } from "@/libs/modules/mnemonic/index.js";
import type {
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  TonDerivationConfig,
  TrxDerivationConfig,
  SuiDerivationConfig,
} from "./derivationConfig.type.js";
import type {
  AdaNetworkPurposeUnion,
  CommonNetworkPurposeRegTestExtendedUnion,
  CommonNetworkPurposeUnion,
} from "./networkPurposeUnion.type.js";
import type { NetworkTypeMap } from "./networkTypeMap.type.js";
import type { SignatureSchemeUnion } from "@/libs/types/index.js";

type AdaInstanceParameters = {
  network: NetworkTypeMap["ada"];
  networkPurpose: AdaNetworkPurposeUnion;
  derivationConfigs: AdaDerivationConfig[];
} & MnemonicProperty;

type AvaxInstanceParameters = {
  network: NetworkTypeMap["avax"];
  networkPurpose: CommonNetworkPurposeUnion;
  derivationConfigs: AvaxDerivationConfig[];
} & MnemonicProperty;

type BtcInstanceParameters = {
  network: NetworkTypeMap["btc"];
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationConfigs: BtcDerivationConfig[];
} & MnemonicProperty;

type TrxInstanceParameters = {
  network: NetworkTypeMap["trx"];
  derivationConfigs: TrxDerivationConfig[];
} & MnemonicProperty;

type TonInstanceParameters = {
  network: NetworkTypeMap["ton"];
  networkPurpose: CommonNetworkPurposeUnion;
  derivationConfigs: TonDerivationConfig[];
} & MnemonicProperty;

type SuiInstanceParameters = {
  network: NetworkTypeMap["sui"];
  scheme: SignatureSchemeUnion;
  derivationConfigs: SuiDerivationConfig[];
} & MnemonicProperty;

export type {
  AdaInstanceParameters,
  AvaxInstanceParameters,
  BtcInstanceParameters,
  TrxInstanceParameters,
  TonInstanceParameters,
  SuiInstanceParameters,
};
