import { toHexFromBytes, toUint8Array, toXOnlyPublicKey } from "@/helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type BIP32Interface } from "bip32";
import { Keys } from "@/keys/bip32/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import {
  type AbstractKeyDerivation,
  type CommonKeyPair,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
} from "@/keyDerivation/types/index.js";
import { getKeyPairFromEc } from "@/keyDerivation/helpers/index.js";

class TaprootKeyDerivation extends Keys implements AbstractKeyDerivation<"taproot"> {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
    base58RootKey,
  }: DeriveFromMnemonicParameters<"taproot">): CommonKeyPair {
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
  }: ImportByPrivateKeyParameters<"taproot">): CommonKeyPair {
    const { publicKey } = this.getKeyPair(privateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  private getKeyPair(source: BIP32Interface | string): CommonKeyPair {
    const keyPair = getKeyPairFromEc(this.keysConfig, source);

    const publicKey = toHexFromBytes(
      toXOnlyPublicKey(toUint8Array(Buffer.from(keyPair.publicKey, "hex")))
    );

    return { privateKey: keyPair.privateKey, publicKey };
  }
}

export { TaprootKeyDerivation };
