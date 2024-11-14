import { type BIP32API, BIP32Factory, type BIP32Interface } from "bip32";
import { type KeysConfig } from "@/address/index.js";
import { toUint8Array } from "@/helpers/index.js";
import { ecc } from "@/ecc/index.js";
import { Mnemonic } from "@/mnemonic/index.js";

class Keys extends Mnemonic {
  private bip32: BIP32API;
  protected bip32RootKey: BIP32Interface;

  public constructor(keysConfig: KeysConfig, mnemonic?: string) {
    super(mnemonic);

    this.bip32 = BIP32Factory(ecc);
    this.bip32RootKey = this.getBip32RootKeyFromSeed(keysConfig);
  }

  protected getBip32RootKeyFromSeed(keysConfig: KeysConfig): BIP32Interface {
    const seed = this.getSeed();

    return this.bip32.fromSeed(toUint8Array(seed), keysConfig);
  }

  protected getRootKeyFromBase58(base58RootKey: string): BIP32Interface {
    return this.bip32.fromBase58(base58RootKey);
  }
}

export { Keys };
