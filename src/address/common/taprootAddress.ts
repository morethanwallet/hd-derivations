import { payments } from "bitcoinjs-lib";
import { Keys } from "./keys/index.js";
import { assert, toHexFromBytes, toUint8Array } from "@/helpers/index.js";
import { ExceptionMessage, AddressError } from "../exceptions/index.js";
import { type AddressData, type KeyPair, type KeysConfig } from "../types/index.js";
import {
  appendAddressToDerivationPath,
  getKeyPairFromEc,
  removeDerivationPathAddress,
} from "../helpers/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractAddress } from "@/address/index.js";
import { type BIP32Interface } from "bip32";

const PUBLIC_KEY_PREFIX_END_INDEX = 1;
const X_ONLY_PUBLIC_KEY_LENGTH = 32;
const X_Y_PUBLIC_KEY_LENGTH = 33;

class TaprootAddress extends Keys implements AbstractAddress<true> {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public getData(derivationPath: string, base58RootKey?: string): AddressData {
    const rootKey = base58RootKey ? this.getRootKeyFromBase58(base58RootKey) : this.rootKey;
    const node = rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node);
    const address = this.getAddress(node.publicKey);

    return {
      privateKey,
      publicKey,
      address,
      path: derivationPath,
      mnemonic: base58RootKey ? EMPTY_MNEMONIC : this.mnemonic.getMnemonic(),
    };
  }

  public importByPrivateKey(
    derivationPath: string,
    privateKey: string,
    base58RootKey?: string
  ): AddressData {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(incrementedDerivationPath, base58RootKey);

      if (data.privateKey === privateKey) return data;
    }

    const { publicKey } = this.getKeyPair(privateKey);
    const address = this.getAddress(toUint8Array(Buffer.from(publicKey, "hex")));

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: derivationPath,
    };
  }

  private getAddress(publicKey: Uint8Array): string {
    const xOnlyPublicKey = this.toXOnlyPublicKey(publicKey);
    const { address } = payments.p2tr({ internalPubkey: xOnlyPublicKey, network: this.keysConfig });
    assert(address, AddressError, ExceptionMessage.TAPROOT_ADDRESS_GENERATION_FAILED);

    return address;
  }

  private getKeyPair(source: BIP32Interface | string): KeyPair {
    const keyPair = getKeyPairFromEc(
      ExceptionMessage.P2WPKH_IN_P2SH_PRIVATE_KEY_GENERATION_FAILED,
      source
    );

    const publicKey = toHexFromBytes(
      this.toXOnlyPublicKey(toUint8Array(Buffer.from(keyPair.publicKey, "hex")))
    );

    return { privateKey: keyPair.privateKey, publicKey };
  }

  private toXOnlyPublicKey(publicKey: Uint8Array): Uint8Array {
    return publicKey.length === X_ONLY_PUBLIC_KEY_LENGTH
      ? publicKey
      : publicKey.slice(PUBLIC_KEY_PREFIX_END_INDEX, X_Y_PUBLIC_KEY_LENGTH);
  }
}

export { TaprootAddress };
