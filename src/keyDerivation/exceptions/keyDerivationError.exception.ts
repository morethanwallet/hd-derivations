class KeyDerivationError extends Error {
  public constructor(message: string) {
    super(`Address Metadata Error: ${message}`);
    this.name = "KeyDerivationError";
  }
}

export { KeyDerivationError };
