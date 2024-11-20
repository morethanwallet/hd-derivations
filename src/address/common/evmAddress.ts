import {
  importPublic,
  publicToAddress,
  addHexPrefix,
  toChecksumAddress,
  bufferToHex,
  isHexPrefixed,
  stripHexPrefix,
} from "ethereumjs-util";
import { Keys } from "./keys/index.js";
import { ecPair, type ECPairInterface } from "@/ecc/index.js";
import {
  type AbstractAddress,
  type AddressMetadata,
  type AddressConfig,
  type KeyPair,
} from "../types/index.js";
import { assert, toHexFromBytes, toUint8Array } from "@/helpers/index.js";
import { ExceptionMessage, AddressError } from "@/exceptions/index.js";
import {
  EMPTY_MNEMONIC,
  FIRST_ADDRESS_INDEX,
  SEARCH_FROM_MNEMONIC_LIMIT,
} from "../constants/index.js";
import { type DerivationPath } from "@/enums/index.js";

type NetworkDerivationPath =
  | typeof DerivationPath.ETH
  | typeof DerivationPath.BSC
  | typeof DerivationPath.AVAX_C
  | typeof DerivationPath.ETC
  | typeof DerivationPath.COINOMI_ETH
  | typeof DerivationPath.COINOMI_ETC;

class EvmAddress extends Keys implements AbstractAddress<NetworkDerivationPath> {
  private derivationPath: string;

  public constructor(addressConfig: AddressConfig, mnemonic?: string) {
    super(addressConfig.keysConfig, mnemonic);

    this.derivationPath = addressConfig.derivationPath;
  }

  public getAddressMetadata(addressIndex: number): AddressMetadata {
    const path = this.getFullDerivationPath(addressIndex);
    const node = this.bip32RootKey.derivePath(path);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(publicKey);

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

    const rawPrivateKey = toUint8Array(
      Buffer.from(this.checkAndRemoveHexPrefix(privateKey), "hex")
    );

    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const address = this.getAddress(publicKey);

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: this.getFullDerivationPath(FIRST_ADDRESS_INDEX),
    };
  }

  private getAddress(publicKey: string): string {
    const publicKeyBuffer = Buffer.from(publicKey, "hex");
    const addressBuffer = publicToAddress(publicKeyBuffer);
    const hexAddress = addHexPrefix(addressBuffer.toString("hex"));

    return toChecksumAddress(hexAddress);
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    assert(rawPrivateKey, AddressError, ExceptionMessage.EVM_PRIVATE_KEY_GENERATION_FAILED);
    const keyPair: ECPairInterface = ecPair.fromPrivateKey(rawPrivateKey);
    const privateKey = bufferToHex(keyPair.privateKey);
    const hexPublicKey = toHexFromBytes(keyPair.publicKey);
    const publicKeyBuffer = this.getPublicKeyBuffer(toUint8Array(Buffer.from(hexPublicKey, "hex")));
    const evmPublicKey = importPublic(publicKeyBuffer).toString("hex");

    return { privateKey, publicKey: evmPublicKey };
  }

  private getPublicKeyBuffer(publicKey: Uint8Array): Buffer {
    return Buffer.from(publicKey.buffer, publicKey.byteOffset, publicKey.byteLength);
  }

  private getFullDerivationPath(addressIndex: number): string {
    return `${this.derivationPath}/${addressIndex}`;
  }

  private checkAndRemoveHexPrefix(publicKey: string): string {
    return isHexPrefixed(publicKey) ? stripHexPrefix(publicKey) : publicKey;
  }
}

export { EvmAddress };
