import type { PrefixConfigProperty } from "@/libs/modules/keys/index.js";
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
import type { DestinationTagProperty } from "@/libs/modules/address/index.js";

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
  scheme: SignatureSchemeUnion;
  derivationType: DerivationTypeMap["suiBase"];
};

type BchDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationType: BchDerivationTypeUnion;
} & PrefixConfigProperty;

type XrpDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: XrpDerivationTypeUnion;
} & PrefixConfigProperty &
  DestinationTagProperty;

export type {
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  TrxDerivationConfig,
  TonDerivationConfig,
  SuiDerivationConfig,
  BchDerivationConfig,
  XrpDerivationConfig,
};
