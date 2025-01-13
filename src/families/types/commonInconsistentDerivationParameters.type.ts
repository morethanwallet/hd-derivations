import { type NetworkTypeUnion as AvaxNetworkTypeUnion } from "@/families/avax/types/index.js";
import { type NetworksTypesUnion } from "./networksTypeUnion.type.js";

type CommonInconsistentDerivationParameters<TNetworkType extends NetworksTypesUnion> =
  TNetworkType extends "avax" ? { networkType: AvaxNetworkTypeUnion } : Record<string, unknown>;

export { type CommonInconsistentDerivationParameters };
