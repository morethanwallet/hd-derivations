import { payments } from "bitcoinjs-lib";
import { assert, toUint8Array } from "@/helpers/index.js";
import { ExceptionMessage, AddressError } from "./exceptions/index.js";
import { getKeyPairFromEc } from "./helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type BIP32Interface } from "bip32";
import {
  type DerivedKeyPair,
  type AbstractKeyDerivation,
  type DerivedCredential,
  type DerivedItem,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
} from "./types/index.js";
import { type DerivationType } from "./enums/index.js";
import { Keys } from "@/keys/bip32/index.js";
import { type KeysConfig } from "@/keys/types/index.js";

class P2wpkhKeyDerivation
  extends Keys
  implements AbstractKeyDerivation<typeof DerivationType.BTC_NATIVE_SEG_WIT>
{
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
    base58RootKey,
  }: DeriveFromMnemonicParameters<typeof DerivationType.BTC_NATIVE_SEG_WIT>): DerivedItem<
    typeof DerivationType.BTC_NATIVE_SEG_WIT
  > {
    const rootKey = base58RootKey ? this.getRootKeyFromBase58(base58RootKey) : this.rootKey;
    const node = rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node);
    const address = this.getAddress(node.publicKey);

    return {
      privateKey,
      publicKey,
      address,
      derivationPath,
    };
  }

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<typeof DerivationType.BTC_NATIVE_SEG_WIT>): DerivedCredential<
    typeof DerivationType.BTC_NATIVE_SEG_WIT
  > {
    // const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    // for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
    //   const incrementedDerivationPath = appendAddressToDerivationPath(
    //     derivationPathWithoutAddress,
    //     i
    //   );

    //   const data = this.derive(incrementedDerivationPath, base58RootKey);

    //   if (data.privateKey === privateKey) return data;
    // }

    const { publicKey } = this.getKeyPair(privateKey);
    const address = this.getAddress(toUint8Array(Buffer.from(publicKey, "hex")));

    return {
      privateKey,
      publicKey,
      address,
    };
  }

  private getAddress(publicKey: Uint8Array): string {
    const { address } = payments.p2wpkh({ network: this.keysConfig, pubkey: publicKey });
    assert(address, AddressError, ExceptionMessage.P2WPKH_ADDRESS_GENERATION_FAILED);

    return address;
  }

  private getKeyPair(source: BIP32Interface | string): DerivedKeyPair {
    return getKeyPairFromEc(
      ExceptionMessage.P2WPKH_PRIVATE_KEY_GENERATION_FAILED,
      this.keysConfig,
      source
    );
  }
}

export { P2wpkhKeyDerivation };
