import type { GetDerivationTypeUnion } from "@/libs/types/index.js";

type CommonEd25519DerivationTypeUnion = GetDerivationTypeUnion<"tonBase" | "dotStandardHd">;

export type { CommonEd25519DerivationTypeUnion };
