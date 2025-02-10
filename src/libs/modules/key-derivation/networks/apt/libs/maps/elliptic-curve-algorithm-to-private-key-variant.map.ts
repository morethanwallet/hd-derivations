import { PrivateKeyVariants } from "@aptos-labs/ts-sdk";
import type { AptLibAvailableEllipticCurveAlgorithmUnion } from "../types/index.js";

const ellipticCurveAlgorithmToPrivateKeyVariant: Record<
  AptLibAvailableEllipticCurveAlgorithmUnion,
  PrivateKeyVariants
> = {
  ed25519: PrivateKeyVariants.Ed25519,
  secp256k1: PrivateKeyVariants.Secp256k1,
};

export { ellipticCurveAlgorithmToPrivateKeyVariant };
