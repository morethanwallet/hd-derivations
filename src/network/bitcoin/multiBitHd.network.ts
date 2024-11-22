import { P2pkhAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { networks } from "bitcoinjs-lib";
import { type AbstractNetwork } from "./types/index.js";

class MultiBitHd implements AbstractNetwork<"multiBitHd"> {
  private p2pkhAddress: P2pkhAddress;

  public constructor(mnemonic: Mnemonic) {
    this.p2pkhAddress = new P2pkhAddress(networks.bitcoin, mnemonic);
  }

  public getAddressData(derivationPath: string) {
    return this.p2pkhAddress.getData(derivationPath);
  }

  public importByPrivateKey(derivationPath: string, privateKey: string) {
    return this.p2pkhAddress.importByPrivateKey(derivationPath, privateKey);
  }
}

export { MultiBitHd };
