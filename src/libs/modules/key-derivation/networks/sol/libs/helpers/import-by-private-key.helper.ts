import base58 from "bs58";

import { getBase58EncodedPublicKey } from "./get-base58-encoded-public-key.helper.js";

import type {
  CommonKeyPair,
  PrivateKey,
  DerivationTypeUnionByNetwork,
} from "@/libs/types/types.js";
import { type Ed25519Curve } from "@/libs/modules/curves/curves.js";

function importByPrivateKey(
  privateKey: PrivateKey<DerivationTypeUnionByNetwork["sol"]>["privateKey"],
  ed25519Curve: Ed25519Curve,
): CommonKeyPair {
  const privateKeyBuffer = Buffer.from(base58.decode(privateKey));
  const publicKeyBuffer = ed25519Curve.getPublicKeyBuffer(privateKeyBuffer, false);
  const publicKey = getBase58EncodedPublicKey(publicKeyBuffer);

  return { privateKey, publicKey };
}

export { importByPrivateKey };
