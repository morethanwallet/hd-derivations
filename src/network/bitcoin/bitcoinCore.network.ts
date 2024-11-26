import {
  P2pkhAddress,
  P2wpkhInP2shAddress,
  P2wpkhAddress,
  TaprootAddress,
} from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractNetwork, type BitcoinCoreAddress } from "./types/index.js";
import { type NetworkPurpose } from "@/network/index.js";
import { config } from "./config/index.js";

class BitcoinCore implements AbstractNetwork<"bitcoinCore"> {
  private p2pkhAddress: P2pkhAddress;
  private p2wpkhInP2shAddress: P2wpkhInP2shAddress;
  private p2wpkhAddress: P2wpkhAddress;
  private taprootAddress: TaprootAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.p2pkhAddress = new P2pkhAddress(config[purpose].legacy.keysConfig, mnemonic);
    this.p2wpkhInP2shAddress = new P2wpkhInP2shAddress(config[purpose].segWit.keysConfig, mnemonic);
    this.p2wpkhAddress = new P2wpkhAddress(config[purpose].nativeSegWit.keysConfig, mnemonic);
    this.taprootAddress = new TaprootAddress(config[purpose].taproot.keysConfig, mnemonic);
  }

  public getAddressData(
    addressType: BitcoinCoreAddress,
    derivationPath: string,
    base58RootKey: string
  ) {
    switch (addressType) {
      case "legacy": {
        return this.p2pkhAddress.getData(derivationPath, base58RootKey);
      }
      case "segWit": {
        return this.p2wpkhInP2shAddress.getData(derivationPath, base58RootKey);
      }
      case "nativeSegWit": {
        return this.p2wpkhAddress.getData(derivationPath, base58RootKey);
      }
      case "taproot": {
        return this.taprootAddress.getData(derivationPath, base58RootKey);
      }
    }
  }

  public importByPrivateKey(
    addressType: BitcoinCoreAddress,
    derivationPath: string,
    privateKey: string
  ) {
    switch (addressType) {
      case "legacy": {
        return this.p2pkhAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "segWit": {
        return this.p2wpkhInP2shAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "nativeSegWit": {
        return this.p2wpkhAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "taproot": {
        return this.taprootAddress.importByPrivateKey(derivationPath, privateKey);
      }
    }
  }
}

export { BitcoinCore };
