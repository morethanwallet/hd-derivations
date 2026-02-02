import { fromBase64 } from "@mysten/sui/utils";

import type { Address } from "../../libs/types/index.js";
import { getPublicKeyHandler } from "./libs/helpers/index.js";

import type { CommonKeyPair } from "@/libs/types/types.js";
import type { Curve } from "@/libs/enums/enums.js";

function getSuiAddress(
  publicKey: CommonKeyPair["publicKey"],
  scheme: Curve["ED25519"] | Curve["SECP256K1"] | Curve["SECP256R1"],
): Address["address"] {
  const flagByteEndIndex = 1;
  const decodedKey = fromBase64(publicKey);
  const flagByteStrippedKey = decodedKey.subarray(flagByteEndIndex);
  const publicKeyKeyHandler = getPublicKeyHandler(scheme);
  const ed25519Key = new publicKeyKeyHandler(flagByteStrippedKey);

  return ed25519Key.toSuiAddress();
}

export { getSuiAddress };
