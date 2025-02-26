import type { CommonKeyPair, GetSignatureSchemeUnion } from "@/libs/types/index.js";
import type { Address } from "../../libs/types/index.js";
import { fromBase64 } from "@mysten/sui/utils";
import { getPublicKeyHandler } from "./libs/helpers/index.js";

function getSuiAddress(
  publicKey: CommonKeyPair["publicKey"],
  scheme: GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "secp256r1">,
): Address["address"] {
  const flagByteEndIndex = 1;
  const decodedKey = fromBase64(publicKey);
  const flagByteStrippedKey = decodedKey.subarray(flagByteEndIndex);
  const publicKeyKeyHandler = getPublicKeyHandler(scheme);
  const ed25519Key = new publicKeyKeyHandler(flagByteStrippedKey);

  return ed25519Key.toSuiAddress();
}

export { getSuiAddress };
