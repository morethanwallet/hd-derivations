class AddressError extends Error {
  public constructor(message: string) {
    super(`Address Error: ${message}`);
    this.name = "AddressError";
  }
}

export { AddressError };
