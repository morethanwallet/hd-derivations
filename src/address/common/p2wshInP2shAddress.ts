import { payments } from "bitcoinjs-lib";
import { Keys } from "./keys/index.js";
import { assert, toUint8Array } from "@/helpers/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { ExceptionMessage, AddressError } from "../exceptions/index.js";
import { type AddressData, type KeyPair, type KeysConfig } from "../types/index.js";
import {
  appendAddressToDerivationPath,
  getKeyPairFromEc,
  removeDerivationPathAddress,
} from "../helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractAddress } from "@/address/index.js";
import { type BIP32Interface } from "bip32";

class P2wshInP2shAddress extends Keys implements AbstractAddress {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public getData(derivationPath: string): AddressData {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node);
    const address = this.getAddress(node.publicKey);

    return {
      privateKey,
      publicKey,
      address,
      path: derivationPath,
      mnemonic: this.mnemonic.getMnemonic(),
    };
  }

  public importByPrivateKey(derivationPath: string, privateKey: string): AddressData {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(incrementedDerivationPath);

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
    const requiredSignatures = 1;

    const p2wshRedeem = payments.p2ms({
      m: requiredSignatures,
      pubkeys: [publicKey],
      network: this.keysConfig,
    });

    const p2shRedeem = payments.p2wsh({ redeem: p2wshRedeem });

    const { address } = payments.p2sh({
      redeem: p2shRedeem,
      network: this.keysConfig,
    });

    assert(address, AddressError, ExceptionMessage.P2WSH_ADDRESS_GENERATION_FAILED);

    return address;
  }

  private getKeyPair(source: BIP32Interface | string): KeyPair {
    return getKeyPairFromEc(ExceptionMessage.P2WPKH_IN_P2SH_PRIVATE_KEY_GENERATION_FAILED, source);
  }
}

export { P2wshInP2shAddress };
