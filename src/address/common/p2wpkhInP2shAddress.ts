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
import { searchFromMnemonic } from "../helpers/index.js";
import { EMPTY_MNEMONIC, FIRST_ADDRESS_INDEX } from "../constants/index.js";

class P2wpkhInP2shAddress
  extends Keys
  implements AbstractAddress<typeof DerivationPath.NATIVE_SEG_WIT_BTC>
{
  private addressConfig: AddressConfig;

  public constructor(addressConfig: AddressConfig, mnemonic?: string) {
    super(addressConfig.keysConfig, mnemonic);

    this.addressConfig = addressConfig;
  }

  public getAddressMetadata(
    addressIndex: number
  ): AddressMetadata<typeof DerivationPath.NATIVE_SEG_WIT_BTC> {
    const path = this.getFullDerivationPath(addressIndex);
    const rootKey = this.bip32RootKey;
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

  public importByPrivateKey(
    privateKey: string
  ): AddressMetadata<typeof DerivationPath.NATIVE_SEG_WIT_BTC> {
    const mnemonicResults = searchFromMnemonic<typeof DerivationPath.NATIVE_SEG_WIT_BTC>(
      privateKey,
      this.getAddressMetadata.bind(this)
    );

    if (mnemonicResults !== null) return mnemonicResults;

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

  private getAddress(publicKey: Uint8Array): string | undefined {
    const redeem = payments.p2wpkh({ pubkey: publicKey });
    const { address } = payments.p2sh({ redeem });
    assert(address, AddressError, ExceptionMessage.P2WPKH_ADDRESS_GENERATION_FAILED);

    return address;
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(ExceptionMessage.P2WPKH_PRIVATE_KEY_GENERATION_FAILED, rawPrivateKey);
  }

  private getFullDerivationPath(addressIndex: number): string {
    return `${this.addressConfig.derivationPath}/${addressIndex}`;
  }
}

export { P2wpkhInP2shAddress };
