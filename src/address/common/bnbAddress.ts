import { Keys } from "./keys/index.js";
import { ecPair, type ECPairInterface } from "@/ecc/index.js";
import {
  getPublicKeyFromPrivateKey,
  getAddressFromPrivateKey,
} from "@binance-chain/javascript-sdk/lib/crypto";
import { type AddressData, type KeysConfig, type KeyPair } from "../types/index.js";
import { appendAddressToDerivationPath, removeDerivationPathAddress } from "../helpers/index.js";
import { assert, toHexFromBytes, toUint8Array } from "@/helpers/index.js";
import { ExceptionMessage, AddressError } from "@/exceptions/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractAddress } from "@/address/index.js";

const HRP = "bnb";

class BnbAddress extends Keys implements AbstractAddress {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public getData(derivationPath: string): AddressData {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(privateKey);

    return {
      privateKey,
      publicKey,
      address,
      path: derivationPath,
      mnemonic: this.mnemonic.getMnemonic(),
    };
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: KeyPair["privateKey"]
  ): AddressData {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(incrementedDerivationPath);

      if (data.privateKey === privateKey) return data;
    }

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const address = this.getAddress(privateKey);

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: derivationPath,
    };
  }

  private getAddress(privateKey: KeyPair["privateKey"]): string {
    return getAddressFromPrivateKey(privateKey, HRP);
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    assert(rawPrivateKey, AddressError, ExceptionMessage.BNB_PRIVATE_KEY_GENERATION_FAILED);
    const keyPair: ECPairInterface = ecPair.fromPrivateKey(rawPrivateKey);
    const privateKey = toHexFromBytes(keyPair.privateKey);
    const publicKey = getPublicKeyFromPrivateKey(privateKey);

    return { privateKey, publicKey };
  }
}

export { BnbAddress };
