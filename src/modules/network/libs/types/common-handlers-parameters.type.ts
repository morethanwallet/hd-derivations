import { type BtcDerivationTypeUnion, type DerivationTypeUnion } from "@/libs/types/index.js";

type CommonHandlersParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends BtcDerivationTypeUnion
    ? { base58RootKey?: string }
    : Record<string, unknown>;

export { type CommonHandlersParameters };
