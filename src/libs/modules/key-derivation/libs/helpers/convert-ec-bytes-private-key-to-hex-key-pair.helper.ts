import { ecPair, type ECPairInterface } from "@/libs/modules/ecc/index.js";
import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import { type CommonKeyPair } from "@/libs/types/index.js";
import { assert, toHexFromBytes } from "@/libs/helpers/index.js";
import { KeyDerivationError } from "@/libs//exceptions/index.js";
import { ExceptionMessage } from "../enums/index.js";

function convertEcBytesPrivateKeyToHexKeyPair(
  bytes: Uint8Array,
  prefixConfig: PrefixConfig,
): CommonKeyPair {
  const keyPair: ECPairInterface = ecPair.fromPrivateKey(bytes, {
    network: prefixConfig,
  });

  assert(keyPair.privateKey, KeyDerivationError, ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);
  const privateKey = toHexFromBytes(keyPair.privateKey);
  const publicKey = toHexFromBytes(keyPair.publicKey);

  return { privateKey, publicKey };
}

export { convertEcBytesPrivateKeyToHexKeyPair };
