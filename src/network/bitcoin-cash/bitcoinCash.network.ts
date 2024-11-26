import { CashAddrAddress, P2pkhAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type Address, type AbstractNetwork } from "./types/index.js";
import { type NetworkPurpose } from "@/network/index.js";
import { config } from "./config/index.js";

class BitcoinCash implements AbstractNetwork {
  private cashAddrAddress: CashAddrAddress;
  private p2pkhAddress: P2pkhAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.cashAddrAddress = new CashAddrAddress(config[purpose].cashAddr.keysConfig, mnemonic);
    this.p2pkhAddress = new P2pkhAddress(config[purpose].legacy.keysConfig, mnemonic);
  }

  public getAddressData(addressType: Address, derivationPath: string) {
    switch (addressType) {
      case "legacy": {
        return this.p2pkhAddress.getData(derivationPath);
      }
      case "cashAddr": {
        return this.cashAddrAddress.getData(derivationPath);
      }
    }
  }

  public importByPrivateKey(addressType: Address, derivationPath: string, privateKey: string) {
    switch (addressType) {
      case "legacy": {
        return this.p2pkhAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "cashAddr": {
        return this.cashAddrAddress.importByPrivateKey(derivationPath, privateKey);
      }
    }
  }
}

export { BitcoinCash };
