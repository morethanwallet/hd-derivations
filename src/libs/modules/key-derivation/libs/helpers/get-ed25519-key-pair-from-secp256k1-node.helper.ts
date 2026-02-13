import {
  Ed25519PrivateKeyBytePosition,
  type Ed25519Curve,
  type NonNullableBip32Interface,
} from "@/libs/modules/curves/curves.js";

type KeyPair = {
  secretKey: Buffer;
  publicKey: Buffer;
};

function getEd25519KeyPairFromSecp256k1Node(
  node: NonNullableBip32Interface,
  ed25519Curve: Ed25519Curve,
): KeyPair {
  const secretKeyBytes = node.privateKey.subarray(
    Ed25519PrivateKeyBytePosition.START,
    Ed25519PrivateKeyBytePosition.END,
  );

  const secretKey = Buffer.from(secretKeyBytes);
  const publicKey = ed25519Curve.getPublicKeyBuffer(secretKey, false);

  return { secretKey, publicKey };
}

export { getEd25519KeyPairFromSecp256k1Node };
