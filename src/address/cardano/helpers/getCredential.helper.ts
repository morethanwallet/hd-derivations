import { type PublicKey, Credential } from "@emurgo/cardano-serialization-lib-nodejs";

function getCredential(rawPublicKey: PublicKey): Credential {
  return Credential.from_keyhash(rawPublicKey.hash());
}

export { getCredential };
