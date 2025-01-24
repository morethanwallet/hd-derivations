import { type TonAddressRequiredData } from "@/modules/address/index.js";
import {
  type BtcDerivationTypeUnion,
  type DerivationTypeUnion,
} from "@/libs/types/index.js";

type CommonHandlersParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends BtcDerivationTypeUnion
    ? { base58RootKey?: string }
    : TDerivationType extends "tonBase"
      ? TonAddressRequiredData
      : Record<string, unknown>;

export { type CommonHandlersParameters };
