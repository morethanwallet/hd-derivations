import { type KeyPair } from "@/address/index.js";
import { ecPair, type ECPairInterface } from "@/ecc/index.js";
import { AddressError } from "@/exceptions/index.js";
import { assert, toHexFromBytes } from "@/helpers/index.js";

function getKeyPairFromEc(errorMessage: string, rawPrivateKey?: Uint8Array): KeyPair {
  assert(rawPrivateKey, AddressError, errorMessage);
  const keyPair: ECPairInterface = ecPair.fromPrivateKey(rawPrivateKey);
  const privateKey = toHexFromBytes(keyPair.privateKey);
  const publicKey = toHexFromBytes(keyPair.publicKey);

  return { privateKey, publicKey };
}

export { getKeyPairFromEc };
