import type { PrefixConfig } from "@/libs/modules/keys/index.js";
import type {
  AdaDerivationTypeUnion,
  AvaxDerivationTypeUnion,
  BchDerivationTypeUnion,
  BtcDerivationTypeUnion,
  DerivationTypeMap,
  SignatureSchemeUnion,
  XrpDerivationTypeUnion,
} from "@/libs/types/index.js";
import type {
  AdaNetworkPurposeUnion,
  CommonNetworkPurposeRegTestExtendedUnion,
  CommonNetworkPurposeUnion,
} from "./network-purpose-union.type.js";
import type { TonAddressDerivationConfig } from "./ton-address-derivation-config.type.js";
import type { DestinationTagProperty, Ss58FormatProperty } from "@/libs/modules/address/index.js";

type CommonPrefixConfig = { prefixConfig?: PrefixConfig };

type AdaDerivationConfig = {
  networkPurpose: AdaNetworkPurposeUnion;
  derivationType: AdaDerivationTypeUnion;
};

type AvaxDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: AvaxDerivationTypeUnion;
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

type DotDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & Ss58FormatProperty;

type XrpDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: XrpDerivationTypeUnion;
} & CommonPrefixConfig &
  DestinationTagProperty;

export type {
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  TrxDerivationConfig,
  TonDerivationConfig,
  SuiDerivationConfig,
  BchDerivationConfig,
  DotDerivationConfig,
  XrpDerivationConfig,
  CommonPrefixConfig as CommonDerivationConfig,
};
