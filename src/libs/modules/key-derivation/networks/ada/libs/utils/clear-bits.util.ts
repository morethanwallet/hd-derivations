function clearBits(byteValue: number, bitMask: number): number {
  return byteValue & ~bitMask;
}

export { clearBits };
