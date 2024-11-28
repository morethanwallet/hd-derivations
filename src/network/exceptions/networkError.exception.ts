class NetworkError extends Error {
  public constructor(message: string) {
    super(`Network Metadata Error: ${message}`);
    this.name = "NetworkError";
  }
}

export { NetworkError };
