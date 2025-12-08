import {
  Ed25519SecretKeyBytePosition,
  type Ed25519Curve,
  type NonNullableBip32Interface,
} from "@/libs/modules/curves/curves";

type KeyPair = {
  secretKey: Buffer;
  publicKey: Buffer;
};

function getEd25519KeyPairFromSecp256k1Node(
  node: NonNullableBip32Interface,
  ed25519Curve: Ed25519Curve,
): KeyPair {
  const secretKeyBytes = node.privateKey.subarray(
    Ed25519SecretKeyBytePosition.START,
    Ed25519SecretKeyBytePosition.END,
  );

  const secretKey = Buffer.from(secretKeyBytes);
  const publicKey = ed25519Curve.getPublicKeyBuffer(secretKey, false);

  return { secretKey, publicKey };
}

export { getEd25519KeyPairFromSecp256k1Node };
