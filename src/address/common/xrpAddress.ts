import { Keys } from "./keys/index.js";
import { DerivationPath } from "@/enums/index.js";
import { ExceptionMessage } from "@/exceptions/index.js";
import { toUint8Array } from "@/helpers/index.js";
import {
  type AbstractAddress,
  type AddressMetadata,
  type AddressConfig,
  type KeyPair,
  type XrpAddressType,
} from "../types/index.js";
import { getKeyPairFromEc } from "./helpers/index.js";
import {
  FIRST_ADDRESS_INDEX,
  EMPTY_MNEMONIC,
  SEARCH_FROM_MNEMONIC_LIMIT,
} from "../constants/index.js";
import { Wallet } from "xrpl";

class XrpAddress extends Keys implements AbstractAddress<typeof DerivationPath.XRP> {
  private derivationPath: string;

  public constructor(addressConfig: AddressConfig, mnemonic?: string) {
    super(addressConfig.keysConfig, mnemonic);

    this.derivationPath = addressConfig.derivationPath;
  }

  public getAddressMetadata(
    addressIndex: number,
    addressType: XrpAddressType,
    destinationTag?: number
  ): AddressMetadata {
    const path = this.getFullDerivationPath(addressIndex);
    const node = this.bip32RootKey.derivePath(path);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const wallet = this.getWallet(privateKey, publicKey);
    const address = this.getAddress(wallet, addressType, destinationTag);

    return {
      privateKey,
      publicKey,
      address,
      path,
      mnemonic: this.mnemonic,
    };
  }

  public importByPrivateKey(
    privateKey: KeyPair["privateKey"],
    addressType: XrpAddressType,
    destinationTag?: number
  ): AddressMetadata {
    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const addressMetadata = this.getAddressMetadata(i, addressType, destinationTag);

      if (addressMetadata.privateKey === privateKey) return addressMetadata;
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
      path: this.getFullDerivationPath(FIRST_ADDRESS_INDEX),
    };
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(ExceptionMessage.XRP_PRIVATE_KEY_GENERATION_FAILED, rawPrivateKey);
  }

  private getAddress(wallet: Wallet, addressType: XrpAddressType, destinationTag?: number): string {
    return addressType === "base" ? wallet.classicAddress : wallet.getXAddress(destinationTag);
  }

  private getWallet(privateKey: KeyPair["privateKey"], publicKey: KeyPair["publicKey"]): Wallet {
    return new Wallet(publicKey, privateKey);
  }

  private getFullDerivationPath(addressIndex: number): string {
    return `${this.derivationPath}/${addressIndex}`;
  }
}

export { XrpAddress };
