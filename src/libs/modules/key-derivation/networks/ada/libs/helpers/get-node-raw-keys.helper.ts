import {
  type PrivateKey,
  type PublicKey,
  type Bip32PrivateKey,
} from "@emurgo/cardano-serialization-lib-nodejs";

type RawKeys = {
  privateKey: PrivateKey;
  publicKey: PublicKey;
};

function getNodeRawKeys(node: Bip32PrivateKey): RawKeys {
  const publicKey = node.to_public().to_raw_key();
  const privateKey = node.to_raw_key();

  return { privateKey, publicKey };
}

export { getNodeRawKeys };
