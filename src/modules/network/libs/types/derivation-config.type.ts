import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import type {
  AdaDerivationTypeUnion,
  AvaxDerivationTypeUnion,
  BtcDerivationTypeUnion,
  DerivationTypeMap,
  SignatureSchemeUnion,
} from "@/libs/types/index.js";
import type {
  AdaNetworkPurposeUnion,
  CommonNetworkPurposeRegTestExtendedUnion,
  CommonNetworkPurposeUnion,
} from "./network-purpose-union.type.js";

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
  derivationType: BtcDerivationTypeUnion;
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & CommonPrefixConfig;

type TrxDerivationConfig = {
  derivationType: DerivationTypeMap["trxBase"];
} & CommonPrefixConfig;

type TonDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: DerivationTypeMap["tonBase"];
};

type SuiDerivationConfig = {
  scheme: SignatureSchemeUnion;
  derivationType: DerivationTypeMap["suiBase"];
};

export type {
  AdaDerivationConfig,
  AvaxDerivationConfig,
  BtcDerivationConfig,
  TrxDerivationConfig,
  TonDerivationConfig,
  SuiDerivationConfig,
};
