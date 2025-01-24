function toUint8Array(buffer: Buffer | number[] | string): Uint8Array {
  const convertedBuffer =
    typeof buffer === "string" ? Buffer.from(buffer) : buffer;

  return Uint8Array.from(convertedBuffer);
}

export { toUint8Array };
