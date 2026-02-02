type LedgerEd25519PrivateNode = {
  leftPrivateKeyBytes: Uint8Array; // 32 (kL)
  rightPrivateKeyBytes: Uint8Array; // 32 (kR)
  publicKeyBytes: Uint8Array; // 32 (A)
  chainCodeBytes: Uint8Array; // 32 (c)
};

export { type LedgerEd25519PrivateNode };
