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
  DerivationType,
  type DerivedItem,
  type KeyPair,
  type KeysConfig,
} from "@/address/index.js";
import { type NetworkPurpose, type AddressUnion } from "@/families/xrp/index.js";

class XrpAddress extends Keys implements AbstractAddress<AddressUnion> {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public derive({
    derivationPath,
    addressType,
    networkPurpose,
    destinationTag,
  }: Parameters<AbstractAddress<AddressUnion>["derive"]>[0]): DerivedItem<AddressUnion> {
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
  }: Parameters<
    AbstractAddress<AddressUnion>["importByPrivateKey"]
  >[0]): DerivedItem<AddressUnion> {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.derive({
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
    addressType: AddressUnion,
    networkPurpose: NetworkPurpose,
    destinationTag?: number
  ): string {
    const isTestnet = networkPurpose === "testnet";

    return addressType === DerivationType.XRP_BASE
      ? wallet.classicAddress
      : wallet.getXAddress(destinationTag, isTestnet);
  }

  private getWallet(privateKey: KeyPair["privateKey"], publicKey: KeyPair["publicKey"]): Wallet {
    return new Wallet(publicKey, privateKey);
  }
}

export { XrpAddress };
