import { ExceptionMessage } from "@/exceptions/index.js";
import { toUint8Array } from "@/helpers/index.js";
import { type CommonAddressData, type KeyPair, type KeysConfig } from "../types/index.js";
import {
  appendAddressToDerivationPath,
  getKeyPairFromEc,
  removeDerivationPathAddress,
} from "../helpers/index.js";
import {
  FIRST_ADDRESS_INDEX,
  EMPTY_MNEMONIC,
  SEARCH_FROM_MNEMONIC_LIMIT,
} from "../constants/index.js";
import { Wallet } from "xrpl";
import { Keys } from "../common/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractAddress, type AddressType } from "./types/index.js";

class XrpAddress extends Keys implements AbstractAddress {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public getData(
    derivationPath: string,
    addressType: AddressType,
    destinationTag?: number
  ): CommonAddressData {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const wallet = this.getWallet(privateKey, publicKey);
    const address = this.getAddress(wallet, addressType, destinationTag);

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
    privateKey: KeyPair["privateKey"],
    addressType: AddressType,
    destinationTag?: number
  ): CommonAddressData {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(incrementedDerivationPath, addressType, destinationTag);

      if (data.privateKey === privateKey) return data;
    }

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const wallet = this.getWallet(privateKey, publicKey);
    const address = this.getAddress(wallet, addressType, destinationTag);

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: appendAddressToDerivationPath(derivationPath, FIRST_ADDRESS_INDEX),
    };
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(ExceptionMessage.XRP_PRIVATE_KEY_GENERATION_FAILED, rawPrivateKey);
  }

  private getAddress(wallet: Wallet, addressType: AddressType, destinationTag?: number): string {
    return addressType === "base" ? wallet.classicAddress : wallet.getXAddress(destinationTag);
  }

  private getWallet(privateKey: KeyPair["privateKey"], publicKey: KeyPair["publicKey"]): Wallet {
    return new Wallet(publicKey, privateKey);
  }
}

export { XrpAddress };
