import { getPublicKey } from "micro-sr25519";
import { ed25519 } from "@noble/curves/ed25519";
import { secp256k1 } from "@noble/curves/secp256k1";
import { Curve, ThirtyTwoBytePrivateKeyIndex } from "@/libs/enums/enums";

const curveToPublicKeyDeriver: Record<
  Curve["ED25519"] | Curve["SECP256K1"] | Curve["SR25519"],
  (privateKey: Uint8Array) => Uint8Array
> = {
  secp256k1: (privateKey) => secp256k1.getPublicKey(privateKey),
  ed25519: (privateKey) => {
    return ed25519.getPublicKey(
      privateKey.slice(ThirtyTwoBytePrivateKeyIndex.START, ThirtyTwoBytePrivateKeyIndex.END),
    );
  },
  sr25519: (privateKey) => getPublicKey(privateKey),
};

export { curveToPublicKeyDeriver };
