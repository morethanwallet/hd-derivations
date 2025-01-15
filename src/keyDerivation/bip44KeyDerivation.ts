import {
  type CommonKeyPair,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
  type AbstractKeyDerivation,
  type Bip44DerivationTypeUnion,
} from "@/keyDerivation/types/index.js";
import { Keys } from "@/keys/bip32/index.js";
import { type BIP32Interface } from "bip32";
import { getKeyPairFromEc } from "@/keyDerivation/helpers/index.js";
import { toUint8Array } from "@/helpers/index.js";
// User pass a network type
// 
class Bip44KeyDerivation extends Keys implements AbstractKeyDerivation<Bip44DerivationTypeUnion> {
  public deriveFromMnemonic({
    derivationPath,
    base58RootKey,
  }: DeriveFromMnemonicParameters<Bip44DerivationTypeUnion>): CommonKeyPair {
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
  }: ImportByPrivateKeyParameters<Bip44DerivationTypeUnion>): CommonKeyPair {
    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  public getKeyPair(source: BIP32Interface | string | Uint8Array): CommonKeyPair {
    return getKeyPairFromEc(this.keysConfig, source);
  }
}

export { Bip44KeyDerivation };
