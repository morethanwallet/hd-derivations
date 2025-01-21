import { ecPair, type ECPairInterface } from "@/ecc/index.js";
import { ExceptionMessage, KeyDerivationError } from "../exceptions/index.js";
import { assert, toHexFromBytes } from "@/helpers/index.js";
import { type BIP32Interface } from "bip32";
import { type KeysConfig } from "@/keys/types/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import { convertEcBytesPrivateKeyToHexKeyPair } from "./convertEcBytesPrivateKeyToHexKeyPair.helper.js";

type GetKeyPairFromEcParameters = {
  keysConfig: KeysConfig;
  source?: Uint8Array | string | BIP32Interface;
  isPrivateKeyWifFormatted?: boolean;
};

function getKeyPairFromEc({
  keysConfig,
  source,
  isPrivateKeyWifFormatted = true,
}: GetKeyPairFromEcParameters): CommonKeyPair {
  assert(source, KeyDerivationError, ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);

  if (ArrayBuffer.isView(source)) {
    return convertEcBytesPrivateKeyToHexKeyPair(source, keysConfig);
  }

  if (typeof source === "string") {
    const keyPair: ECPairInterface = ecPair.fromWIF(source, keysConfig);
    const publicKey = toHexFromBytes(keyPair.publicKey);

    return { privateKey: source, publicKey };
  }

  const publicKey = toHexFromBytes(source.publicKey);

  if (isPrivateKeyWifFormatted) return { privateKey: source.toWIF(), publicKey };

  assert(source.privateKey, KeyDerivationError, ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);
  const privateKey = toHexFromBytes(source.privateKey);

  return { privateKey, publicKey };
}

export { getKeyPairFromEc };
