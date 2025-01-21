import { type KeysConfig } from "@/keys/types/index.js";
import { type DerivationTypeUnion } from "@/types/derivation/index.js";

function findCustomConfig(
  derivationType: DerivationTypeUnion,
  derivationConfigs: { derivationType: DerivationTypeUnion; keysConfig: KeysConfig }[]
): KeysConfig | void {
  return derivationConfigs.find((config) => config.derivationType === derivationType)?.keysConfig;
}

export { findCustomConfig };
