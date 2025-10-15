import type { GetSignatureSchemeUnion } from "@/libs/types/types";
import { PrivateKeyVariants } from "@aptos-labs/ts-sdk";

const signatureSchemeToPrivateKeyVariant: Record<
  GetSignatureSchemeUnion<"ed25519" | "secp256k1">,
  PrivateKeyVariants
> = {
  ed25519: PrivateKeyVariants.Ed25519,
  secp256k1: PrivateKeyVariants.Secp256k1,
};

export { signatureSchemeToPrivateKeyVariant };
