import { payments } from "bitcoinjs-lib";
import { Keys } from "./keys/index.js";
import { assert, toUint8Array } from "@/helpers/index.js";
import { ExceptionMessage, AddressError } from "@/exceptions/index.js";
import { type CommonAddressData, type KeyPair, type KeysConfig } from "../types/index.js";
import {
  appendAddressToDerivationPath,
  getKeyPairFromEc,
  removeDerivationPathAddress,
} from "../helpers/index.js";
import {
  EMPTY_MNEMONIC,
  FIRST_ADDRESS_INDEX,
  SEARCH_FROM_MNEMONIC_LIMIT,
} from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractAddress } from "./types/index.js";

class P2wpkhInP2shAddress extends Keys implements AbstractAddress<true> {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public getData(derivationPath: string, base58RootKey?: string): CommonAddressData {
    const rootKey = base58RootKey ? this.getRootKeyFromBase58(base58RootKey) : this.rootKey;
    const node = rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(node.publicKey);

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
    privateKey: string,
    base58RootKey?: string
  ): CommonAddressData {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const derivationPathWithAddress = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(derivationPathWithAddress, base58RootKey);

      if (data.privateKey === privateKey) return data;
    }

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const address = this.getAddress(toUint8Array(Buffer.from(publicKey, "hex")));

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: appendAddressToDerivationPath(derivationPath, FIRST_ADDRESS_INDEX),
    };
  }

  private getAddress(publicKey: Uint8Array): string {
    const redeem = payments.p2wpkh({ pubkey: publicKey });
    const { address } = payments.p2sh({ redeem });
    assert(address, AddressError, ExceptionMessage.P2WPKH_IN_P2SH_ADDRESS_GENERATION_FAILED);

    return address;
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(
      ExceptionMessage.P2WPKH_IN_P2SH_PRIVATE_KEY_GENERATION_FAILED,
      rawPrivateKey
    );
  }
}

export { P2wpkhInP2shAddress };
