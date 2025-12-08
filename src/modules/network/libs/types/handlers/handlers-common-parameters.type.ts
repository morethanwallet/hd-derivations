import { type DerivationTypeUnionByNetwork, type DerivationTypeUnion } from "@/libs/types/types.js";

type HandlersCommonParameters<T extends DerivationTypeUnion> =
  T extends DerivationTypeUnionByNetwork["btc"] ? { base58RootKey?: string } : {};

export { type HandlersCommonParameters };
