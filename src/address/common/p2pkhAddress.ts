import { payments } from "bitcoinjs-lib";
import { Keys } from "./keys/index.js";
import { assert, toUint8Array } from "@/helpers/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { ExceptionMessage, AddressError } from "@/exceptions/index.js";
import { DerivationPath } from "@/enums/index.js";
import {
  type AbstractAddress,
  type AddressMetadata,
  type AddressConfig,
  type KeyPair,
} from "../types/index.js";
import { getKeyPairFromEc } from "./helpers/index.js";
import { FIRST_ADDRESS_INDEX } from "../constants/index.js";

type NetworkDerivationPath = typeof DerivationPath.LEGACY_DOGE | typeof DerivationPath.LEGACY_BTC;

class P2pkhAddress extends Keys implements AbstractAddress<NetworkDerivationPath> {
  private addressConfig: AddressConfig;

  public constructor(addressConfig: AddressConfig, mnemonic?: string) {
    super(addressConfig.keysConfig, mnemonic);

    this.addressConfig = addressConfig;
  }

  public getAddressMetadata(addressIndex: number, base58RootKey?: string): AddressMetadata {
    const path = this.getFullDerivationPath(addressIndex);
    const rootKey = base58RootKey ? this.getRootKeyFromBase58(base58RootKey) : this.bip32RootKey;
    const node = rootKey.derivePath(path);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(node.publicKey);

    return {
      privateKey,
      publicKey,
      address,
      path,
      mnemonic: this.mnemonic,
    };
  }

  public importByPrivateKey(privateKey: string): AddressMetadata {
    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const addressMetadata = this.getAddressMetadata(i);

      if (addressMetadata.privateKey === privateKey) return addressMetadata;
    }

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const address = this.getAddress(toUint8Array(Buffer.from(publicKey, "hex")));

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: this.getFullDerivationPath(FIRST_ADDRESS_INDEX),
    };
  }

  private getAddress(publicKey: Uint8Array): string {
    const { address } = payments.p2pkh({
      network: this.addressConfig.keysConfig,
      pubkey: publicKey,
    });

    assert(address, AddressError, ExceptionMessage.P2PKH_ADDRESS_GENERATION_FAILED);

    return address;
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(ExceptionMessage.P2PKH_PRIVATE_KEY_GENERATION_FAILED, rawPrivateKey);
  }

  private getFullDerivationPath(addressIndex: number): string {
    return `${this.addressConfig.derivationPath}/${addressIndex}`;
  }
}

export { P2pkhAddress };
