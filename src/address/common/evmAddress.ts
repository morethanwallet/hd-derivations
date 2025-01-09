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
import { type DerivedItem, type KeysConfig, type KeyPair } from "../types/index.js";
import {
  appendAddressToDerivationPath,
  getKeyPairFromEc,
  removeDerivationPathAddress,
} from "../helpers/index.js";
import { toUint8Array } from "@/helpers/index.js";
import { ExceptionMessage } from "../exceptions/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AddressList, type AbstractAddress } from "@/address/index.js";

class EvmAddress extends Keys implements AbstractAddress<typeof AddressList.EVM> {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public derive(derivationPath: string): DerivedItem {
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
  ): DerivedItem {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.derive(incrementedDerivationPath);

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
      path: derivationPath,
    };
  }

  private getAddress(publicKey: KeyPair["publicKey"]): string {
    const unprefixedPublicKey = this.checkAndRemoveHexPrefix(publicKey);
    const publicKeyBuffer = this.getPublicKeyBuffer(
      toUint8Array(Buffer.from(unprefixedPublicKey, "hex"))
    );
    const evmPublicKey = importPublic(publicKeyBuffer);
    const addressBuffer = publicToAddress(evmPublicKey);
    const hexAddress = addHexPrefix(addressBuffer.toString("hex"));

    return toChecksumAddress(hexAddress);
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    const { privateKey, publicKey } = getKeyPairFromEc(
      ExceptionMessage.EVM_PRIVATE_KEY_GENERATION_FAILED,
      this.keysConfig,
      rawPrivateKey
    );

    return {
      privateKey: bufferToHex(Buffer.from(privateKey, "hex")),
      publicKey: addHexPrefix(publicKey),
    };
  }

  private getPublicKeyBuffer(publicKey: Uint8Array): Buffer {
    return Buffer.from(publicKey.buffer, publicKey.byteOffset, publicKey.byteLength);
  }

  private checkAndRemoveHexPrefix(publicKey: KeyPair["publicKey"]): string {
    return isHexPrefixed(publicKey) ? stripHexPrefix(publicKey) : publicKey;
  }
}

export { EvmAddress };
