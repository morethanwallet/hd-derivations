import { type MnemonicProperty } from "@/mnemonic/types/index.js";
import {
  type AvaxDerivationConfigs,
  type AdaDerivationConfigs,
  type BtcDerivationConfigs,
  type TrxDerivationConfigs,
  type TonDerivationConfigs,
} from "./derivationConfigs.type.js";
import {
  type CommonNetworkPurposeUnion,
  type AdaNetworkPurposeUnion,
  type CommonNetworkPurposeRegTestExtendedUnion,
  type NetworkTypeMap,
} from "@/types/network/index.js";

type BtcInstanceConfig = {
  network: NetworkTypeMap["btc"];
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationConfigs: BtcDerivationConfigs;
} & MnemonicProperty;

type AdaInstanceConfig = {
  network: NetworkTypeMap["ada"];
  networkPurpose: AdaNetworkPurposeUnion;
  derivationConfigs: AdaDerivationConfigs;
} & MnemonicProperty;

type AvaxInstanceConfig = {
  network: NetworkTypeMap["avax"];
  networkPurpose: CommonNetworkPurposeUnion;
  derivationConfigs: AvaxDerivationConfigs;
} & MnemonicProperty;

type TrxInstanceConfig = {
  network: NetworkTypeMap["trx"];
  networkPurpose: null;
  derivationConfigs: TrxDerivationConfigs;
} & MnemonicProperty;

type TonInstanceConfig = {
  network: NetworkTypeMap["ton"];
  networkPurpose: CommonNetworkPurposeUnion;
  derivationConfigs: TonDerivationConfigs;
} & MnemonicProperty;

export {
  type BtcInstanceConfig,
  type AdaInstanceConfig,
  type AvaxInstanceConfig,
  type TrxInstanceConfig,
  type TonInstanceConfig,
};
