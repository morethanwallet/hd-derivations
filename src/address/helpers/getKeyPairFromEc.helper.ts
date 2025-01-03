import { type KeyPair } from "@/address/index.js";
import { ecPair, type ECPairInterface } from "@/ecc/index.js";
import { AddressError } from "../exceptions/index.js";
import { assert, toHexFromBytes } from "@/helpers/index.js";
import { type BIP32Interface } from "bip32";

function getKeyPairFromEc(
  errorMessage: string,
  source?: Uint8Array | string | BIP32Interface
): KeyPair {
  assert(source, AddressError, errorMessage);

  if (ArrayBuffer.isView(source)) {
    const keyPair: ECPairInterface = ecPair.fromPrivateKey(source);
    const privateKey = toHexFromBytes(keyPair.privateKey);
    const publicKey = toHexFromBytes(keyPair.publicKey);

    return { privateKey, publicKey };
  }

  if (typeof source === "string") {
    const keyPair: ECPairInterface = ecPair.formWIF(source);
    const publicKey = toHexFromBytes(keyPair.publicKey);

    return { privateKey: source, publicKey };
  }

  const privateKey = source.toWIF();
  const publicKey = toHexFromBytes(source.publicKey);

  return { privateKey, publicKey };
}

export { getKeyPairFromEc };
