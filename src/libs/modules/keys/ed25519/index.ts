import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";

class Ed25519Keys {
  protected mnemonic: Mnemonic;

  public constructor(mnemonic: Mnemonic) {
    this.mnemonic = mnemonic;
  }

  
}

export { Ed25519Keys };
