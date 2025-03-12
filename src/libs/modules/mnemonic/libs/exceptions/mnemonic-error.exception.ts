class MnemonicError extends Error {
  public constructor(message: string) {
    super(message);
    console.error("Mnemonic Error:");
    this.name = "MnemonicError";
  }
}

export { MnemonicError };
