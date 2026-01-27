import type { CommonKeyPair } from "@/libs/types/keys";
import { curveToPublicKeyDeriver } from "../maps/maps";
import { Curve } from "@/libs/enums/enums";
import { convertHexToBytes } from "@/libs/utils";
import { convertBytesKeyPairToHex } from "./convert-bytes-key-pair-to-hex.helper";

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
