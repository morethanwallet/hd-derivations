import { type BIP32API, BIP32Factory, type BIP32Interface } from "bip32";
import { type KeysConfig } from "../types/index.js";
import { toUint8Array } from "@/helpers/index.js";
import { ecc } from "@/ecc/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";

class Keys {
  private bip32: BIP32API;
  protected rootKey: BIP32Interface;
  protected mnemonic: Mnemonic;
  protected keysConfig: KeysConfig;

  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    this.bip32 = BIP32Factory(ecc);
    this.mnemonic = mnemonic;
    this.keysConfig = keysConfig;
    this.rootKey = this.getBip32RootKeyFromSeed(keysConfig);
  }

  protected getBip32RootKeyFromSeed(keysConfig: KeysConfig): BIP32Interface {
    const seed = this.mnemonic.getSeed();

    return this.bip32.fromSeed(toUint8Array(seed), keysConfig);
  }

  protected getRootKeyFromBase58(base58RootKey: string): BIP32Interface {
    return this.bip32.fromBase58(base58RootKey, this.keysConfig);
  }
}

export { Keys };
