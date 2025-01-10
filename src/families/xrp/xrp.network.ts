import { XrpAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type NetworkPurpose, type AbstractNetwork } from "./types/index.js";
import { config } from "./config/index.js";

class Xrp implements AbstractNetwork {
  private purpose: NetworkPurpose;
  private xrpAddress: XrpAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.purpose = purpose;
    this.xrpAddress = new XrpAddress(config.keysConfig, mnemonic);
  }

  public derive({
    addressType,
    derivationPath,
    destinationTag,
  }: Parameters<AbstractNetwork["derive"]>[0]) {
    return this.xrpAddress.derive({
      derivationPath,
      addressType,
      destinationTag,
      networkPurpose: this.purpose,
    });
  }

  public importByPrivateKey({
    addressType,
    derivationPath,
    privateKey,
    destinationTag,
  }: Parameters<AbstractNetwork["importByPrivateKey"]>[0]) {
    return this.xrpAddress.importByPrivateKey({
      derivationPath,
      privateKey,
      addressType,
      destinationTag,
      networkPurpose: this.purpose,
    });
  }
}

export { Xrp };
