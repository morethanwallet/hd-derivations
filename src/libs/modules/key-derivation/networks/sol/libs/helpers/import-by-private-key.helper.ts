import base58 from "bs58";
import type { CommonKeyPair, PrivateKey, SolDerivationTypeUnion } from "@/libs/types/types.js";
import { getBase58EncodedPublicKey } from "./get-base58-encoded-public-key.helper.js";
import { type Ed25519Curve } from "@/libs/modules/curves/curves.js";
import { Ed25519SecretKeyIndex } from "../enums/enums.js";

function importByPrivateKey(
  privateKey: PrivateKey<SolDerivationTypeUnion>["privateKey"],
  ed25519Curve: Ed25519Curve,
): CommonKeyPair {
  const privateKeyBuffer = Buffer.from(base58.decode(privateKey));

  const secretKeyBuffer = privateKeyBuffer.subarray(
    Ed25519SecretKeyIndex.START,
    Ed25519SecretKeyIndex.END,
  );

  const publicKeyBuffer = ed25519Curve.getPublicKeyBuffer(secretKeyBuffer, false);
  const publicKey = getBase58EncodedPublicKey(publicKeyBuffer);

  return { privateKey, publicKey };
}

export { importByPrivateKey };
