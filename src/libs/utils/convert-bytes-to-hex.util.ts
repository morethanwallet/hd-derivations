function convertBytesToHex(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("hex");
}

export { convertBytesToHex };
