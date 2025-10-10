import { type BtcDerivationTypeUnion, type DerivationTypeUnion } from "@/libs/types/types.js";

type HandlersCommonParameters<T extends DerivationTypeUnion> = T extends BtcDerivationTypeUnion
  ? { base58RootKey?: string }
  : {};

export { type HandlersCommonParameters };
