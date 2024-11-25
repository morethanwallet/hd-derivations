import { Keys } from "./keys/index.js";
import bs58check from "bs58check";
import { hash160 } from "bitcoinjs-lib/src/crypto";
import { toUint8Array } from "@/helpers/index.js";
import { type KeysConfig, type KeyPair, type CommonAddressData } from "../types/index.js";
import { ExceptionMessage } from "@/exceptions/index.js";
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

const HEXADECIMAL_SYSTEM_IDENTIFIER = 16;

function splitPrefixIntoBytesArray(prefix: number): Uint8Array {
  const firstByteStartIndex = 0;
  const secondByteStartIndex = 2;
  const stringifiedPrefix = prefix.toString(HEXADECIMAL_SYSTEM_IDENTIFIER);

  const firstByte = Number.parseInt(
    stringifiedPrefix.slice(firstByteStartIndex, secondByteStartIndex),
    HEXADECIMAL_SYSTEM_IDENTIFIER
  );

  const secondByte = Number.parseInt(
    stringifiedPrefix.slice(secondByteStartIndex),
    HEXADECIMAL_SYSTEM_IDENTIFIER
  );

  return toUint8Array(Buffer.from([firstByte, secondByte]));
}

class ZcashTransparentAddress extends Keys implements AbstractAddress {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public getData(derivationPath: string): CommonAddressData {
    const node = this.rootKey.derivePath(derivationPath);
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
  // TODO: Replace all private/public-key parameter types with KeyPair["private/public-Key"]
  public importByPrivateKey(derivationPath: string, privateKey: string): CommonAddressData {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const derivationPathWithAddress = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(derivationPathWithAddress);

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
    const ripemd160 = hash160(publicKey);
    const prefix = splitPrefixIntoBytesArray(this.keysConfig.pubKeyHash);
    const addressBytes = toUint8Array(Buffer.concat([prefix, ripemd160]));

    return bs58check.encode(addressBytes);
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(ExceptionMessage.ZCASH_PRIVATE_KEY_GENERATION_FAILED, rawPrivateKey);
  }
}

export { ZcashTransparentAddress };
