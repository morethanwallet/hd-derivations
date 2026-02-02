import { PrivateKeyVariants } from "@aptos-labs/ts-sdk";

import type { Curve } from "@/libs/enums/enums.js";

const signatureSchemeToPrivateKeyVariant: Record<
  Curve["ED25519"] | Curve["SECP256K1"],
  PrivateKeyVariants
> = {
  ed25519: PrivateKeyVariants.Ed25519,
  secp256k1: PrivateKeyVariants.Secp256k1,
};

export { signatureSchemeToPrivateKeyVariant };
