import { type BIP32API, BIP32Factory, type BIP32Interface } from "bip32";
import { type PrefixConfig } from "./libs/types/types.js";
import { ecc, type ECPairInterface, ecPair } from "@/libs/modules/ecc/ecc.js";

class Secp256k1Curve {
  private readonly bip32: BIP32API = BIP32Factory(ecc);

  public getRootKeyFromSeed(seed: Buffer, prefixConfig?: PrefixConfig): BIP32Interface {
    return this.bip32.fromSeed(Uint8Array.from(seed), prefixConfig);
  }

  public getRootKeyFromBase58(base58RootKey: string, prefixConfig: PrefixConfig): BIP32Interface {
    return this.bip32.fromBase58(base58RootKey, prefixConfig);
  }

  public derivePath(rootKey: BIP32Interface, derivationPath: string): BIP32Interface {
    return rootKey.derivePath(derivationPath);
  }

  public getKeyPairFromPrivateKey(
    privateKeyBytes: Uint8Array,
    prefixConfig: PrefixConfig,
    isCompressed?: boolean,
  ): ECPairInterface {
    return ecPair.fromPrivateKey(privateKeyBytes, {
      network: prefixConfig,
      compressed: isCompressed,
    });
  }
}

export { Secp256k1Curve };
