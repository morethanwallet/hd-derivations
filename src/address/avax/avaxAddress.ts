import { utils } from "@avalabs/avalanchejs";
import { crypto } from "bitcoinjs-lib";
import { toUint8Array } from "@/helpers/index.js";
import { type AddressData, type KeyPair, type KeysConfig } from "../types/index.js";
import { ExceptionMessage } from "@/exceptions/index.js";
import {
  appendAddressToDerivationPath,
  getKeyPairFromEc,
  removeDerivationPathAddress,
} from "../helpers/index.js";
import { EMPTY_MNEMONIC, SEARCH_FROM_MNEMONIC_LIMIT } from "../constants/index.js";
import { Keys } from "../common/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type AbstractAddress } from "./types/index.js";
import { type NetworkType, type NetworkPurpose } from "@/network/avax/index.js";

const Prefix: Record<NetworkType, string> = {
  X: "X-",
  P: "P-",
} as const;

const Hrp: Record<Uppercase<NetworkPurpose>, string> = {
  MAINNET: "avax",
  TESTNET: "fuji",
} as const;

class AvaxAddress extends Keys implements AbstractAddress {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public getData(
    derivationPath: string,
    networkType: NetworkType,
    networkPurpose: NetworkPurpose
  ): AddressData {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(node.publicKey, networkType, networkPurpose);

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
    privateKey: KeyPair["privateKey"],
    networkType: NetworkType,
    networkPurpose: NetworkPurpose
  ): AddressData {
    const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const incrementedDerivationPath = appendAddressToDerivationPath(
        derivationPathWithoutAddress,
        i
      );

      const data = this.getData(incrementedDerivationPath, networkType, networkPurpose);

      if (data.privateKey === privateKey) return data;
    }

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = getKeyPairFromEc(
      ExceptionMessage.AVAX_PRIVATE_KEY_GENERATION_FAILED,
      rawPrivateKey
    );

    const address = this.getAddress(
      toUint8Array(Buffer.from(publicKey, "hex")),
      networkType,
      networkPurpose
    );

    return {
      privateKey,
      publicKey,
      address,
      mnemonic: EMPTY_MNEMONIC,
      path: derivationPath,
    };
  }

  private getAddress(
    publicKey: Uint8Array,
    networkType: NetworkType,
    networkPurpose: NetworkPurpose
  ): string {
    const address: string = utils.formatBech32(
      networkPurpose === "mainnet" ? Hrp.MAINNET : Hrp.TESTNET,
      crypto.hash160(publicKey)
    );

    return Prefix[networkType].concat(address);
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): KeyPair {
    return getKeyPairFromEc(ExceptionMessage.AVAX_PRIVATE_KEY_GENERATION_FAILED, rawPrivateKey);
  }
}

export { AvaxAddress };
