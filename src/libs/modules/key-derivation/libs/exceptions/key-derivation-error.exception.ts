class KeyDerivationError extends Error {
  public constructor(message: string) {
    super(message);
    console.error("Key Derivation Error:");
    this.name = "KeyDerivationError";
  }
}

export { KeyDerivationError };
