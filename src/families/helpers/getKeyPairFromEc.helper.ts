import { ecPair, type ECPairInterface } from "@/ecc/index.js";
import { assert, toHexFromBytes } from "@/helpers/index.js";
import { type BIP32Interface } from "bip32";
import { type KeysConfig } from "@/keys/types/index.js";
import { type DerivedKeyPair } from "../types/index.js";
import { NetworkError } from "../exceptions/networkError.exception.js";

function getKeyPairFromEc(
  errorMessage: string,
  keysConfig: KeysConfig,
  source?: Uint8Array | string | BIP32Interface
): DerivedKeyPair {
  assert(source, NetworkError, errorMessage);

  if (ArrayBuffer.isView(source)) {
    const keyPair: ECPairInterface = ecPair.fromPrivateKey(source, { network: keysConfig });
    const privateKey = toHexFromBytes(keyPair.privateKey);
    const publicKey = toHexFromBytes(keyPair.publicKey);

    return { privateKey, publicKey };
  }

  if (typeof source === "string") {
    const keyPair: ECPairInterface = ecPair.fromWIF(source, keysConfig);
    const publicKey = toHexFromBytes(keyPair.publicKey);

    return { privateKey: source, publicKey };
  }

  const privateKey = source.toWIF();
  const publicKey = toHexFromBytes(source.publicKey);

  return { privateKey, publicKey };
}

export { getKeyPairFromEc };
