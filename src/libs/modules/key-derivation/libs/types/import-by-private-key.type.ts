import type {
  PrivateKey,
  KeyPair,
  DerivationTypeUnion,
  AptDerivationTypeUnion,
  EllipticCurveAlgorithmUnion,
} from "@/libs/types/index.js";
import type { HandlersCommonParameters } from "./handlers-common-parameters.type.js";

type AptParameters = {
  isLegacy: boolean;
  algorithm: EllipticCurveAlgorithmUnion;
};

type ImportByPrivateKeyParameters<T extends DerivationTypeUnion> = PrivateKey<T> &
  (T extends AptDerivationTypeUnion ? AptParameters : HandlersCommonParameters<T>);

type ImportByPrivateKey<T extends DerivationTypeUnion> = (
  parameters: ImportByPrivateKeyParameters<T>,
) => KeyPair<T>;

export type { ImportByPrivateKey, ImportByPrivateKeyParameters };
