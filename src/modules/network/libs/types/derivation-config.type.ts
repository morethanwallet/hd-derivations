import type { PrefixConfig } from "@/libs/modules/curves/curves.js";
import type {
  AdaDerivationTypeUnion,
  AptDerivationTypeUnion,
  AuthSchemeUnion,
  AvaxDerivationTypeUnion,
  BchDerivationTypeUnion,
  BtcDerivationTypeUnion,
  GetDerivationTypeUnion,
  DotDerivationTypeUnion,
  GetSignatureSchemeUnion,
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
  derivationType: GetDerivationTypeUnion<"trxBase">;
} & PrefixConfigProperty;

type TonDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: GetDerivationTypeUnion<"tonBase">;
} & TonAddressDerivationConfig;

type SuiDerivationConfig = {
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">;
  derivationType: GetDerivationTypeUnion<"suiBase">;
};

type BchDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationType: BchDerivationTypeUnion;
} & PrefixConfigProperty;

type DotDerivationConfig = {
  derivationType: DotDerivationTypeUnion;
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "sr25519">;
} & Ss58Format;

type XrpDerivationConfig = {
  networkPurpose: CommonNetworkPurposeUnion;
  derivationType: XrpDerivationTypeUnion;
} & PrefixConfigProperty &
  DestinationTagProperty;

type DogeDerivationConfig = {
  derivationType: GetDerivationTypeUnion<"dogeLegacy">;
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & PrefixConfigProperty;

type ZecDerivationConfig = {
  derivationType: GetDerivationTypeUnion<"zecTransparent">;
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & PrefixConfigProperty;

type AptDerivationConfig = {
  derivationType: AptDerivationTypeUnion;
  authenticationScheme?: AuthSchemeUnion;
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">;
};

type LtcDerivationConfig = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
  derivationType: LtcDerivationTypeUnion;
} & PrefixConfigProperty;

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
} & {
  [key in "evm" | "bnb"]: PrefixConfigProperty;
};

type GetDerivationConfig<T extends keyof DerivationConfig> = DerivationConfig[T];

export type { GetDerivationConfig, DerivationConfig };
