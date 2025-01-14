import { type NetworksTypesUnion } from "./networksTypeUnion.type.js";
import { type XrpAddressUnion, type AvaxAddressUnion } from "./addressUnion.type.js";

type CommonInconsistentDerivationParameters<TNetworkType extends NetworksTypesUnion> =
  TNetworkType extends "avax"
    ? { networkType: AvaxAddressUnion }
    : TNetworkType extends "xrp"
    ? {
        addressType: XrpAddressUnion;
        destinationTag?: number;
      }
    : Record<string, unknown>;

export { type CommonInconsistentDerivationParameters };
