import { toUint8Array } from "@/libs/helpers/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import {
  Bip32PrivateKey,
  PrivateKey,
  PublicKey,
} from "@emurgo/cardano-serialization-lib-nodejs";

const EMPTY_PASSWORD = "";

type RawKeys = {
  privateKey: PrivateKey;
  publicKey: PublicKey;
};

class AdaKeys {
  protected rootKey: Bip32PrivateKey;
  protected mnemonic: Mnemonic;

  public constructor(mnemonic: Mnemonic) {
    this.mnemonic = mnemonic;
    this.rootKey = this.getRootKey();
  }

  protected getRootKey(): Bip32PrivateKey {
    const bip39Entropy = toUint8Array(
      Buffer.from(this.mnemonic.getEntropy(), "hex"),
    );

    return Bip32PrivateKey.from_bip39_entropy(
      bip39Entropy,
      toUint8Array(EMPTY_PASSWORD),
    );
  }

  protected getRawKeys(node: Bip32PrivateKey): RawKeys {
    const publicKey = node.to_public().to_raw_key();
    const privateKey = node.to_raw_key();

    return { privateKey, publicKey };
  }
}

export { AdaKeys };
