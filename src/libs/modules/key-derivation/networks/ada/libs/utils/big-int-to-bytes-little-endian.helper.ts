import { BITS_PER_BYTE } from "../constants/constants.js";

function bigIntToBytesLittleEndian(value: bigint, outputLengthBytes: number): Uint8Array {
  const outputBytes = new Uint8Array(outputLengthBytes);
  let remainingValue = value;

  for (let index = 0; index < outputLengthBytes; index++) {
    outputBytes[index] = Number(remainingValue & 0xffn);
    remainingValue >>= BITS_PER_BYTE;
  }

  if (remainingValue !== 0n) {
    throw new Error(`bigIntToBytesLittleEndian overflow (${outputLengthBytes} bytes)`);
  }

  return outputBytes;
}

export { bigIntToBytesLittleEndian };
