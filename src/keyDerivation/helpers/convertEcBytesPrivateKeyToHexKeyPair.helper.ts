import { ecPair, type ECPairInterface } from "@/ecc/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { type CommonKeyPair } from "../types/index.js";
import { toHexFromBytes } from "@/helpers/index.js";

function convertEcBytesPrivateKeyToHexKeyPair(
  bytes: Uint8Array,
  keysConfig: KeysConfig
): CommonKeyPair {
  const keyPair: ECPairInterface = ecPair.fromPrivateKey(bytes, { network: keysConfig });
  const privateKey = toHexFromBytes(keyPair.privateKey);
  const publicKey = toHexFromBytes(keyPair.publicKey);

  return { privateKey, publicKey };
}

export { convertEcBytesPrivateKeyToHexKeyPair };
