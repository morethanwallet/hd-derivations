import type { Bip32PrivateKey } from "@stricahq/bip32ed25519";

import type { CommonKeyPair } from "@/libs/types/types.js";
import { convertBytesToHex } from "@/libs/utils/utils.js";

function getKeyPairFromNode(node: Bip32PrivateKey): CommonKeyPair {
  const privateKeyInstance = node.toPrivateKey();
  const publicKeyInstance = privateKeyInstance.toPublicKey();
  const privateKey = convertBytesToHex(privateKeyInstance.toBytes());
  const publicKey = convertBytesToHex(publicKeyInstance.toBytes());

  return { privateKey, publicKey };
}

export { getKeyPairFromNode };
