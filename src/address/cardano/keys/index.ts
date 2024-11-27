import { toUint8Array } from "@/helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

const EMPTY_PASSWORD = "";

class Keys {
  protected rootKey: Bip32PrivateKey;
  protected mnemonic: Mnemonic;

  public constructor(mnemonic: Mnemonic) {
    this.mnemonic = mnemonic;
    this.rootKey = this.getRootKey();
  }

  protected getRootKey(): Bip32PrivateKey {
    const bip39Entropy = toUint8Array(Buffer.from(this.mnemonic.getEntropy(), "hex"));

    return Bip32PrivateKey.from_bip39_entropy(bip39Entropy, toUint8Array(EMPTY_PASSWORD));
  }
}

export { Keys };
