import type { PrefixConfig } from "@/libs/modules/curves/curves.js";
import type {
  DerivationTypeUnionByNetwork,
  AuthSchemeUnion,
  GetSignatureSchemeUnion,
} from "@/libs/types/types.js";
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
  derivationType: DerivationTypeUnionByNetwork["ada"];
};

type AvaxDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: DerivationTypeUnionByNetwork["avax"];
} & PrefixConfigProperty;

type BtcDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationType: DerivationTypeUnionByNetwork["btc"];
} & PrefixConfigProperty;

type TrxDerivationConfig = {
  derivationType: DerivationTypeUnionByNetwork["trx"];
} & PrefixConfigProperty;

type TonDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: DerivationTypeUnionByNetwork["ton"];
} & TonAddressDerivationConfig;

type SuiDerivationConfig = {
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">;
  derivationType: DerivationTypeUnionByNetwork["sui"];
};

type BchDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationType: DerivationTypeUnionByNetwork["bch"];
} & PrefixConfigProperty;

type DotDerivationConfig = {
  derivationType: DerivationTypeUnionByNetwork["dot"];
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "sr25519">;
} & Ss58Format;

type XrpDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: DerivationTypeUnionByNetwork["xrp"];
} & PrefixConfigProperty &
  DestinationTagProperty;

type DogeDerivationConfig = {
  derivationType: DerivationTypeUnionByNetwork["doge"];
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & PrefixConfigProperty;

type ZecDerivationConfig = {
  derivationType: DerivationTypeUnionByNetwork["zec"];
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & PrefixConfigProperty;

type AptDerivationConfig = {
  derivationType: DerivationTypeUnionByNetwork["apt"];
  authenticationScheme?: AuthSchemeUnion;
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">;
};

type LtcDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationType: DerivationTypeUnionByNetwork["ltc"];
} & PrefixConfigProperty;

type SolDerivationConfig = {
  derivationType: DerivationTypeUnionByNetwork["sol"];
};

type DerivationConfig = {
  ada: AdaDerivationConfig;
  avax: AvaxDerivationConfig;
  btc: BtcDerivationConfig;
  trx: TrxDerivationConfig;
  ton: TonDerivationConfig;
  sui: SuiDerivationConfig;
  bch: BchDerivationConfig;
  dot: DotDerivationConfig;
  xrp: XrpDerivationConfig;
  doge: DogeDerivationConfig;
  zec: ZecDerivationConfig;
  apt: AptDerivationConfig;
  ltc: LtcDerivationConfig;
  sol: SolDerivationConfig;
} & {
  [key in "evm" | "bnb"]: PrefixConfigProperty;
};

type GetDerivationConfig<T extends keyof DerivationConfig> = DerivationConfig[T];

export type { GetDerivationConfig, DerivationConfig };
