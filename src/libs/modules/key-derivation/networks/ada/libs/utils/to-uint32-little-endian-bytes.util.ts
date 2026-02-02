function toUint32LittleEndianBytes(value: number): Uint8Array {
  const outputBytes = new Uint8Array(4);
  const dataView = new DataView(outputBytes.buffer);
  dataView.setUint32(0, value >>> 0, true);

  return outputBytes;
}

export { toUint32LittleEndianBytes };
