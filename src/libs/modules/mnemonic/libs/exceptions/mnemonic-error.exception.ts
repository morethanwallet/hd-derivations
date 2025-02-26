class MnemonicError extends Error {
  public constructor(message: string) {
    super(`Mnemonic Error: ${message}`);
    this.name = "MnemonicError";
  }
}

export { MnemonicError };
