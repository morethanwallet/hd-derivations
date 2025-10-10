import { type CommonKeyPair } from "@/libs/types/index.js";
import { convertBytesToHex } from "@/libs/utils/index.js";
import { type BIP32Interface } from "bip32";
import { KeyDerivationError } from "../exceptions/index.js";
import { ExceptionMessage } from "../enums/index.js";

function getKeyPairFromBip32Interface(
  keyPair: BIP32Interface,
  isPrivateKeyWifFormatted: boolean,
): CommonKeyPair {
  const publicKey = convertBytesToHex(keyPair.publicKey);

  if (isPrivateKeyWifFormatted) {
    return { privateKey: keyPair.toWIF(), publicKey };
  }

  if (!keyPair.privateKey) {
    throw new KeyDerivationError(ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);
  }

  const privateKey = convertBytesToHex(keyPair.privateKey);

  return { privateKey, publicKey };
}

export { getKeyPairFromBip32Interface };
