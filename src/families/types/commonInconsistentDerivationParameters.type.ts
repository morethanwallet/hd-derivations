import { type XrpAddressUnion, type AvaxAddressUnion } from "./addressUnion.type.js";
import { type DerivationTypeUnion } from "@/types/index.js";

type CommonInconsistentDerivationParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends "avax"
    ? { networkType: AvaxAddressUnion }
    : TDerivationType extends "xrp"
    ? {
        addressType: XrpAddressUnion;
        destinationTag?: number;
      }
    : Record<string, unknown>;

export { type CommonInconsistentDerivationParameters };
