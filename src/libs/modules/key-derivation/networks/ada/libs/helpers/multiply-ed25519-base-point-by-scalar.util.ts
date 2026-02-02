import { ed25519 } from "@noble/curves/ed25519.js";
import type { EdwardsPoint } from "@noble/curves/abstract/edwards.js";

import { ED25519_SUBGROUP_ORDER } from "../constants/constants.js";

function normalizeScalarToEd25519SubgroupOrder(candidateScalar: bigint): bigint {
  const reduced = candidateScalar % ED25519_SUBGROUP_ORDER;

  if (reduced < 0n) {
    return reduced + ED25519_SUBGROUP_ORDER;
  }

  return reduced;
}

export { normalizeScalarToEd25519SubgroupOrder };

function multiplyEd25519BasePointByScalar(scalar: bigint): EdwardsPoint {
  const normalizedScalar = normalizeScalarToEd25519SubgroupOrder(scalar);

  const basePoint = ed25519.Point.BASE;

  if (normalizedScalar === 0n && typeof basePoint.multiplyUnsafe === "function") {
    return basePoint.multiplyUnsafe(scalar);
  }

  if (normalizedScalar === 0n) {
    throw new Error("Scalar reduced to 0)");
  }

  return basePoint.multiply(normalizedScalar);
}

export { multiplyEd25519BasePointByScalar };
