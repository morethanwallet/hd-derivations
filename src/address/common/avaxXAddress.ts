import { Keys } from "./keys/index.js";
import { utils } from "@avalabs/avalanchejs";
import { crypto } from "bitcoinjs-lib";
import { toUint8Array } from "@/helpers/index.js";
import {
  type AbstractAddress,
  type AddressMetadata,
  type AddressConfig,
  type KeyPair,
} from "../types/index.js";
import { ExceptionMessage } from "@/exceptions/index.js";
import { getKeyPairFromEc } from "./helpers/index.js";
import { EMPTY_MNEMONIC, FIRST_ADDRESS_INDEX } from "../constants/index.js";
import { searchFromMnemonic } from "../helpers/index.js";
import { type DerivationPath } from "@/enums/index.js";

const AVAX_X_HRP = "avax";
const AVAX_X_PREFIX = "X-";

class AvaxXAddress extends Keys implements AbstractAddress<typeof DerivationPath.AVAX_X> {
  private derivationPath: string;

  public constructor(addressConfig: AddressConfig, mnemonic?: string) {
    super(addressConfig.keysConfig, mnemonic);

    this.derivationPath = addressConfig.derivationPath;
  }

  public getAddressMetadata(addressIndex: number): AddressMetadata<typeof DerivationPath.AVAX_X> {
    const path = this.getFullDerivationPath(addressIndex);
    const node = this.bip32RootKey.derivePath(path);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(node.publicKey);

    return {
      privateKey,
      publicKey,
      address,
      path,
      mnemonic: this.mnemonic,
    };
  }

  public importByPrivateKey(privateKey: string): AddressMetadata<typeof DerivationPath.AVAX_X> {
    const mnemonicResults = searchFromMnemonic<typeof DerivationPath.AVAX_X>(
      privateKey,
      this.getAddressMetadata.bind(this)
    );

    if (mnemonicResults !== null) return mnemonicResults;

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = getKeyPairFromEc(
      ExceptionMessage.AVAX_X_PRIVATE_KEY_GENERATION_FAILED,
      rawPrivateKey
    );

    const address = this.getAddress(toUint8Array(Buffer.from(publicKey, "hex")));

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: this.getFullDerivationPath(FIRST_ADDRESS_INDEX),
    };
  }

  private getAddress(publicKey: Uint8Array): string {
    const address: string = utils.formatBech32(AVAX_X_HRP, crypto.hash160(publicKey));

    return AVAX_X_PREFIX.concat(address);
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(ExceptionMessage.AVAX_X_PRIVATE_KEY_GENERATION_FAILED, rawPrivateKey);
  }

  private getFullDerivationPath(addressIndex: number): string {
    return `${this.derivationPath}/${addressIndex}`;
  }
}

export { AvaxXAddress };
