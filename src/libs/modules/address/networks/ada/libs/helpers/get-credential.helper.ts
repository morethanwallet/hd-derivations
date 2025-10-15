import { PublicKey, Credential } from "@emurgo/cardano-serialization-lib-nodejs";

function getCredential(publicKey: string): Credential {
  const rawPublicKey = PublicKey.from_hex(publicKey);

  return Credential.from_keyhash(rawPublicKey.hash());
}

export { getCredential };
