import { type XrpAddressUnion } from "./addressUnion.type.js";
import { type AvaxDerivationTypeUnion, type DerivationTypeUnion } from "@/types/index.js";

type CommonInconsistentDerivationParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends AvaxDerivationTypeUnion
    ? { isMainnet: boolean }
    : TDerivationType extends "xrp"
    ? {
        addressType: XrpAddressUnion;
        destinationTag?: number;
      }
    : Record<string, unknown>;

export { type CommonInconsistentDerivationParameters };
