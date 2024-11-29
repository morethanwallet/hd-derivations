const ExceptionMessage = {
  P2PKH_ADDRESS_GENERATION_FAILED: "Failed to generate a P2PKH address",
  P2PKH_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a P2PKH private key",
  P2WPKH_ADDRESS_GENERATION_FAILED: "Failed to generate a PW2PKH address",
  P2WPKH_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a PW2PKH private key",
  TAPROOT_ADDRESS_GENERATION_FAILED: "Failed to generate a Taproot address",
  TAPROOT_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a Taproot private key",
  P2WPKH_IN_P2SH_ADDRESS_GENERATION_FAILED: "Failed to generate a P2WPKH in P2SH address",
  P2WPKH_IN_P2SH_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a P2WPKH in P2SH private key",
  P2WSH_ADDRESS_GENERATION_FAILED: "Failed to generate a P2WSH address",
  P2WSH_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a P2WSH private key",
  AVAX_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate an Avalanche private key",
  BNB_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a BNB Beacon private key",
  CASH_ADDR_ADDRESS_GENERATION_FAILED: "Failed to generate a Cash Addr address",
  CASH_ADDR_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a Cash Addr private key",
  EVM_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate an EVM private key",
  XRP_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a Ripple private key",
  ZCASH_PRIVATE_KEY_GENERATION_FAILED: "Failed to generate a Zcash private key",
} as const;

export { ExceptionMessage };
