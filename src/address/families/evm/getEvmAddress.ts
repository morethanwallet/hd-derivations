import { type Address } from "@/address/types/index.js";
import { checkAndRemoveEvmPublicKeyHexPrefix, toUint8Array } from "@/helpers/index.js";
import { type CommonKeyPair } from "@/keyDerivation/types/index.js";
import { addHexPrefix, importPublic, publicToAddress, toChecksumAddress } from "ethereumjs-util";

function getPublicKeyBuffer(publicKey: Uint8Array): Buffer {
  return Buffer.from(publicKey.buffer, publicKey.byteOffset, publicKey.byteLength);
}

function getEvmAddress(publicKey: CommonKeyPair["publicKey"]): Address["address"] {
  const unprefixedPublicKey = checkAndRemoveEvmPublicKeyHexPrefix(publicKey);
  const publicKeyBuffer = getPublicKeyBuffer(toUint8Array(Buffer.from(unprefixedPublicKey, "hex")));
  const evmPublicKey = importPublic(publicKeyBuffer);
  const addressBuffer = publicToAddress(evmPublicKey);
  const hexAddress = addHexPrefix(addressBuffer.toString("hex"));

  return toChecksumAddress(hexAddress);
}

export { getEvmAddress };
