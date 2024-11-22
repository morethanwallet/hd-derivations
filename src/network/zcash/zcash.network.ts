import { ZcashTransparentAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "./types/index.js";
import { type NetworkType } from "@/network/index.js";
import { config } from "./config/index.js";

class Zcash implements AbstractNetwork {
  private transparentAddress: ZcashTransparentAddress;

  public constructor(mnemonic: Mnemonic, type: NetworkType) {
    this.transparentAddress = new ZcashTransparentAddress(
      config[type].transparent.keysConfig,
      mnemonic
    );
  }

  public getAddressData(derivationPath: string) {
    return this.transparentAddress.getData(derivationPath);
  }

  public importByPrivateKey(derivationPath: string, privateKey: string) {
    return this.transparentAddress.importByPrivateKey(derivationPath, privateKey);
  }
}

export { Zcash };
