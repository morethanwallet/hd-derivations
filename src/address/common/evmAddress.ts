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
import { type AddressData, type KeysConfig, type KeyPair } from "../types/index.js";
import { appendAddressToDerivationPath, removeDerivationPathAddress } from "../helpers/index.js";
import { assert, toHexFromBytes, toUint8Array } from "@/helpers/index.js";
import { ExceptionMessage, AddressError } from "@/exceptions/index.js";
import {
  EMPTY_MNEMONIC,
  FIRST_ADDRESS_INDEX,
  SEARCH_FROM_MNEMONIC_LIMIT,
} from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractAddress } from "./types/index.js";

class EvmAddress extends Keys implements AbstractAddress {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public getData(derivationPath: string): AddressData {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(publicKey);

    return {
      privateKey,
      publicKey,
      address,
      path: derivationPath,
      mnemonic: this.mnemonic.getMnemonic(),
    };
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: KeyPair["privateKey"]
  ): AddressData {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(incrementedDerivationPath);

      if (data.privateKey === privateKey) return data;
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
      path: appendAddressToDerivationPath(derivationPath, FIRST_ADDRESS_INDEX),
    };
  }

  private getAddress(publicKey: KeyPair["publicKey"]): string {
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

  private checkAndRemoveHexPrefix(publicKey: KeyPair["publicKey"]): string {
    return isHexPrefixed(publicKey) ? stripHexPrefix(publicKey) : publicKey;
  }
}

export { EvmAddress };
