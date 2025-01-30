import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import type {
  AdaDerivationTypeUnion,
  AvaxDerivationTypeUnion,
  BchDerivationTypeUnion,
  BtcDerivationTypeUnion,
  DerivationTypeMap,
  SignatureSchemeUnion,
} from "@/libs/types/index.js";
import type {
  AdaNetworkPurposeUnion,
  CommonNetworkPurposeRegTestExtendedUnion,
  CommonNetworkPurposeUnion,
} from "./network-purpose-union.type.js";
import type { TonAddressDerivationConfig } from "./ton-address-derivation-config.type.js";

type CommonPrefixConfig = { prefixConfig: PrefixConfig };

type AdaDerivationConfig = {
  derivationType: AdaDerivationTypeUnion;
  networkPurpose: AdaNetworkPurposeUnion;
};

type AvaxDerivationConfig = {
  derivationType: AvaxDerivationTypeUnion;
  networkPurpose: CommonNetworkPurposeUnion;
} & CommonPrefixConfig;

type BtcDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationType: BtcDerivationTypeUnion;
} & CommonPrefixConfig;

type TrxDerivationConfig = {
  derivationType: DerivationTypeMap["trxBase"];
} & CommonPrefixConfig;

type TonDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: DerivationTypeMap["tonBase"];
} & TonAddressDerivationConfig;

type SuiDerivationConfig = {
  scheme: SignatureSchemeUnion;
  derivationType: DerivationTypeMap["suiBase"];
};

type BchDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationType: BchDerivationTypeUnion;
} & CommonPrefixConfig;

export type {
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  TrxDerivationConfig,
  TonDerivationConfig,
  SuiDerivationConfig,
  BchDerivationConfig,
};
