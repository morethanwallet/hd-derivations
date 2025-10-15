import base58 from "bs58";
import { type CommonKeyPair } from "@/libs/types/types.js";
import { getBase58EncodedPublicKey } from "./get-base58-encoded-public-key.helper.js";

function getBase58EncodedKeyPair(secretKey: Buffer, publicKey: Buffer): CommonKeyPair {
  return {
    privateKey: base58.encode(Buffer.concat([secretKey, publicKey])),
    publicKey: getBase58EncodedPublicKey(publicKey),
  };
}

export { getBase58EncodedKeyPair };
