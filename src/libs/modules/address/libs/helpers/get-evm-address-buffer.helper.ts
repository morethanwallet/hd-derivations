import { toUint8Array } from "@/libs/helpers/index.js";
import { checkAndRemoveHexPrefix } from "@/libs/utils/index.js";
import { type CommonKeyPair } from "@/libs/types/index.js";
import { importPublic, publicToAddress } from "ethereumjs-util";

function getPublicKeyBuffer(publicKey: Uint8Array): Buffer {
  return Buffer.from(publicKey.buffer, publicKey.byteOffset, publicKey.byteLength);
}

function getEvmAddressBuffer(publicKey: CommonKeyPair["publicKey"]): Buffer {
  const unprefixedPublicKey = checkAndRemoveHexPrefix(publicKey);
  const publicKeyBuffer = getPublicKeyBuffer(toUint8Array(Buffer.from(unprefixedPublicKey, "hex")));
  const evmPublicKey = importPublic(publicKeyBuffer);

  return publicToAddress(evmPublicKey);
}

export { getEvmAddressBuffer };
