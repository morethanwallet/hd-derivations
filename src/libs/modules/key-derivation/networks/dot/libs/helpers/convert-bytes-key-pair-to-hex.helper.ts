import type { CommonKeyPair } from "@/libs/types/keys/index.js";
import { convertBytesToHex } from "@/libs/utils/utils.js";

function convertBytesKeyPairToHex(
  publicKeyBytes: Uint8Array,
  privateKeyBytes: Uint8Array,
): CommonKeyPair {
  const publicKeyHex = convertBytesToHex(publicKeyBytes);
  const privateKeyHex = convertBytesToHex(privateKeyBytes);

  return { privateKey: privateKeyHex, publicKey: publicKeyHex };
}

export { convertBytesKeyPairToHex };
