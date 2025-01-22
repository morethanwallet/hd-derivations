import { type TonAddressRequiredData } from "@/types/address/index.js";
import { type BtcDerivationTypeUnion, type DerivationTypeUnion } from "@/types/derivation/index.js";

type DerivationHandlersCommonParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends BtcDerivationTypeUnion
    ? { base58RootKey?: string }
    : TDerivationType extends "tonBase"
    ? TonAddressRequiredData
    : Record<string, unknown>;

export { type DerivationHandlersCommonParameters };
