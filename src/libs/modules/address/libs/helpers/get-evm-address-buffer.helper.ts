import { importPublic, publicToAddress } from "ethereumjs-util";

import { checkAndRemoveHexPrefix, convertHexToBytes } from "@/libs/utils/utils.js";
import { type CommonKeyPair } from "@/libs/types/types.js";

function getPublicKeyBuffer(publicKey: Uint8Array): Buffer {
  return Buffer.from(publicKey.buffer, publicKey.byteOffset, publicKey.byteLength);
}

function getEvmAddressBuffer(publicKey: CommonKeyPair["publicKey"]): Buffer {
  const unprefixedPublicKey = checkAndRemoveHexPrefix(publicKey);
  const publicKeyBytes = convertHexToBytes(unprefixedPublicKey);
  const publicKeyBuffer = getPublicKeyBuffer(publicKeyBytes);
  const evmPublicKey = importPublic(publicKeyBuffer);

  return publicToAddress(evmPublicKey);
}

export { getEvmAddressBuffer };
