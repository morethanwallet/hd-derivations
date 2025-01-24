import { type BIP32API, BIP32Factory, type BIP32Interface } from "bip32";
import { type PrefixConfig } from "./libs/types/index.js";
import { toUint8Array } from "@/libs/helpers/index.js";
import { ecc } from "@/libs/modules/ecc/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";

class Bip32Keys {
  private bip32: BIP32API;
  protected rootKey: BIP32Interface;
  protected mnemonic: Mnemonic;
  public prefixConfig: PrefixConfig;

  public constructor(prefixConfig: PrefixConfig, mnemonic: Mnemonic) {
    this.bip32 = BIP32Factory(ecc);
    this.mnemonic = mnemonic;
    this.prefixConfig = prefixConfig;
    this.rootKey = this.getBip32RootKeyFromSeed(prefixConfig);
  }

  protected getBip32RootKeyFromSeed(
    prefixConfig: PrefixConfig,
  ): BIP32Interface {
    const seed = this.mnemonic.getSeed();

    return this.bip32.fromSeed(toUint8Array(seed), prefixConfig);
  }

  protected getRootKeyFromBase58(base58RootKey: string): BIP32Interface {
    return this.bip32.fromBase58(base58RootKey, this.prefixConfig);
  }
}

export { Bip32Keys };
