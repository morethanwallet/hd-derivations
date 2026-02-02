import { concatBytes } from "@noble/hashes/utils.js";
import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

import { ED25519_EXTENDED_PRIVATE_KEY_LENGTH_BYTES } from "../constants/constants.js";
import { ExceptionMessage } from "../enums/enums.js";

import { KeyDerivationError } from "@/libs/modules/key-derivation/libs/exceptions/exceptions.js";

type AdaLedgerNode = {
  chainCodeBytes: Uint8Array; // 32
  leftPrivateKeyBytes: Uint8Array; // 32 (kL)
  rightPrivateKeyBytes: Uint8Array; // 32 (kR)
  publicKeyBytes: Uint8Array; // 32 (A)
};

function getAdaLedgerExtendedPrivateKeyFromNode(node: AdaLedgerNode): PrivateKey {
  const extendedPrivateKeyBytes = concatBytes(node.leftPrivateKeyBytes, node.rightPrivateKeyBytes);

  if (extendedPrivateKeyBytes.length !== ED25519_EXTENDED_PRIVATE_KEY_LENGTH_BYTES) {
    throw new KeyDerivationError(ExceptionMessage.FAILED_TO_FORMAT_BYTES);
  }

  return PrivateKey.from_extended_bytes(extendedPrivateKeyBytes);
}

export { getAdaLedgerExtendedPrivateKeyFromNode };
