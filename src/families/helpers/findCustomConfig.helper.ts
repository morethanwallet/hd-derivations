import { type KeysConfig } from "@/keys/types/index.js";
import {
  type DerivationTypeMap,
  type AdaDerivationTypeUnion,
  type DerivationTypeUnion,
} from "@/types/derivation/index.js";

type KeysConfigRequiredDerivationTypeUnion = Exclude<
  DerivationTypeUnion,
  AdaDerivationTypeUnion | DerivationTypeMap["sol"] | DerivationTypeMap["tonBase"]
>;

function findCustomConfig(
  derivationType: KeysConfigRequiredDerivationTypeUnion,
  derivationConfigs: {
    derivationType: KeysConfigRequiredDerivationTypeUnion;
    keysConfig: KeysConfig;
  }[]
): KeysConfig | void {
  return derivationConfigs.find((config) => config.derivationType === derivationType)?.keysConfig;
}

export { findCustomConfig };
