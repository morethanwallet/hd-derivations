import { curveToPublicKeyDeriver } from "../maps/maps.js";
import { convertBytesKeyPairToHex } from "./convert-bytes-key-pair-to-hex.helper.js";

import type { CommonKeyPair } from "@/libs/types/keys/index.js";
import { type Curve } from "@/libs/enums/enums.js";
import { convertHexToBytes } from "@/libs/utils/utils.js";

function importByPrivateKey(
  privateKeyHex: string,
  curve: Curve["ED25519" | "SECP256K1" | "SR25519"],
): CommonKeyPair {
  const derivePublicKey = curveToPublicKeyDeriver[curve];
  const privateKeyBytes = convertHexToBytes(privateKeyHex);
  const publicKeyBytes = derivePublicKey(privateKeyBytes);

  return convertBytesKeyPairToHex(publicKeyBytes, privateKeyBytes);
}

export { importByPrivateKey };
