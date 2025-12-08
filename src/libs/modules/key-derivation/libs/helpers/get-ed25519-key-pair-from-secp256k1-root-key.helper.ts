import type { Ed25519Curve } from "@/libs/modules/curves/curves";
import { getEd25519KeyPairFromSecp256k1Node } from "./get-ed25519-key-pair-from-secp256k1-node.helper";
import { getSecp256k1NodeFromMnemonic } from "./get-secp256k1-node-from-mnemonic.helper";
import type { Mnemonic } from "@/libs/modules/mnemonic";
import type { Secp256k1Curve } from "@/libs/modules/curves/curves";

type DerivationParameters = {
  derivationPath: string;
  ed25519Curve: Ed25519Curve;
  mnemonic: Mnemonic;
  secp256k1Curve: Secp256k1Curve;
};

function getEd25519KeyPairFromSecp256k1RootKey({
  derivationPath,
  ed25519Curve,
  mnemonic,
  secp256k1Curve,
}: DerivationParameters): ReturnType<typeof getEd25519KeyPairFromSecp256k1Node> {
  const node = getSecp256k1NodeFromMnemonic({
    derivationPath,
    mnemonic,
    secp256k1Curve,
  });

  return getEd25519KeyPairFromSecp256k1Node(node, ed25519Curve);
}

export { getEd25519KeyPairFromSecp256k1RootKey };
