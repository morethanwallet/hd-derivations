import type { PrefixConfig, Secp256k1Curve } from "@/libs/modules/curves/curves";
import type { Mnemonic } from "@/libs/modules/mnemonic";
import type { BIP32Interface } from "bip32";
import { KeyDerivationError } from "../exceptions";
import { ExceptionMessage } from "@/libs/enums/enums";

type Parameters = {
  mnemonic: Mnemonic;
  derivationPath: string;
  prefixConfig?: PrefixConfig;
  secp256k1Curve: Secp256k1Curve;
};

type NonNullableBip32Interface = Omit<BIP32Interface, "privateKey"> & { privateKey: Uint8Array };

function checkNodePrivateKey(node: BIP32Interface): node is NonNullableBip32Interface {
  if (!node.privateKey) {
    return false;
  }

  return true;
}

function deriveSecp256k1Node({
  mnemonic,
  derivationPath,
  secp256k1Curve,
  prefixConfig,
}: Parameters): NonNullableBip32Interface {
  const seed = mnemonic.getSeed();
  const rootKey = secp256k1Curve.getRootKeyFromSeed(seed, prefixConfig);
  const node = secp256k1Curve.derivePath(rootKey, derivationPath);

  if (!checkNodePrivateKey(node)) {
    throw new KeyDerivationError(ExceptionMessage.PRIVATE_KEY_GENERATION_FAILED);
  }

  return node;
}

export { deriveSecp256k1Node };
