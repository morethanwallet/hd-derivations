import { payments } from "bitcoinjs-lib";
import { assert, toHexFromBytes, toUint8Array } from "@/helpers/index.js";
import { ExceptionMessage, AddressError } from "./exceptions/index.js";
import { getKeyPairFromEc } from "./helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type BIP32Interface } from "bip32";
import {
  type AbstractKeyDerivation,
  type DerivedCredential,
  type DerivedItem,
  type DerivedKeyPair,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
} from "./types/index.js";
import { type DerivationType } from "./enums/index.js";
import { Keys } from "@/keys/bip32/index.js";
import { type KeysConfig } from "@/keys/types/index.js";

const PUBLIC_KEY_PREFIX_END_INDEX = 1;
const X_ONLY_PUBLIC_KEY_LENGTH = 32;
const X_Y_PUBLIC_KEY_LENGTH = 33;

class TaprootKeyDerivation
  extends Keys
  implements AbstractKeyDerivation<typeof DerivationType.BTC_TAPROOT>
{
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
    base58RootKey,
  }: DeriveFromMnemonicParameters<typeof DerivationType.BTC_TAPROOT>): DerivedItem<
    typeof DerivationType.BTC_TAPROOT
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
  }: ImportByPrivateKeyParameters<typeof DerivationType.BTC_TAPROOT>): DerivedCredential<
    typeof DerivationType.BTC_TAPROOT
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
    const xOnlyPublicKey = this.toXOnlyPublicKey(publicKey);
    const { address } = payments.p2tr({ internalPubkey: xOnlyPublicKey, network: this.keysConfig });
    assert(address, AddressError, ExceptionMessage.TAPROOT_ADDRESS_GENERATION_FAILED);

    return address;
  }

  private getKeyPair(source: BIP32Interface | string): DerivedKeyPair {
    const keyPair = getKeyPairFromEc(
      ExceptionMessage.TAPROOT_PRIVATE_KEY_GENERATION_FAILED,
      this.keysConfig,
      source
    );

    const publicKey = toHexFromBytes(
      this.toXOnlyPublicKey(toUint8Array(Buffer.from(keyPair.publicKey, "hex")))
    );

    return { privateKey: keyPair.privateKey, publicKey };
  }

  private toXOnlyPublicKey(publicKey: Uint8Array): Uint8Array {
    return publicKey.length === X_ONLY_PUBLIC_KEY_LENGTH
      ? publicKey
      : publicKey.slice(PUBLIC_KEY_PREFIX_END_INDEX, X_Y_PUBLIC_KEY_LENGTH);
  }
}

export { TaprootKeyDerivation };
