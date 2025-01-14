import { type Mnemonic } from "@/mnemonic/index.js";
import { config } from "./config/index.js";
import { Keys } from "@/keys/bip32/index.js";
import { toUint8Array } from "@/helpers/index.js";
import { crypto } from "bitcoinjs-lib";
import { utils } from "@avalabs/avalanchejs";
import { ExceptionMessage } from "@/keyDerivation/exceptions/index.js";
import {
  type DerivedCredential,
  type DerivedItem,
  type GetCredentialFromPrivateKeyParameters,
  type AbstractNetwork,
  type CommonNetworkPurposeUnion,
  type AvaxAddressUnion,
} from "../types/index.js";
import { type DeriveItemFromMnemonicParameters } from "../types/index.js";
import { type DerivedKeyPair } from "../types/index.js";
import { getKeyPairFromEc } from "../helpers/index.js";

const Hrp: Record<Uppercase<CommonNetworkPurposeUnion>, string> = {
  MAINNET: "avax",
  TESTNET: "fuji",
} as const;

const addressTypeToPrefix: Record<AvaxAddressUnion, string> = {
  x: "X-",
  p: "P-",
};

class Avax extends Keys implements AbstractNetwork<"avax"> {
  private purpose: CommonNetworkPurposeUnion;

  public constructor(mnemonic: Mnemonic, purpose: CommonNetworkPurposeUnion) {
    super(config.keysConfig, mnemonic);

    this.purpose = purpose;
  }

  public deriveItemFromMnemonic({
    derivationPath,
    networkType,
  }: DeriveItemFromMnemonicParameters<"avax">): DerivedItem<"avax"> {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(node.publicKey, networkType);

    return {
      privateKey,
      publicKey,
      address,
      derivationPath,
    };
  }

  public getCredentialFromPrivateKey({
    privateKey,
    networkType,
  }: GetCredentialFromPrivateKeyParameters<"avax">): DerivedCredential<"avax"> {
    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);

    const address = this.getAddress(toUint8Array(Buffer.from(publicKey, "hex")), networkType);

    return {
      privateKey,
      publicKey,
      address,
    };
  }

  private getAddress(publicKey: Uint8Array, addressType: AvaxAddressUnion): string {
    const address: string = utils.formatBech32(
      this.purpose === "mainnet" ? Hrp.MAINNET : Hrp.TESTNET,
      crypto.hash160(publicKey)
    );

    return addressTypeToPrefix[addressType].concat(address);
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): DerivedKeyPair {
    return getKeyPairFromEc(
      ExceptionMessage.AVAX_PRIVATE_KEY_GENERATION_FAILED,
      this.keysConfig,
      rawPrivateKey
    );
  }
}

export { Avax };
