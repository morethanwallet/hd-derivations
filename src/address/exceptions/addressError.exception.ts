class AddressError extends Error {
  public constructor(message: string) {
    super(`Address Metadata Error: ${message}`);
    this.name = "AddressError";
  }
}

export { AddressError };
