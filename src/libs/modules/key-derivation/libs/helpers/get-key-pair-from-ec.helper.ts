import { ecPair, type ECPairInterface } from "@/libs/modules/ecc/index.js";
import { ExceptionMessage } from "../enums/index.js";
import { KeyDerivationError } from "@/libs/exceptions/index.js";
import { assert, toHexFromBytes } from "@/libs/helpers/index.js";
import { type BIP32Interface } from "bip32";
import type { PrefixConfigProperty } from "@/libs/modules/keys/index.js";
import { type CommonKeyPair } from "@/libs/types/index.js";
import { convertEcBytesPrivateKeyToHexKeyPair } from "./convert-ec-bytes-private-key-to-hex-key-pair.helper.js";

type GetKeyPairFromEcParameters = {
  source?: Uint8Array | string | BIP32Interface;
  isPrivateKeyWifFormatted?: boolean;
} & PrefixConfigProperty;

function getKeyPairFromEc({
  prefixConfig,
  source,
  isPrivateKeyWifFormatted = true,
}: GetKeyPairFromEcParameters): CommonKeyPair {
  assert(source, KeyDerivationError, ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);

  if (ArrayBuffer.isView(source)) {
    return convertEcBytesPrivateKeyToHexKeyPair(source, prefixConfig);
  }

  if (typeof source === "string") {
    const keyPair: ECPairInterface = ecPair.fromWIF(source, prefixConfig);
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
