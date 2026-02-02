import type { GetDerivationConfig } from "../types/index.js";

import type { PrefixConfig } from "@/libs/modules/curves/curves.js";
import { type DerivationTypeUnion } from "@/libs/types/types.js";

type DerivationConfigUnion = GetDerivationConfig<
  "trx" | "avax" | "btc" | "bch" | "xrp" | "doge" | "zec" | "ltc"
>;

function findCustomPrefixConfig(
  derivationType: DerivationTypeUnion,
  derivationConfig: DerivationConfigUnion,
): PrefixConfig | undefined {
  const { prefixConfig } = derivationConfig;

  if (derivationConfig.derivationType === derivationType) {
    return prefixConfig;
  }
}

export { findCustomPrefixConfig };
