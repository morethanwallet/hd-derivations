import { SigningSchemeInput } from "@aptos-labs/ts-sdk";
import type { AptLibAvailableEllipticCurveAlgorithmUnion } from "../types/index.js";

const ellipticCurveAlgorithmToSchemeId: Record<AptLibAvailableEllipticCurveAlgorithmUnion, number> =
  {
    ed25519: SigningSchemeInput.Ed25519,
    secp256k1: SigningSchemeInput.Secp256k1Ecdsa,
  };

export { ellipticCurveAlgorithmToSchemeId };
