import { CashAddrAddress, P2pkhAddress } from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork } from "./types/index.js";
import { type AddressType } from "@/address/bitcoin-cash/index.js";
import { type NetworkPurpose } from "@/families/index.js";
import { config } from "./config/index.js";

class BitcoinCash implements AbstractNetwork {
  private cashAddrAddress: CashAddrAddress;
  private p2pkhAddress: P2pkhAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.cashAddrAddress = new CashAddrAddress(config[purpose].cashAddr.keysConfig, mnemonic);
    this.p2pkhAddress = new P2pkhAddress(config[purpose].legacy.keysConfig, mnemonic);
  }

  public derive(derivationPath: string, addressType: AddressType) {
    switch (addressType) {
      case "legacy": {
        return this.p2pkhAddress.derive(derivationPath);
      }
      case "cashAddr": {
        return this.cashAddrAddress.derive(derivationPath);
      }
    }
  }

  public importByPrivateKey(derivationPath: string, privateKey: string, addressType: AddressType) {
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
