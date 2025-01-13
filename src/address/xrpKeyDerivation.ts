import { ExceptionMessage } from "./exceptions/index.js";
import { toUint8Array } from "@/helpers/index.js";
import { getKeyPairFromEc } from "./helpers/index.js";
import { Wallet } from "xrpl";
import { type Mnemonic } from "@/mnemonic/index.js";
import {
  AbstractKeyDerivation,
  DerivedCredential,
  DerivedItem,
  DerivedKeyPair,
  DeriveFromMnemonicParameters,
  ImportByPrivateKeyParameters,
} from "./types/index.js";
import { Keys } from "@/keys/bip32/index.js";
import { AddressUnion, NetworkPurposeUnion } from "@/families/xrp/types/index.js";
import { KeysConfig } from "@/keys/types/index.js";
import { DerivationType } from "./enums/index.js";

class XrpKeyDerivation extends Keys implements AbstractKeyDerivation<AddressUnion> {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
    addressType,
    networkPurpose,
    destinationTag,
  }: DeriveFromMnemonicParameters<AddressUnion>): DerivedItem<AddressUnion> {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const wallet = this.getWallet(privateKey, publicKey);
    const address = this.getAddress(wallet, addressType, networkPurpose, destinationTag);

    return {
      privateKey,
      publicKey,
      address,
      derivationPath,
    };
  }

  public importByPrivateKey({
    privateKey,
    addressType,
    networkPurpose,
    destinationTag,
  }: ImportByPrivateKeyParameters<AddressUnion>): DerivedCredential<AddressUnion> {
    // const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    // for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
    //   const incrementedDerivationPath = appendAddressToDerivationPath(
    //     derivationPathWithoutAddress,
    //     i
    //   );

    //   const data = this.derive({
    //     derivationPath: incrementedDerivationPath,
    //     addressType,
    //     networkPurpose,
    //     destinationTag,
    //   });

    //   if (data.privateKey === privateKey) return data;
    // }

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const wallet = this.getWallet(privateKey, publicKey);
    const address = this.getAddress(wallet, addressType, networkPurpose, destinationTag);

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
    addressType: AddressUnion,
    networkPurpose: NetworkPurposeUnion,
    destinationTag?: number
  ): string {
    const isTestnet = networkPurpose === "testnet";

    return addressType === DerivationType.XRP_BASE
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

export { XrpKeyDerivation };
