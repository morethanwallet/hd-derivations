type DerivationTypeUnion =
  | "avaxX"
  | "avaxP"
  | "btcLegacy"
  | "btcSegWit"
  | "btcP2wshInP2sh"
  | "btcP2wsh"
  | "btcNativeSegWit"
  | "btcTaproot"
  | "bchLegacy"
  | "bchCashAddr"
  | "adaBase"
  | "adaReward"
  | "adaEnterprise"
  | "adaExodus"
  | "bnbBase"
  | "evmBase"
  | "xrpBase"
  | "xrpX"
  | "trxBase"
  | "tonBase"
  | "tonExodus"
  | "suiBase"
  | "dotBase"
  | "dotStandardHd"
  | "dotLedger"
  | "solBase"
  | "solExodus" // TODO: Refactor codebase to exclude clients from the `derivationTypeUnion` and accepting id only of the shape similar to "network.derivationType.curve.hdScheme.authenticationScheme.client". Explore whether there's need for the `hdScheme` and the following type: type HdSchemeUnion = "bip32-secp256k1" | "bip32-ed25519" | "slip10-ed25519" | "schnorrkel-sr25519";
  | "dogeLegacy"
  | "zecTransparent"
  | "aptBase"
  | "aptLegacy"
  | "ltcLegacy"
  | "ltcSegWit"
  | "ltcNativeSegWit";

type GetDerivationTypeUnion<T extends DerivationTypeUnion> = T;

type BtcDerivationTypeUnion = GetDerivationTypeUnion<
  "btcLegacy" | "btcSegWit" | "btcTaproot" | "btcP2wsh" | "btcP2wshInP2sh" | "btcNativeSegWit"
>;

type AdaDerivationTypeUnion = GetDerivationTypeUnion<
  "adaEnterprise" | "adaReward" | "adaBase" | "adaExodus"
>;

type XrpDerivationTypeUnion = GetDerivationTypeUnion<"xrpX" | "xrpBase">;

type AvaxDerivationTypeUnion = GetDerivationTypeUnion<"avaxX" | "avaxP">;

type BchDerivationTypeUnion = GetDerivationTypeUnion<"bchLegacy" | "bchCashAddr">;

type AptDerivationTypeUnion = GetDerivationTypeUnion<"aptBase" | "aptLegacy">;

type LtcDerivationTypeUnion = GetDerivationTypeUnion<"ltcLegacy" | "ltcSegWit" | "ltcNativeSegWit">;

type DotDerivationTypeUnion = GetDerivationTypeUnion<"dotBase" | "dotStandardHd" | "dotLedger">;

type SolDerivationTypeUnion = GetDerivationTypeUnion<"solBase" | "solExodus">;

type TonDerivationTypeUnion = GetDerivationTypeUnion<"tonBase" | "tonExodus">;

type DerivationTypeUnionByNetwork = {
  btc: BtcDerivationTypeUnion;
  ada: AdaDerivationTypeUnion;
  xrp: XrpDerivationTypeUnion;
  avax: AvaxDerivationTypeUnion;
  bch: BchDerivationTypeUnion;
  apt: AptDerivationTypeUnion;
  ltc: LtcDerivationTypeUnion;
  dot: DotDerivationTypeUnion;
  sol: SolDerivationTypeUnion;
  ton: TonDerivationTypeUnion;
  trx: GetDerivationTypeUnion<"trxBase">;
  sui: GetDerivationTypeUnion<"suiBase">;
  doge: GetDerivationTypeUnion<"dogeLegacy">;
  zec: GetDerivationTypeUnion<"zecTransparent">;
};

export type { GetDerivationTypeUnion, DerivationTypeUnion, DerivationTypeUnionByNetwork };
