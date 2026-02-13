import { concatBytes } from "@noble/hashes/utils.js";
import { Bip32PrivateKey } from "@stricahq/bip32ed25519";

type AdaLedgerNode = {
  chainCodeBytes: Uint8Array; // 32
  leftPrivateKeyBytes: Uint8Array; // 32 (kL)
  rightPrivateKeyBytes: Uint8Array; // 32 (kR)
  publicKeyBytes: Uint8Array; // 32 (A)
};

const LEDGER_CHAIN_CODE_LENGTH_BYTES = 32;
const ED25519_KEY_PART_LENGTH_BYTES = 32;

const BIP32_XPRV_LENGTH_BYTES =
  ED25519_KEY_PART_LENGTH_BYTES + ED25519_KEY_PART_LENGTH_BYTES + LEDGER_CHAIN_CODE_LENGTH_BYTES;

function getAdaLedgerExtendedPrivateKeyFromNode(node: AdaLedgerNode): Bip32PrivateKey {
  const xprvBytes = concatBytes(
    node.leftPrivateKeyBytes,
    node.rightPrivateKeyBytes,
    node.chainCodeBytes,
  );

  if (xprvBytes.length !== BIP32_XPRV_LENGTH_BYTES) {
    throw new Error("Failed to format xprv bytes.");
  }

  const bip32PrivateKey = new Bip32PrivateKey(Buffer.from(xprvBytes));

  return bip32PrivateKey;
}

export { getAdaLedgerExtendedPrivateKeyFromNode };
