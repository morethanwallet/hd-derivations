import { Keys } from "./keys/index.js";
import { ecPair, type ECPairInterface } from "@/ecc/index.js";
import {
  getPublicKeyFromPrivateKey,
  getAddressFromPrivateKey,
} from "@binance-chain/javascript-sdk/lib/crypto";
import {
  type AbstractAddress,
  type AddressMetadata,
  type AddressConfig,
  type KeyPair,
} from "../types/index.js";
import { assert, toHexFromBytes, toUint8Array } from "@/helpers/index.js";
import { ExceptionMessage, AddressError } from "@/exceptions/index.js";
import { DerivationPath } from "@/enums/index.js";
import { searchFromMnemonic } from "../helpers/index.js";
import { EMPTY_MNEMONIC, FIRST_ADDRESS_INDEX } from "../constants/index.js";

const BNB_HRP = "bnb";

class BnbAddress extends Keys implements AbstractAddress<typeof DerivationPath.BNB> {
  private derivationPath: string;

  public constructor(addressConfig: AddressConfig, mnemonic?: string) {
    super(addressConfig.keysConfig, mnemonic);

    this.derivationPath = addressConfig.derivationPath;
  }

  public getAddressMetadata(addressIndex: number): AddressMetadata<typeof DerivationPath.BNB> {
    const path = this.getFullDerivationPath(addressIndex);
    const node = this.bip32RootKey.derivePath(path);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(privateKey);

    return {
      privateKey,
      publicKey,
      address,
      path,
      mnemonic: this.mnemonic,
    };
  }

  public importByPrivateKey(privateKey: string): AddressMetadata<typeof DerivationPath.BNB> {
    const mnemonicResults = searchFromMnemonic<typeof DerivationPath.BNB>(
      privateKey,
      this.getAddressMetadata.bind(this)
    );

    if (mnemonicResults !== null) return mnemonicResults;

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const address = this.getAddress(privateKey);

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: this.getFullDerivationPath(FIRST_ADDRESS_INDEX),
    };
  }

  private getAddress(privateKey: string): string {
    return getAddressFromPrivateKey(privateKey, BNB_HRP);
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    assert(rawPrivateKey, AddressError, ExceptionMessage.BNB_PRIVATE_KEY_GENERATION_FAILED);
    const keyPair: ECPairInterface = ecPair.fromPrivateKey(rawPrivateKey);
    const privateKey = toHexFromBytes(keyPair.privateKey);
    const publicKey = getPublicKeyFromPrivateKey(privateKey);

    return { privateKey, publicKey };
  }

  private getFullDerivationPath(addressIndex: number): string {
    return `${this.derivationPath}/${addressIndex}`;
  }
}

export { BnbAddress };
