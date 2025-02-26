class NetworkError extends Error {
  public constructor(message: string) {
    super(`Network Error: ${message}`);
    this.name = "NetworkError";
  }
}

export { NetworkError };
