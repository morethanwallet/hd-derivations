import { toHexFromBytes, toUint8Array } from "@/helpers/index.js";
import { Mnemonic } from "@/mnemonic/index.js";
import { HDKey } from "micro-key-producer/slip10.js";

class Keys extends Mnemonic {
  protected rootKey: HDKey;

  public constructor(mnemonic?: string) {
    super(mnemonic);

    this.rootKey = this.getRootKey();
  }

  protected getRootKey(): HDKey {
    const seed = toUint8Array(this.getSeed());

    return HDKey.fromMasterSeed(toHexFromBytes(seed));
  }
}

export { Keys };
