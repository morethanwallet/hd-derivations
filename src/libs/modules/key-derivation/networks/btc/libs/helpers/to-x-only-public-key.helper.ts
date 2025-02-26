import { SECP256K1_COMPRESSED_PUBLIC_KEY_LENGTH } from "@/libs/constants/index.js";

const PUBLIC_KEY_PREFIX_END_INDEX = 1;
const X_ONLY_PUBLIC_KEY_LENGTH = 32;

function toXOnlyPublicKey(publicKey: Uint8Array): Uint8Array {
  return publicKey.length === X_ONLY_PUBLIC_KEY_LENGTH
    ? publicKey
    : publicKey.slice(PUBLIC_KEY_PREFIX_END_INDEX, SECP256K1_COMPRESSED_PUBLIC_KEY_LENGTH);
}

export { toXOnlyPublicKey };
