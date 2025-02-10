import type { PrefixConfig } from "@/libs/modules/keys/index.js";
import type {
  AdaDerivationTypeUnion,
  AptDerivationTypeUnion,
  AuthSchemeUnion,
  AvaxDerivationTypeUnion,
  BchDerivationTypeUnion,
  BtcDerivationTypeUnion,
  DerivationTypeMap,
  EllipticCurveAlgorithmUnion,
  XrpDerivationTypeUnion,
} from "@/libs/types/index.js";
import type {
  AdaNetworkPurposeUnion,
  CommonNetworkPurposeRegTestExtendedUnion,
  CommonNetworkPurposeUnion,
} from "./network-purpose-union.type.js";
import type { TonAddressDerivationConfig } from "./ton-address-derivation-config.type.js";
import type { DestinationTagProperty, Ss58Format } from "@/libs/modules/address/index.js";

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
  algorithm: EllipticCurveAlgorithmUnion;
  derivationType: DerivationTypeMap["suiBase"];
};

type BchDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationType: BchDerivationTypeUnion;
} & CommonPrefixConfig;

type DotDerivationConfig = Ss58Format;

type XrpDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: XrpDerivationTypeUnion;
} & CommonPrefixConfig &
  DestinationTagProperty;

type DogeDerivationConfig = {
  derivationType: DerivationTypeMap["dogeLegacy"];
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & CommonPrefixConfig;

type ZecDerivationConfig = {
  derivationType: DerivationTypeMap["zecTransparent"];
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & CommonPrefixConfig;

type AptDerivationConfig = {
  derivationType: AptDerivationTypeUnion;
  authenticationScheme?: AuthSchemeUnion;
  algorithm: EllipticCurveAlgorithmUnion;
};

export type {
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  TrxDerivationConfig,
  TonDerivationConfig,
  SuiDerivationConfig,
  BchDerivationConfig,
  XrpDerivationConfig,
  CommonPrefixConfig as CommonDerivationConfig,
  DotDerivationConfig,
  DogeDerivationConfig,
  ZecDerivationConfig,
  AptDerivationConfig,
};
