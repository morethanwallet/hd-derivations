import {
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
  type AbstractKeyDerivation,
  type CommonBipDerivationTypeUnion,
} from "@/keyDerivation/types/index.js";
import { type CommonKeyPair } from "@/types/keys/index.js";
import { Keys } from "@/keys/bip32/index.js";
import { type BIP32Interface } from "bip32";
import { getKeyPairFromEc } from "@/keyDerivation/helpers/index.js";
import { toUint8Array } from "@/helpers/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";

class CommonBipKeyDerivation
  extends Keys
  implements AbstractKeyDerivation<CommonBipDerivationTypeUnion>
{
  private isPrivateKeyWifFormatted: boolean;

  constructor(
    keysConfig: KeysConfig,
    mnemonic: Mnemonic,
    isPrivateKeyWifFormatted: boolean = true
  ) {
    super(keysConfig, mnemonic);

    this.isPrivateKeyWifFormatted = isPrivateKeyWifFormatted;
  }

  public deriveFromMnemonic({
    derivationPath,
    base58RootKey,
  }: DeriveFromMnemonicParameters<CommonBipDerivationTypeUnion>): CommonKeyPair {
    const rootKey = base58RootKey ? this.getRootKeyFromBase58(base58RootKey) : this.rootKey;
    const node = rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node);

    return {
      privateKey,
      publicKey,
    };
  }

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<CommonBipDerivationTypeUnion>): CommonKeyPair {
    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);

    return {
      privateKey,
      publicKey,
    };
  }

  public getKeyPair(source: BIP32Interface | string | Uint8Array): CommonKeyPair {
    return getKeyPairFromEc({
      source,
      isPrivateKeyWifFormatted: this.isPrivateKeyWifFormatted,
      keysConfig: this.keysConfig,
    });
  }
}

export { CommonBipKeyDerivation };
