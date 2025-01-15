import {
  type CommonKeyPair,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
  type AbstractKeyDerivation,
  type CommonDerivationTypeUnion,
} from "@/keyDerivation/types/index.js";
import { Keys } from "@/keys/bip32/index.js";
import { type BIP32Interface } from "bip32";
import { getKeyPairFromEc } from "@/keyDerivation/helpers/index.js";

class CommonKeyDerivation extends Keys implements AbstractKeyDerivation<CommonDerivationTypeUnion> {
  public deriveFromMnemonic({
    derivationPath,
    base58RootKey,
  }: DeriveFromMnemonicParameters<CommonDerivationTypeUnion>): CommonKeyPair {
    const rootKey = base58RootKey ? this.getRootKeyFromBase58(base58RootKey) : this.rootKey;
    const node = rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node);

    return {
      privateKey,
      publicKey,
    };
  }

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<CommonDerivationTypeUnion>): CommonKeyPair {
    const { publicKey } = this.getKeyPair(privateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  public getKeyPair(source: BIP32Interface | string | Uint8Array): CommonKeyPair {
    return getKeyPairFromEc(this.keysConfig, source);
  }
}

export { CommonKeyDerivation };
