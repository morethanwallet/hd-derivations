import { payments } from "bitcoinjs-lib";
import { Keys } from "./keys/index.js";
import { assert, toUint8Array } from "@/helpers/index.js";
import { DerivationPath } from "@/enums/index.js";
import { ExceptionMessage, AddressError } from "@/exceptions/index.js";
import {
  type AbstractAddress,
  type AddressMetadata,
  type AddressConfig,
  type KeyPair,
} from "../types/index.js";
import { getKeyPairFromEc } from "./helpers/index.js";
import {
  EMPTY_MNEMONIC,
  FIRST_ADDRESS_INDEX,
  SEARCH_FROM_MNEMONIC_LIMIT,
} from "../constants/index.js";

class P2wshAddress
  extends Keys
  implements AbstractAddress<typeof DerivationPath.NATIVE_SEG_WIT_BTC>
{
  private addressConfig: AddressConfig;

  public constructor(addressConfig: AddressConfig, mnemonic?: string) {
    super(addressConfig.keysConfig, mnemonic);

    this.addressConfig = addressConfig;
  }

  public getAddressMetadata(addressIndex: number): AddressMetadata {
    const path = this.getFullDerivationPath(addressIndex);
    const node = this.bip32RootKey.derivePath(path);
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
    const requiredSignatures = 1;
    
    const redeem = payments.p2ms({
      m: requiredSignatures,
      pubkeys: [publicKey],
      network: this.addressConfig.keysConfig,
    });

    const { address } = payments.p2wsh({ redeem, network: this.addressConfig.keysConfig });
    assert(address, AddressError, ExceptionMessage.P2WSH_ADDRESS_GENERATION_FAILED);

    return address;
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(ExceptionMessage.P2WSH_PRIVATE_KEY_GENERATION_FAILED, rawPrivateKey);
  }

  private getFullDerivationPath(addressIndex: number): string {
    return `${this.addressConfig.derivationPath}/${addressIndex}`;
  }
}

export { P2wshAddress };
