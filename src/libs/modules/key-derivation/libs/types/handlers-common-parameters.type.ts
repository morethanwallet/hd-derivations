import type {
  DerivationTypeMap,
  DerivationTypeUnion,
  EllipticCurveAlgorithmUnion,
} from "@/libs/types/index.js";

type HandlersCommonParameters<T extends DerivationTypeUnion> =
  T extends DerivationTypeMap["suiBase"]
    ? { algorithm: EllipticCurveAlgorithmUnion }
    : Record<string, string>;

export type { HandlersCommonParameters };
