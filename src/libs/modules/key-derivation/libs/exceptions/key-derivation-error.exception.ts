class KeyDerivationError extends Error {
  public constructor(message: string) {
    super(`Key Derivation Error: ${message}`);
    this.name = "KeyDerivationError";
  }
}

export { KeyDerivationError };
