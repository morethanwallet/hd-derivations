import type { EllipticCurveAlgorithmUnion } from "@/libs/types/index.js";

type AptLibAvailableEllipticCurveAlgorithmUnion = Exclude<EllipticCurveAlgorithmUnion, "secp256r1">;

export type { AptLibAvailableEllipticCurveAlgorithmUnion };
