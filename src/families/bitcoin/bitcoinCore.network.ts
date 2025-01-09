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
    this.p2pkhAddress = new P2pkhAddress(config[purpose].legacy.keysConfig, mnemonic);
    this.p2wpkhInP2shAddress = new P2wpkhInP2shAddress(config[purpose].segWit.keysConfig, mnemonic);
    this.p2wpkhAddress = new P2wpkhAddress(config[purpose].nativeSegWit.keysConfig, mnemonic);
    this.taprootAddress = new TaprootAddress(config[purpose].taproot.keysConfig, mnemonic);
  }

  public derive(derivationPath: string, addressType: BitcoinCoreAddress, base58RootKey: string) {
    switch (addressType) {
      case "legacy": {
        return this.p2pkhAddress.derive(derivationPath, base58RootKey);
      }
      case "segWit": {
        return this.p2wpkhInP2shAddress.derive(derivationPath, base58RootKey);
      }
      case "nativeSegWit": {
        return this.p2wpkhAddress.derive(derivationPath, base58RootKey);
      }
      case "taproot": {
        return this.taprootAddress.derive(derivationPath, base58RootKey);
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
      case "legacy": {
        return this.p2pkhAddress.importByPrivateKey(derivationPath, privateKey, base58RootKey);
      }
      case "segWit": {
        return this.p2wpkhInP2shAddress.importByPrivateKey(
          derivationPath,
          privateKey,
          base58RootKey
        );
      }
      case "nativeSegWit": {
        return this.p2wpkhAddress.importByPrivateKey(derivationPath, privateKey, base58RootKey);
      }
      case "taproot": {
        return this.taprootAddress.importByPrivateKey(derivationPath, privateKey, base58RootKey);
      }
    }
  }
}

export { BitcoinCore };
