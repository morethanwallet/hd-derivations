import type {
  DerivationTypeMap,
  DerivationTypeUnion,
  GetSignatureSchemeUnion,
} from "@/libs/types/index.js";

type HandlersCommonParameters<T extends DerivationTypeUnion> =
  T extends DerivationTypeMap["suiBase"]
    ? { algorithm: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1"> }
    : Record<string, string>;

export type { HandlersCommonParameters };
