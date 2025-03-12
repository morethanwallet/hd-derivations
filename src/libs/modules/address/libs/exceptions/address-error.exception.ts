class AddressError extends Error {
  public constructor(message: string) {
    super(message);
    console.error("Address Error:");
    this.name = "AddressError";
  }
}

export { AddressError };
