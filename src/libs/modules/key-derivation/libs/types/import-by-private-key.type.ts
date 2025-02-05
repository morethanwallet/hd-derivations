import type { PrivateKey, KeyPair, DerivationTypeUnion } from "@/libs/types/index.js";
import type { HandlersCommonParameters } from "./handlers-common-parameters.type.js";

type ImportByPrivateKeyParameters<T extends DerivationTypeUnion> = PrivateKey<T> &
  HandlersCommonParameters<T>;

type ImportByPrivateKey<T extends DerivationTypeUnion> = (
  parameters: ImportByPrivateKeyParameters<T>,
) => KeyPair<T>;

export type { ImportByPrivateKey, ImportByPrivateKeyParameters };
