const ExceptionMessage = {
  INVALID_SCHEME: "Invalid scheme",
  INVALID_DERIVATION_PATH: "Invalid derivation path",
  PROVIDED_DATA_IS_INVALID: "Provided data is invalid",
  ZCASH_INVALID_WIF_PREFIX: "Zcash WIF prefix is invalid",
  PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a private key",
} as const;

export { ExceptionMessage };
