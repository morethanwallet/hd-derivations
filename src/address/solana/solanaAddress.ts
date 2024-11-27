import { Keys } from "./keys/index.js";
import base58 from "bs58";
import { type AddressData, type KeyPair } from "../types/index.js";
import { Keypair } from "@solana/web3.js";
import { appendAddressToDerivationPath } from "./helpers/index.js";
import {
  EMPTY_MNEMONIC,
  FIRST_ADDRESS_INDEX,
  SEARCH_FROM_MNEMONIC_LIMIT,
} from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractAddress } from "@/address/index.js";

class SolanaAddress extends Keys implements AbstractAddress {
  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);
  }

  public getData(derivationPath: string): AddressData {
    const { privateKey, publicKey } = this.getKeyPair(derivationPath);

    return {
      privateKey,
      publicKey,
      path: derivationPath,
      address: publicKey,
      mnemonic: this.mnemonic.getMnemonic(),
    };
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: KeyPair["privateKey"]
  ): AddressData {
    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(derivationPath, i);
      const data = this.getData(incrementedDerivationPath);

      if (data.privateKey === privateKey) return data;
    }

    const keyPair = Keypair.fromSecretKey(base58.decode(privateKey));
    const publicKey = this.getPublicKey(keyPair);

    return {
      privateKey,
      publicKey,
      address: publicKey,
      path: derivationPath,
      mnemonic: EMPTY_MNEMONIC,
    };
  }

  private getKeyPair(derivationPath: string): KeyPair {
    const rootKey = this.getRootKey();
    const keyPair = Keypair.fromSeed(rootKey.derive(derivationPath).privateKey);
    const publicKey = this.getPublicKey(keyPair);
    const privateKey = base58.encode(keyPair.secretKey);

    return { privateKey, publicKey };
  }

  private getPublicKey(keyPair: Keypair): string {
    return keyPair.publicKey.toBase58();
  }
}

export { SolanaAddress };
