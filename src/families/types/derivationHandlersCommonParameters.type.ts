import { type BtcDerivationTypeUnion, type DerivationTypeUnion } from "@/types/index.js";

type DerivationHandlersCommonParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends BtcDerivationTypeUnion
    ? { base58RootKey?: string }
    : Record<string, unknown>;

export { type DerivationHandlersCommonParameters };
