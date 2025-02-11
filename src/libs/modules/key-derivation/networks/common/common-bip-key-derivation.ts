import {
  type DeriveFromMnemonicParameters,
  type AbstractKeyDerivation,
  type CommonBipDerivationTypeUnion,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/index.js";
import { type PrefixConfig, Bip32Keys } from "@/libs/modules/keys/index.js";
import { type BIP32Interface } from "bip32";
import { getKeyPairFromEc } from "@/libs/modules/key-derivation/libs/helpers/index.js";
import { toUint8Array } from "@/libs/helpers/index.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";

class CommonBipKeyDerivation
  extends Bip32Keys
  implements AbstractKeyDerivation<CommonBipDerivationTypeUnion>
{
  private isPrivateKeyWifFormatted: boolean;

  public constructor(
    prefixConfig: PrefixConfig,
    mnemonic: Mnemonic,
    isPrivateKeyWifFormatted: boolean = true,
  ) {
    super(prefixConfig, mnemonic);

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
  }: PrivateKey<CommonBipDerivationTypeUnion>): CommonKeyPair {
    const wifKeyLength = 52;

    const formattedKey =
      privateKey.length === wifKeyLength
        ? privateKey
        : toUint8Array(Buffer.from(privateKey, "hex"));

    const { publicKey } = this.getKeyPair(formattedKey);

    return {
      privateKey,
      publicKey,
    };
  }

  public getKeyPair(source: BIP32Interface | string | Uint8Array): CommonKeyPair {
    return getKeyPairFromEc({
      source,
      isPrivateKeyWifFormatted: this.isPrivateKeyWifFormatted,
      prefixConfig: this.prefixConfig,
    });
  }
}

export { CommonBipKeyDerivation };
