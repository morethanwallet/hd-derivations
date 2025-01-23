import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";

class Ed25519Keys {
  protected mnemonic: Mnemonic;

  public constructor(mnemonic: Mnemonic) {
    this.mnemonic = mnemonic;
  }

  protected getHexSeed(): string {
    return this.mnemonic.getSeed().toString("hex");
  }
}

export { Ed25519Keys };
