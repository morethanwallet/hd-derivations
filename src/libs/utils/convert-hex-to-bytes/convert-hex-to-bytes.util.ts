import { ValidationError } from "@/libs/exceptions/index.js";
import { ExceptionMessage } from "./libs/enums/index.js";
import { EVEN_NUMBER_CHECK_DIVIDER, EVEN_NUMBER_IDENTIFIER } from "./libs/constants/index.js";

function convertHexToBytes(hex: string): Uint8Array {
  const hexLength = hex.length;

  if (hexLength % EVEN_NUMBER_CHECK_DIVIDER !== EVEN_NUMBER_IDENTIFIER) {
    const invalidHexExceptionMessage = `${ExceptionMessage.INVALID_HEX_STRING}, got unpadded hex of length ${hexLength}`;
    throw new ValidationError(invalidHexExceptionMessage);
  }

  const buffer = Buffer.from(hex, "hex");

  return Uint8Array.from(buffer);
}

export { convertHexToBytes };
