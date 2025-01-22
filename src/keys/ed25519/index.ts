import { type Mnemonic } from "@/mnemonic/index.js";

class Keys {
  protected mnemonic: Mnemonic;

  public constructor(mnemonic: Mnemonic) {
    this.mnemonic = mnemonic;
  }

  protected getHexSeed(): string {
    return this.mnemonic.getSeed().toString("hex");
  }
}

export { Keys };
