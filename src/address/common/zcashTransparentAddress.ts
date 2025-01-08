import { Keys } from "./keys/index.js";
import bs58check from "bs58check";
import { hash160 } from "bitcoinjs-lib/src/crypto";
import { toHexFromBytes, toUint8Array } from "@/helpers/index.js";
import { type KeysConfig, type KeyPair, type AddressData } from "../types/index.js";
import { AddressError, ExceptionMessage } from "../exceptions/index.js";
import {
  appendAddressToDerivationPath,
  getKeyPairFromEc,
  removeDerivationPathAddress,
} from "../helpers/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AddressType, type AbstractAddress } from "@/address/index.js";
import { type BIP32Interface } from "bip32";
import { ecPair } from "@/ecc/index.js";
import { networks } from "bitcoinjs-lib";

// TODO: Move this class to the zcash folder
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

class ZcashTransparentAddress
  extends Keys
  implements AbstractAddress<typeof AddressType.ZEC_TRANSPARENT>
{
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
  // TODO: Replace all private/public-key parameter types with KeyPair["private/public-Key"]
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
    const ripemd160 = hash160(publicKey);
    const prefix = splitPrefixIntoBytesArray(this.keysConfig.pubKeyHash);
    const addressBytes = toUint8Array(Buffer.concat([prefix, ripemd160]));

    return bs58check.encode(addressBytes);
  }

  private getKeyPair(source: BIP32Interface | string): KeyPair {
    if (typeof source === "string") {
      const decoded = bs58check.decode(source);
      const networkPrefixIndex = 0;
      const privateKeyStartIndex = 1;
      const isCompressedByteStartIndex = 33;
      const wifCompressedLength = 34;
      const wifCompressedByte = 0x01;

      if (decoded[networkPrefixIndex] !== this.keysConfig.wif) {
        throw new AddressError(ExceptionMessage.ZCASH_INVALID_WIF_PREFIX);
      }

      const privateKey = decoded.slice(privateKeyStartIndex, isCompressedByteStartIndex);
      const compressed =
        decoded.length === wifCompressedLength &&
        decoded[isCompressedByteStartIndex] === wifCompressedByte;

      const keyPair = ecPair.fromPrivateKey(privateKey, {
        compressed,
        network: networks.bitcoin,
      });

      return {
        privateKey: toHexFromBytes(keyPair.privateKey),
        publicKey: toHexFromBytes(keyPair.publicKey),
      };
    }

    return getKeyPairFromEc(
      ExceptionMessage.ZCASH_PRIVATE_KEY_GENERATION_FAILED,
      this.keysConfig,
      source
    );
  }
}

export { ZcashTransparentAddress };
