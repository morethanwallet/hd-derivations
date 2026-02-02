import { SigningSchemeInput } from "@aptos-labs/ts-sdk";

import type { Curve } from "@/libs/enums/enums.js";

const signatureSchemeToSchemeId: Record<Curve["ED25519"] | Curve["SECP256K1"], number> = {
  ed25519: SigningSchemeInput.Ed25519,
  secp256k1: SigningSchemeInput.Secp256k1Ecdsa,
};

export { signatureSchemeToSchemeId };
