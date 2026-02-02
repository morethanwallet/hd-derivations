const LedgerDerivationHmacPrefix = {
  HARDENED_Z: 0x00,
  HARDENED_CHAIN_CODE: 0x01,
  NON_HARDENED_Z: 0x02,
  NON_HARDENED_CHAIN_CODE: 0x03,
} as const;

export { LedgerDerivationHmacPrefix };
