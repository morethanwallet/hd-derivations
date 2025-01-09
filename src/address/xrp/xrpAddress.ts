import { ExceptionMessage } from "../exceptions/index.js";
import { toUint8Array } from "@/helpers/index.js";
import {
  appendAddressToDerivationPath,
  getKeyPairFromEc,
  removeDerivationPathAddress,
} from "../helpers/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { Wallet } from "xrpl";
import { Keys } from "../common/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import {
  type AbstractAddress,
  AddressType,
  type DerivedItem,
  type KeyPair,
  type KeysConfig,
} from "@/address/index.js";
import { type NetworkPurpose, type XrpAddress as TXrpAddress } from "@/families/xrp/index.js";

class XrpAddress extends Keys implements AbstractAddress<TXrpAddress> {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public getData({
    derivationPath,
    addressType,
    networkPurpose,
    destinationTag,
  }: Parameters<AbstractAddress<TXrpAddress>["getData"]>[0]): DerivedItem<TXrpAddress> {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const wallet = this.getWallet(privateKey, publicKey);
    const address = this.getAddress(wallet, addressType, networkPurpose, destinationTag);

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
    networkPurpose,
    destinationTag,
  }: Parameters<AbstractAddress<TXrpAddress>["importByPrivateKey"]>[0]): DerivedItem<TXrpAddress> {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData({
        derivationPath: incrementedDerivationPath,
        addressType,
        networkPurpose,
        destinationTag,
      });

      if (data.privateKey === privateKey) return data;
    }

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const wallet = this.getWallet(privateKey, publicKey);
    const address = this.getAddress(wallet, addressType, networkPurpose, destinationTag);

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
    addressType: TXrpAddress,
    networkPurpose: NetworkPurpose,
    destinationTag?: number
  ): string {
    const isTestnet = networkPurpose === "testnet";

    return addressType === AddressType.XRP_BASE
      ? wallet.classicAddress
      : wallet.getXAddress(destinationTag, isTestnet);
  }

  private getWallet(privateKey: KeyPair["privateKey"], publicKey: KeyPair["publicKey"]): Wallet {
    return new Wallet(publicKey, privateKey);
  }
}

export { XrpAddress };
