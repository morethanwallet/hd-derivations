import { BITS_PER_BYTE } from "../constants/constants.js";
import { ExceptionMessage } from "../enums/enums.js";

import { KeyDerivationError } from "@/libs/modules/key-derivation/libs/exceptions/exceptions.js";

function bytesToBigIntLittleEndian(bytes: Uint8Array): bigint {
  let value = 0n;

  for (let index = bytes.length - 1; index >= 0; index--) {
    const currentByte = bytes[index];

    if (currentByte === undefined) {
      throw new KeyDerivationError(ExceptionMessage.FAILED_TO_FORMAT_BYTES);
    }

    value = (value << BITS_PER_BYTE) + BigInt(currentByte);
  }

  return value;
}

export { bytesToBigIntLittleEndian };
