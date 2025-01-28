import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import type {
  AdaDerivationTypeUnion,
  AvaxDerivationTypeUnion,
  BtcDerivationTypeUnion,
  DerivationTypeMap,
} from "@/libs/types/index.js";

type CommonPrefixConfig = { prefixConfig: PrefixConfig };

type AdaDerivationConfig = {
  derivationType: AdaDerivationTypeUnion;
};

type AvaxDerivationConfig = {
  derivationType: AvaxDerivationTypeUnion;
} & CommonPrefixConfig;

type BtcDerivationConfig = {
  derivationType: BtcDerivationTypeUnion;
} & CommonPrefixConfig;

type TrxDerivationConfig = {
  derivationType: DerivationTypeMap["trxBase"];
} & CommonPrefixConfig;

type TonDerivationConfig = {
  derivationType: DerivationTypeMap["tonBase"];
};

type SuiDerivationConfig = {
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
