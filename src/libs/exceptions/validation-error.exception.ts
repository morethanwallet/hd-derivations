class ValidationError extends Error {
  public constructor(message: string) {
    super(`Address Error: ${message}`);

    this.name = "ExceptionError";
  }
}

export { ValidationError };
