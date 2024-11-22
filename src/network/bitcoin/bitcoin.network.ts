import {
  P2pkhAddress,
  P2wpkhInP2shAddress,
  P2wpkhAddress,
  TaprootAddress,
  P2wshAddress,
  P2wshInP2shAddress,
} from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { networks } from "bitcoinjs-lib";
import { type AbstractNetwork, type BitcoinAddress } from "./types/index.js";

class Bitcoin implements AbstractNetwork<"bitcoin"> {
  private p2pkhAddress: P2pkhAddress;
  private p2wpkhInP2shAddress: P2wpkhInP2shAddress;
  private p2wpkhAddress: P2wpkhAddress;
  private taprootAddress: TaprootAddress;
  private p2wshAddress: P2wshAddress;
  private p2wshInP2shAddress: P2wshInP2shAddress;

  public constructor(mnemonic: Mnemonic) {
    this.p2pkhAddress = new P2pkhAddress(networks.bitcoin, mnemonic);
    this.p2wpkhInP2shAddress = new P2wpkhInP2shAddress(networks.bitcoin, mnemonic);
    this.p2wpkhAddress = new P2wpkhAddress(networks.bitcoin, mnemonic);
    this.taprootAddress = new TaprootAddress(networks.bitcoin, mnemonic);
    this.p2wshAddress = new P2wshAddress(networks.bitcoin, mnemonic);
    this.p2wshInP2shAddress = new P2wshInP2shAddress(networks.bitcoin, mnemonic);
  }

  public getAddressData(addressType: BitcoinAddress, derivationPath: string) {
    switch (addressType) {
      case "legacy": {
        return this.p2pkhAddress.getData(derivationPath);
      }
      case "segWit": {
        return this.p2wpkhInP2shAddress.getData(derivationPath);
      }
      case "nativeSegWit": {
        return this.p2wpkhAddress.getData(derivationPath);
      }
      case "taproot": {
        return this.taprootAddress.getData(derivationPath);
      }
      case "p2wsh": {
        return this.p2wshAddress.getData(derivationPath);
      }
      case "p2wshInP2sh": {
        return this.p2wshInP2shAddress.getData(derivationPath);
      }
    }
  }

  public importByPrivateKey(
    addressType: BitcoinAddress,
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
      case "p2wsh": {
        return this.p2wshAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "p2wshInP2sh": {
        return this.p2wshInP2shAddress.importByPrivateKey(derivationPath, privateKey);
      }
    }
  }
}

export { Bitcoin };
