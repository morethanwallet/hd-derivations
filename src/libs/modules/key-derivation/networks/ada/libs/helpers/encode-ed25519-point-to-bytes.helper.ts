import type { EdwardsPoint } from "@noble/curves/abstract/edwards.js";
import { hexToBytes } from "@noble/curves/utils.js";

function encodeEd25519PointToBytes(point: EdwardsPoint): Uint8Array {
  if (typeof point.toBytes === "function") {
    return point.toBytes();
  }

  if (typeof point.toHex === "function") {
    return hexToBytes(point.toHex());
  }

  throw new Error("Point encoding method not found");
}

export { encodeEd25519PointToBytes };
