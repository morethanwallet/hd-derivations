import { toHexFromBytes, toUint8Array } from "@/helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { HDKey } from "micro-key-producer/slip10.js";

class Keys {
  protected rootKey: HDKey;
  protected mnemonic: Mnemonic;

  public constructor(mnemonic: Mnemonic) {
    this.mnemonic = mnemonic;
    this.rootKey = this.getRootKey();
  }

  protected getRootKey(): HDKey {
    const seed = toUint8Array(this.mnemonic.getSeed());

    return HDKey.fromMasterSeed(toHexFromBytes(seed));
  }
}

export { Keys };
