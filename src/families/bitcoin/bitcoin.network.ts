import {
  P2pkhAddress,
  P2wpkhInP2shAddress,
  P2wpkhAddress,
  TaprootAddress,
  P2wshAddress,
  P2wshInP2shAddress,
} from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type BitcoinAddress, type AbstractNetwork } from "./types/index.js";
import { type NetworkPurpose } from "@/families/index.js";
import { config } from "./config/index.js";

class Bitcoin implements AbstractNetwork<"bitcoin"> {
  private p2pkhAddress: P2pkhAddress;
  private p2wpkhInP2shAddress: P2wpkhInP2shAddress;
  private p2wpkhAddress: P2wpkhAddress;
  private taprootAddress: TaprootAddress;
  private p2wshAddress: P2wshAddress;
  private p2wshInP2shAddress: P2wshInP2shAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.p2pkhAddress = new P2pkhAddress(config[purpose].btcLegacy.keysConfig, mnemonic);

    this.p2wpkhInP2shAddress = new P2wpkhInP2shAddress(
      config[purpose].btcSegWit.keysConfig,
      mnemonic
    );

    this.p2wpkhAddress = new P2wpkhAddress(config[purpose].btcNativeSegWit.keysConfig, mnemonic);
    this.taprootAddress = new TaprootAddress(config[purpose].btcTaproot.keysConfig, mnemonic);
    this.p2wshAddress = new P2wshAddress(config[purpose].btcP2wsh.keysConfig, mnemonic);

    this.p2wshInP2shAddress = new P2wshInP2shAddress(
      config[purpose].btcP2wshInP2sh.keysConfig,
      mnemonic
    );
  }

  public getAddressData(derivationPath: string, addressType: BitcoinAddress) {
    switch (addressType) {
      case "btcLegacy": {
        return this.p2pkhAddress.getData(derivationPath);
      }
      case "btcSegWit": {
        return this.p2wpkhInP2shAddress.getData(derivationPath);
      }
      case "btcNativeSegWit": {
        return this.p2wpkhAddress.getData(derivationPath);
      }
      case "btcTaproot": {
        return this.taprootAddress.getData(derivationPath);
      }
      case "btcP2wsh": {
        return this.p2wshAddress.getData(derivationPath);
      }
      case "btcP2wshInP2sh": {
        return this.p2wshInP2shAddress.getData(derivationPath);
      }
    }
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: string,
    addressType: BitcoinAddress
  ) {
    switch (addressType) {
      case "btcLegacy": {
        return this.p2pkhAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "btcSegWit": {
        return this.p2wpkhInP2shAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "btcNativeSegWit": {
        return this.p2wpkhAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "btcTaproot": {
        return this.taprootAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "btcP2wsh": {
        return this.p2wshAddress.importByPrivateKey(derivationPath, privateKey);
      }
      case "btcP2wshInP2sh": {
        return this.p2wshInP2shAddress.importByPrivateKey(derivationPath, privateKey);
      }
    }
  }
}

export { Bitcoin };
