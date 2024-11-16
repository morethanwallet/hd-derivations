const ExceptionMessage = {
  P2PKH_ADDRESS_GENERATION_FAILED: "Failed to generate a P2PKH address",
  P2PKH_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a P2PKH private key",
  P2WPKH_ADDRESS_GENERATION_FAILED: "Failed to generate a PW2PKH address",
  P2WPKH_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a PW2PKH private key",
  AVAX_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate an Avalanche private key",
  BNB_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a BNB Beacon private key",
  CASH_ADDR_ADDRESS_GENERATION_FAILED: "Failed to generate a Cash Addr address",
  CASH_ADDR_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a Cash Addr private key",
  EVM_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate an EVM private key",
  XRP_ADDRESS_GENERATION_FAILED: "Failed to generate a Ripple address",
  XRP_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a Ripple private key",
  ZCASH_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a Zcash private key",
} as const;

export { ExceptionMessage };
