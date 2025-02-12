import { ecPair, type ECPairInterface } from "@/libs/modules/ecc/index.js";
import { type PrefixConfig } from "@/libs/modules/keys/index.js";
import { type CommonKeyPair } from "@/libs/types/index.js";
import { KeyDerivationError } from "../exceptions/index.js";
import { ExceptionMessage } from "../enums/index.js";
import { convertBytesToHex } from "@/libs/utils/index.js";

function convertEcBytesPrivateKeyToHexKeyPair(
  bytes: Uint8Array,
  prefixConfig: PrefixConfig,
): CommonKeyPair {
  const keyPair: ECPairInterface = ecPair.fromPrivateKey(bytes, {
    network: prefixConfig,
  });

  if (!keyPair.privateKey) {
    throw new KeyDerivationError(ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);
  }

  const privateKey = convertBytesToHex(keyPair.privateKey);
  const publicKey = convertBytesToHex(keyPair.publicKey);

  return { privateKey, publicKey };
}

export { convertEcBytesPrivateKeyToHexKeyPair };
