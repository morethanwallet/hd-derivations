import { ExceptionMessage } from "../exceptions/index.js";
import { toUint8Array } from "@/helpers/index.js";
import { type AddressData, type KeyPair, type KeysConfig } from "../types/index.js";
import {
  appendAddressToDerivationPath,
  getKeyPairFromEc,
  removeDerivationPathAddress,
} from "../helpers/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { Wallet } from "xrpl";
import { Keys } from "../common/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractAddress, type AddressType } from "./types/index.js";

class XrpAddress extends Keys implements AbstractAddress {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public getData({
    derivationPath,
    addressType,
    isTestnet,
    destinationTag,
  }: Parameters<AbstractAddress["getData"]>[0]): AddressData {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const wallet = this.getWallet(privateKey, publicKey);
    const address = this.getAddress(wallet, addressType, isTestnet, destinationTag);

    return {
      privateKey,
      publicKey,
      address,
      path: derivationPath,
      mnemonic: this.mnemonic.getMnemonic(),
    };
  }

  public importByPrivateKey({
    derivationPath,
    privateKey,
    addressType,
    isTestnet,
    destinationTag,
  }: Parameters<AbstractAddress["importByPrivateKey"]>[0]): AddressData {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData({
        addressType,
        isTestnet,
        destinationTag,
        derivationPath: incrementedDerivationPath,
      });

      if (data.privateKey === privateKey) return data;
    }

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const wallet = this.getWallet(privateKey, publicKey);
    const address = this.getAddress(wallet, addressType, isTestnet, destinationTag);

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: derivationPath,
    };
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(
      ExceptionMessage.XRP_PRIVATE_KEY_GENERATION_FAILED,
      this.keysConfig,
      rawPrivateKey
    );
  }

  private getAddress(
    wallet: Wallet,
    addressType: AddressType,
    isTestnet: boolean,
    destinationTag?: number
  ): string {
    return addressType === "base"
      ? wallet.classicAddress
      : wallet.getXAddress(destinationTag, isTestnet);
  }

  private getWallet(privateKey: KeyPair["privateKey"], publicKey: KeyPair["publicKey"]): Wallet {
    return new Wallet(publicKey, privateKey);
  }
}

export { XrpAddress };
