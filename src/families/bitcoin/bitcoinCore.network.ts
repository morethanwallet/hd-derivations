import {
  P2pkhAddress,
  P2wpkhInP2shAddress,
  P2wpkhAddress,
  TaprootAddress,
} from "@/address/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { BitcoinCoreAddress, type AbstractNetwork } from "./types/index.js";
import { type NetworkPurpose } from "@/families/index.js";
import { config } from "./config/index.js";

class BitcoinCore implements AbstractNetwork<"bitcoinCore"> {
  private p2pkhAddress: P2pkhAddress;
  private p2wpkhInP2shAddress: P2wpkhInP2shAddress;
  private p2wpkhAddress: P2wpkhAddress;
  private taprootAddress: TaprootAddress;

  public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
    this.p2pkhAddress = new P2pkhAddress(config[purpose].btcLegacy.keysConfig, mnemonic);

    this.p2wpkhInP2shAddress = new P2wpkhInP2shAddress(
      config[purpose].btcSegWit.keysConfig,
      mnemonic
    );

    this.p2wpkhAddress = new P2wpkhAddress(config[purpose].btcNativeSegWit.keysConfig, mnemonic);
    this.taprootAddress = new TaprootAddress(config[purpose].btcTaproot.keysConfig, mnemonic);
  }

  public getAddressData(
    derivationPath: string,
    addressType: BitcoinCoreAddress,
    base58RootKey: string
  ) {
    switch (addressType) {
      case "btcLegacy": {
        return this.p2pkhAddress.getData(derivationPath, base58RootKey);
      }
      case "btcSegWit": {
        return this.p2wpkhInP2shAddress.getData(derivationPath, base58RootKey);
      }
      case "btcNativeSegWit": {
        return this.p2wpkhAddress.getData(derivationPath, base58RootKey);
      }
      case "btcTaproot": {
        return this.taprootAddress.getData(derivationPath, base58RootKey);
      }
    }
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: string,
    addressType: BitcoinCoreAddress,
    base58RootKey: string
  ) {
    switch (addressType) {
      case "btcLegacy": {
        return this.p2pkhAddress.importByPrivateKey(derivationPath, privateKey, base58RootKey);
      }
      case "btcSegWit": {
        return this.p2wpkhInP2shAddress.importByPrivateKey(
          derivationPath,
          privateKey,
          base58RootKey
        );
      }
      case "btcNativeSegWit": {
        return this.p2wpkhAddress.importByPrivateKey(derivationPath, privateKey, base58RootKey);
      }
      case "btcTaproot": {
        return this.taprootAddress.importByPrivateKey(derivationPath, privateKey, base58RootKey);
      }
    }
  }
}

export { BitcoinCore };
