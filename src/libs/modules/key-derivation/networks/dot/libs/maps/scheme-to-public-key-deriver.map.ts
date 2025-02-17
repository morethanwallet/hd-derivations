import type { GetSignatureSchemeUnion } from "@/libs/types/index.js";
import { getPublicKey } from "micro-sr25519";
import { ed25519 } from "@noble/curves/ed25519";
import { secp256k1 } from "@noble/curves/secp256k1";

const schemeToPublicKeyDeriver: Record<
  GetSignatureSchemeUnion<"ed25519" | "secp256k1" | "sr25519">,
  (privateKey: Uint8Array) => Uint8Array
> = {
  secp256k1: (privateKey) => secp256k1.getPublicKey(privateKey),
  ed25519: (privateKey) => ed25519.getPublicKey(privateKey.slice(0, 32)),
  sr25519: (privateKey) => getPublicKey(privateKey),
};

export { schemeToPublicKeyDeriver };
