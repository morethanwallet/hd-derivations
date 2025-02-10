import type { CommonKeyPair, EllipticCurveAlgorithmUnion } from "@/libs/types/index.js";
import type { Address } from "../../libs/types/index.js";
import { fromBase64 } from "@mysten/sui/utils";
import { getPublicKeyHandler } from "./libs/helpers/index.js";

function getSuiAddress(
  publicKey: CommonKeyPair["publicKey"],
  algorithm: EllipticCurveAlgorithmUnion,
): Address["address"] {
  const flagByteEndIndex = 1;
  const decodedKey = fromBase64(publicKey);
  const flagByteStrippedKey = decodedKey.subarray(flagByteEndIndex);
  const publicKeyKeyHandler = getPublicKeyHandler(algorithm);
  const ed25519Key = new publicKeyKeyHandler(flagByteStrippedKey);

  return ed25519Key.toSuiAddress();
}

export { getSuiAddress };
