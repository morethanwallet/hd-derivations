import {
  type PublicKey,
  Credential,
} from "@emurgo/cardano-serialization-lib-nodejs";

function getCredential(publicKey: PublicKey): Credential {
  return Credential.from_keyhash(publicKey.hash());
}

export { getCredential };
