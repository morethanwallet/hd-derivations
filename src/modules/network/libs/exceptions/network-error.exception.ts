class NetworkError extends Error {
  public constructor(message: string) {
    super(message);
    console.error("Network Error:");
    this.name = "NetworkError";
  }
}

export { NetworkError };
