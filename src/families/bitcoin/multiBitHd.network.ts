import { P2pkhAddress } from "@/keyDerivation/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "./types/index.js";
import { type NetworkPurpose } from "@/families/index.js";
import { config } from "./config/index.js";

class MultiBitHd implements AbstractNetwork<"multiBitHd"> {
  private p2pkhAddress: P2pkhAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.p2pkhAddress = new P2pkhAddress(config[purpose].legacy.keysConfig, mnemonic);
  }

  public derive(derivationPath: string) {
    return this.p2pkhAddress.derive(derivationPath);
  }

  public importByPrivateKey(derivationPath: string, privateKey: string) {
    return this.p2pkhAddress.importByPrivateKey(derivationPath, privateKey);
  }
}

export { MultiBitHd };
