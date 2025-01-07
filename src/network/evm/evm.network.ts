import { type KeyPair, EvmAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "@/network/types/index.js";
import { config } from "./config/index.js";

class Evm implements AbstractNetwork {
  private evmAddress: EvmAddress;

  public constructor(mnemonic: Mnemonic) {
    this.evmAddress = new EvmAddress(config.keysConfig, mnemonic);
  }

  public getAddressData(derivationPath: string) {
    return this.evmAddress.getData(derivationPath);
  }

  public importByPrivateKey(derivationPath: string, privateKey: KeyPair["privateKey"]) {
    return this.evmAddress.importByPrivateKey(derivationPath, privateKey);
  }
}

export { Evm };
