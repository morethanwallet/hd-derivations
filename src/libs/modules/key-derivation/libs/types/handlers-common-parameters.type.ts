import type {
  DerivationTypeMap,
  DerivationTypeUnion,
  SignatureSchemeProperty,
} from "@/libs/types/index.js";

type HandlersCommonParameters<T extends DerivationTypeUnion> =
  T extends DerivationTypeMap["suiBase"] ? SignatureSchemeProperty : Record<string, unknown>;

export type { HandlersCommonParameters };
