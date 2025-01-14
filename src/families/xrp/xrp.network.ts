import { type Mnemonic } from "@/mnemonic/index.js";
import { config } from "./config/index.js";
import {
  type DerivedCredential,
  type DerivedItem,
  type DerivedKeyPair,
  type DeriveItemFromMnemonicParameters,
  type GetCredentialFromPrivateKeyParameters,
  type XrpAddressUnion,
  type AbstractNetwork,
  type CommonNetworkPurposeUnion,
} from "../types/index.js";
import { Keys } from "@/keys/bip32/index.js";
import { toUint8Array } from "@/helpers/index.js";
import { getKeyPairFromEc } from "../helpers/index.js";
import { ExceptionMessage } from "../exceptions/index.js";
import { Wallet } from "xrpl";

class Xrp extends Keys implements AbstractNetwork<"xrp"> {
  private purpose: CommonNetworkPurposeUnion;

  public constructor(mnemonic: Mnemonic, purpose: CommonNetworkPurposeUnion) {
    super(config.keysConfig, mnemonic);

    this.purpose = purpose;
  }

  public deriveItemFromMnemonic({
    addressType,
    derivationPath,
    destinationTag,
  }: DeriveItemFromMnemonicParameters<"xrp">): DerivedItem<"xrp"> {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const wallet = this.getWallet(privateKey, publicKey);
    const address = this.getAddress(wallet, addressType, destinationTag);

    return {
      privateKey,
      publicKey,
      address,
      derivationPath,
    };
  }

  public getCredentialFromPrivateKey({
    addressType,
    privateKey,
    destinationTag,
  }: GetCredentialFromPrivateKeyParameters<"xrp">): DerivedCredential<"xrp"> {
    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const wallet = this.getWallet(privateKey, publicKey);
    const address = this.getAddress(wallet, addressType, destinationTag);

    return {
      privateKey,
      publicKey,
      address,
    };
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): DerivedKeyPair {
    return getKeyPairFromEc(
      ExceptionMessage.XRP_PRIVATE_KEY_GENERATION_FAILED,
      this.keysConfig,
      rawPrivateKey
    );
  }

  private getAddress(
    wallet: Wallet,
    addressType: XrpAddressUnion,
    destinationTag?: number
  ): string {
    const isTestnet = this.purpose === "testnet";

    return addressType === "base"
      ? wallet.classicAddress
      : wallet.getXAddress(destinationTag, isTestnet);
  }

  private getWallet(
    privateKey: DerivedKeyPair["privateKey"],
    publicKey: DerivedKeyPair["publicKey"]
  ): Wallet {
    return new Wallet(publicKey, privateKey);
  }
}

export { Xrp };
