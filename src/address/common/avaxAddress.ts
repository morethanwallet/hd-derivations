import { Keys } from "./keys/index.js";
import { utils } from "@avalabs/avalanchejs";
import { crypto } from "bitcoinjs-lib";
import { toUint8Array } from "@/helpers/index.js";
import {
  type AbstractAddress,
  type AddressMetadata,
  type AddressConfig,
  type KeyPair,
  type AvaxChainType,
} from "../types/index.js";
import { ExceptionMessage } from "@/exceptions/index.js";
import { getKeyPairFromEc } from "./helpers/index.js";
import {
  EMPTY_MNEMONIC,
  FIRST_ADDRESS_INDEX,
  SEARCH_FROM_MNEMONIC_LIMIT,
} from "../constants/index.js";
import { type DerivationPath } from "@/enums/index.js";

const AvaxPrefix: Record<AvaxChainType, string> = {
  X: "X-",
  P: "P-",
} as const;

const AVAX_HRP = "avax";

class AvaxAddress extends Keys implements AbstractAddress<typeof DerivationPath.AVAX> {
  private derivationPath: string;

  public constructor(addressConfig: AddressConfig, mnemonic?: string) {
    super(addressConfig.keysConfig, mnemonic);

    this.derivationPath = addressConfig.derivationPath;
  }

  public getAddressMetadata(
    addressIndex: number,
    chainType: AvaxChainType
  ): AddressMetadata<typeof DerivationPath.AVAX> {
    const path = this.getFullDerivationPath(addressIndex);
    const node = this.bip32RootKey.derivePath(path);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(node.publicKey, chainType);

    return {
      privateKey,
      publicKey,
      address,
      path,
      mnemonic: this.mnemonic,
    };
  }

  public importByPrivateKey(
    privateKey: string,
    chainType: AvaxChainType
  ): AddressMetadata<typeof DerivationPath.AVAX> {
    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const addressMetadata = this.getAddressMetadata(i, chainType);

      if (addressMetadata.privateKey === privateKey) return addressMetadata;
    }

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = getKeyPairFromEc(
      ExceptionMessage.AVAX_PRIVATE_KEY_GENERATION_FAILED,
      rawPrivateKey
    );

    const address = this.getAddress(toUint8Array(Buffer.from(publicKey, "hex")), chainType);

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: this.getFullDerivationPath(FIRST_ADDRESS_INDEX),
    };
  }

  private getAddress(publicKey: Uint8Array, chainType: AvaxChainType): string {
    const address: string = utils.formatBech32(AVAX_HRP, crypto.hash160(publicKey));

    return AvaxPrefix[chainType].concat(address);
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(ExceptionMessage.AVAX_PRIVATE_KEY_GENERATION_FAILED, rawPrivateKey);
  }

  private getFullDerivationPath(addressIndex: number): string {
    return `${this.derivationPath}/${addressIndex}`;
  }
}

export { AvaxAddress };
