import { BnbAddress, type KeyPair } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "@/families/types/index.js";
import { config } from "./config/index.js";

class Bnb implements AbstractNetwork {
  private bnbAddress: BnbAddress;

  public constructor(mnemonic: Mnemonic) {
    this.bnbAddress = new BnbAddress(config.keysConfig, mnemonic);
  }

  public getAddressData(derivationPath: string) {
    return this.bnbAddress.getData(derivationPath);
  }

  public importByPrivateKey(derivationPath: string, privateKey: KeyPair["privateKey"]) {
    return this.bnbAddress.importByPrivateKey(derivationPath, privateKey);
  }
}

export { Bnb };
