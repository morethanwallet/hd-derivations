import base58 from "bs58";

function getBase58EncodedPublicKey(publicKeyBuffer: Buffer): string {
  return base58.encode(publicKeyBuffer);
}

export { getBase58EncodedPublicKey };
