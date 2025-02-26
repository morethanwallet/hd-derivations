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
  | "bnbBase"
  | "evmBase"
  | "xrpBase"
  | "xrpX"
  | "trxBase"
  | "tonBase"
  | "suiBase"
  | "dotBase"
  | "dotStandardHd"
  | "solBase"
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

type AdaDerivationTypeUnion = GetDerivationTypeUnion<"adaEnterprise" | "adaReward" | "adaBase">;

type XrpDerivationTypeUnion = GetDerivationTypeUnion<"xrpX" | "xrpBase">;

type AvaxDerivationTypeUnion = GetDerivationTypeUnion<"avaxX" | "avaxP">;

type BchDerivationTypeUnion = GetDerivationTypeUnion<"bchLegacy" | "bchCashAddr">;

type AptDerivationTypeUnion = GetDerivationTypeUnion<"aptBase" | "aptLegacy">;

type LtcDerivationTypeUnion = GetDerivationTypeUnion<"ltcLegacy" | "ltcSegWit" | "ltcNativeSegWit">;

type DotDerivationTypeUnion = GetDerivationTypeUnion<"dotBase" | "dotStandardHd">;

export type {
  DerivationTypeUnion,
  BtcDerivationTypeUnion,
  AdaDerivationTypeUnion,
  XrpDerivationTypeUnion,
  AvaxDerivationTypeUnion,
  BchDerivationTypeUnion,
  AptDerivationTypeUnion,
  LtcDerivationTypeUnion,
  DotDerivationTypeUnion,
  GetDerivationTypeUnion,
};
