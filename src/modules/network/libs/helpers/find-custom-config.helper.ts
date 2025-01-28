import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import {
  type DerivationTypeMap,
  type AdaDerivationTypeUnion,
  type DerivationTypeUnion,
} from "@/libs/types/index.js";
import type {
  AvaxDerivationConfig,
  BtcDerivationConfig,
  TrxDerivationConfig,
} from "../types/index.js";

type KeysConfigRequiredDerivationTypeUnion = Exclude<
  DerivationTypeUnion,
  AdaDerivationTypeUnion | DerivationTypeMap["sol"] | DerivationTypeMap["tonBase"]
>;

type DerivationConfigUnion = AvaxDerivationConfig | BtcDerivationConfig | TrxDerivationConfig;

function findCustomConfig(
  derivationType: KeysConfigRequiredDerivationTypeUnion,
  derivationConfig: DerivationConfigUnion,
): PrefixConfig | void {
  if (derivationConfig.derivationType === derivationType) return derivationConfig.prefixConfig;
}

export { findCustomConfig };
