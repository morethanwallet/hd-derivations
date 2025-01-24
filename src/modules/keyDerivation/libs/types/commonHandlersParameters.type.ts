import type {
  DerivationTypeMap,
  DerivationTypeUnion,
  SignatureSchemeProperty,
} from "@/libs/types/index.js";

type CommonHandlersParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["suiBase"]
    ? SignatureSchemeProperty
    : Record<string, unknown>;

export type { CommonHandlersParameters };
