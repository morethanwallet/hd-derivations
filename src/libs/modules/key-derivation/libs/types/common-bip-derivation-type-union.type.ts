import type { GetDerivationTypeUnion, DerivationTypeUnionByNetwork } from "@/libs/types/types.js";

type CommonBipDerivationTypeUnion = GetDerivationTypeUnion<
  | DerivationTypeUnionByNetwork["btc"]
  | DerivationTypeUnionByNetwork["bch"]
  | DerivationTypeUnionByNetwork["avax"]
  | DerivationTypeUnionByNetwork["xrp"]
  | DerivationTypeUnionByNetwork["trx"]
  | DerivationTypeUnionByNetwork["doge"]
  | DerivationTypeUnionByNetwork["ltc"]
>;

export { type CommonBipDerivationTypeUnion };
