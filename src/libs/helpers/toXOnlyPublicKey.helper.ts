const PUBLIC_KEY_PREFIX_END_INDEX = 1;
const X_ONLY_PUBLIC_KEY_LENGTH = 32;
const X_Y_PUBLIC_KEY_LENGTH = 33;

function toXOnlyPublicKey(publicKey: Uint8Array): Uint8Array {
  return publicKey.length === X_ONLY_PUBLIC_KEY_LENGTH
    ? publicKey
    : publicKey.slice(PUBLIC_KEY_PREFIX_END_INDEX, X_Y_PUBLIC_KEY_LENGTH);
}

export { toXOnlyPublicKey };
