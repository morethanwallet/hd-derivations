import { Keys } from "./keys/index.js";
import { payments } from "bitcoinjs-lib";
import { toCashAddress } from "bchaddrjs";
import { ExceptionMessage, AddressError } from "@/exceptions/index.js";
import { type CommonAddressData, type KeyPair, type KeysConfig } from "../types/index.js";
import { assert, toUint8Array } from "@/helpers/index.js";
import {
  appendAddressToDerivationPath,
  getKeyPairFromEc,
  removeDerivationPathAddress,
} from "./helpers/index.js";
import {
  FIRST_ADDRESS_INDEX,
  EMPTY_MNEMONIC,
  SEARCH_FROM_MNEMONIC_LIMIT,
} from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractAddress } from "./types/index.js";

class CashAddrAddress extends Keys implements AbstractAddress {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public getData(derivationPath: string): CommonAddressData {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(node.publicKey);

    return {
      privateKey,
      publicKey,
      address,
      path: derivationPath,
      mnemonic: this.mnemonic.getMnemonic(),
    };
  }

  public importByPrivateKey(derivationPath: string, privateKey: string): CommonAddressData {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const derivationPathWithAddress = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(derivationPathWithAddress);

      if (data.privateKey === privateKey) return data;
    }

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const address = this.getAddress(toUint8Array(Buffer.from(publicKey, "hex")));

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: appendAddressToDerivationPath(derivationPath, FIRST_ADDRESS_INDEX),
    };
  }

  private getAddress(publicKey: Uint8Array): string {
    const { address } = payments.p2pkh({ network: this.keysConfig, pubkey: publicKey });
    assert(address, AddressError, ExceptionMessage.CASH_ADDR_ADDRESS_GENERATION_FAILED);

    return toCashAddress(address);
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(
      ExceptionMessage.CASH_ADDR_PRIVATE_KEY_GENERATION_FAILED,
      rawPrivateKey
    );
  }
}

export { CashAddrAddress };
