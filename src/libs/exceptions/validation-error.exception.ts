class ValidationError extends Error {
  public constructor(message: string) {
    super(message);
    console.error("Validation Error:");
    this.name = "ValidationError";
  }
}

export { ValidationError };
