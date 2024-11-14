class AddressError extends Error {
  public constructor(message: string) {
    super(`Network Metadata Error: ${message}`);
    this.name = "AddressError";
  }
}

export { AddressError };
