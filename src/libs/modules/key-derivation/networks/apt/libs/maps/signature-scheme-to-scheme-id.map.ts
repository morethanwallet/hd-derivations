import type { GetSignatureSchemeUnion } from "@/libs/types";
import { SigningSchemeInput } from "@aptos-labs/ts-sdk";

const signatureSchemeToSchemeId: Record<
  GetSignatureSchemeUnion<"ed25519" | "secp256k1">,
  number
> = {
  ed25519: SigningSchemeInput.Ed25519,
  secp256k1: SigningSchemeInput.Secp256k1Ecdsa,
};

export { signatureSchemeToSchemeId };
