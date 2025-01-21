import { checkAndRemoveEvmPublicKeyHexPrefix, toUint8Array } from "@/helpers/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import { importPublic, publicToAddress } from "ethereumjs-util";

function getPublicKeyBuffer(publicKey: Uint8Array): Buffer {
  return Buffer.from(publicKey.buffer, publicKey.byteOffset, publicKey.byteLength);
}

function getEvmAddressBuffer(publicKey: CommonKeyPair["publicKey"]): Buffer {
  const unprefixedPublicKey = checkAndRemoveEvmPublicKeyHexPrefix(publicKey);
  const publicKeyBuffer = getPublicKeyBuffer(toUint8Array(Buffer.from(unprefixedPublicKey, "hex")));
  const evmPublicKey = importPublic(publicKeyBuffer);

  return publicToAddress(evmPublicKey);
}

export { getEvmAddressBuffer };
