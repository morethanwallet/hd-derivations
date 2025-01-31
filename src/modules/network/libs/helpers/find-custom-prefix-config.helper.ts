import type { PrefixConfig } from "@/libs/modules/keys/index.js";
import { type DerivationTypeUnion } from "@/libs/types/index.js";
import type {
  AvaxDerivationConfig,
  BchDerivationConfig,
  BtcDerivationConfig,
  TrxDerivationConfig,
  XrpDerivationConfig,
} from "../types/index.js";

type DerivationConfigUnion =
  | AvaxDerivationConfig
  | BtcDerivationConfig
  | TrxDerivationConfig
  | BchDerivationConfig
  | XrpDerivationConfig;

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
