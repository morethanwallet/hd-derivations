const ExceptionMessage = {
  PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a private key",
  ZCASH_INVALID_WIF_PREFIX: "Zcash WIF prefix is invalid",
  INVALID_PRIVATE_KEY: "Private key is invalid",
} as const;

export { ExceptionMessage };
