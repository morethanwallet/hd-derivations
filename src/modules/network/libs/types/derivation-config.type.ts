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
  LtcDerivationTypeUnion,
  XrpDerivationTypeUnion,
} from "@/libs/types/index.js";
import type {
  AdaNetworkPurposeUnion,
  CommonNetworkPurposeRegTestExtendedUnion,
  CommonNetworkPurposeUnion,
} from "./network-purpose-union.type.js";
import type { TonAddressDerivationConfig } from "./ton-address-derivation-config.type.js";
import type { DestinationTagProperty, Ss58Format } from "@/libs/modules/address/index.js";

type PrefixConfigProperty = { prefixConfig?: PrefixConfig };

type AdaDerivationConfig = {
  networkPurpose: AdaNetworkPurposeUnion;
  derivationType: AdaDerivationTypeUnion;
};

type AvaxDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: AvaxDerivationTypeUnion;
} & PrefixConfigProperty;

type BtcDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationType: BtcDerivationTypeUnion;
} & PrefixConfigProperty;

type TrxDerivationConfig = {
  derivationType: DerivationTypeMap["trxBase"];
} & PrefixConfigProperty;

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
} & PrefixConfigProperty;

type DotDerivationConfig = Ss58Format;

type XrpDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: XrpDerivationTypeUnion;
} & PrefixConfigProperty &
  DestinationTagProperty;

type DogeDerivationConfig = {
  derivationType: DerivationTypeMap["dogeLegacy"];
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & PrefixConfigProperty;

type ZecDerivationConfig = {
  derivationType: DerivationTypeMap["zecTransparent"];
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & PrefixConfigProperty;

type AptDerivationConfig = {
  derivationType: AptDerivationTypeUnion;
  authenticationScheme?: AuthSchemeUnion;
  algorithm: EllipticCurveAlgorithmUnion;
};

type LtcDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationType: LtcDerivationTypeUnion;
} & PrefixConfigProperty;

export type {
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  TrxDerivationConfig,
  TonDerivationConfig,
  SuiDerivationConfig,
  BchDerivationConfig,
  XrpDerivationConfig,
  PrefixConfigProperty as CommonDerivationConfig,
  DotDerivationConfig,
  DogeDerivationConfig,
  ZecDerivationConfig,
  AptDerivationConfig,
  LtcDerivationConfig,
};
