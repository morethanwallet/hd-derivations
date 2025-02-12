class ValidationError extends Error {
  public constructor(message: string) {
    super(`Validation Error: ${message}`);

    this.name = "ValidationError";
  }
}

export { ValidationError };
