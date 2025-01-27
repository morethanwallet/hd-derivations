import type { PrivateKey, KeyPair, DerivationTypeUnion } from "@/libs/types/index.js";
import type { CommonHandlersParameters } from "./common-handlers-parameters.type.js";

type ImportByPrivateKeyParameters<TDerivationType extends DerivationTypeUnion> =
  PrivateKey<TDerivationType> & CommonHandlersParameters<TDerivationType>;

type ImportByPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: ImportByPrivateKeyParameters<TDerivationType>,
) => KeyPair<TDerivationType>;

export type { ImportByPrivateKey, ImportByPrivateKeyParameters };
