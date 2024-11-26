import { P2pkhAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "@/network/types/index.js";
import { type NetworkPurpose } from "@/network/index.js";
import { config } from "./config/index.js";

class Dogecoin implements AbstractNetwork {
  private p2pkhAddress: P2pkhAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.p2pkhAddress = new P2pkhAddress(config[purpose].legacy.keysConfig, mnemonic);
  }

  public getAddressData(derivationPath: string) {
    return this.p2pkhAddress.getData(derivationPath);
  }

  public importByPrivateKey(derivationPath: string, privateKey: string) {
    return this.p2pkhAddress.importByPrivateKey(derivationPath, privateKey);
  }
}

export { Dogecoin };
