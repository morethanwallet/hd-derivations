import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import {
  type DerivationTypeMap,
  type AdaDerivationTypeUnion,
  type DerivationTypeUnion,
} from "@/libs/types/index.js";

type KeysConfigRequiredDerivationTypeUnion = Exclude<
  DerivationTypeUnion,
  AdaDerivationTypeUnion | DerivationTypeMap["sol"] | DerivationTypeMap["tonBase"]
>;

function findCustomConfig(
  derivationType: KeysConfigRequiredDerivationTypeUnion,
  derivationConfigs: {
    derivationType: KeysConfigRequiredDerivationTypeUnion;
    prefixConfig: PrefixConfig;
  }[]
): PrefixConfig | void {
  return derivationConfigs.find((config) => config.derivationType === derivationType)?.prefixConfig;
}

export { findCustomConfig };
