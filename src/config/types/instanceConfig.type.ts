import { type MnemonicProperty } from "@/mnemonic/types/index.js";
import {
  type AvaxDerivationConfigs,
  type AdaDerivationConfigs,
  type BtcDerivationConfigs,
} from "@/types/config/index.js";
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

export { type BtcInstanceConfig, AdaInstanceConfig, type AvaxInstanceConfig };
