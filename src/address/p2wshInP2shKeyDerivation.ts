import { payments } from "bitcoinjs-lib";
import { assert, toUint8Array } from "@/helpers/index.js";
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

class P2wshInP2shKeyDerivation
  extends Keys
  implements AbstractKeyDerivation<typeof DerivationType.BTC_P2WSH_IN_P2SH>
{
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<typeof DerivationType.BTC_P2WSH_IN_P2SH>): DerivedItem<
    typeof DerivationType.BTC_P2WSH_IN_P2SH
  > {
    const node = this.rootKey.derivePath(derivationPath);
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
    derivationPath,
    privateKey,
  }: ImportByPrivateKeyParameters<typeof DerivationType.BTC_P2WSH_IN_P2SH>): DerivedCredential<
    typeof DerivationType.BTC_P2WSH_IN_P2SH
  > {
    // const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    // for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
    //   const incrementedDerivationPath = appendAddressToDerivationPath(
    //     derivationPathWithoutAddress,
    //     i
    //   );

    //   const data = this.derive(incrementedDerivationPath);

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
    const requiredSignatures = 1;

    const p2wshRedeem = payments.p2ms({
      m: requiredSignatures,
      pubkeys: [publicKey],
      network: this.keysConfig,
    });

    const p2shRedeem = payments.p2wsh({ redeem: p2wshRedeem, network: this.keysConfig });

    const { address } = payments.p2sh({
      redeem: p2shRedeem,
      network: this.keysConfig,
    });

    assert(address, AddressError, ExceptionMessage.P2WSH_IN_P2SH_ADDRESS_GENERATION_FAILED);

    return address;
  }

  private getKeyPair(source: BIP32Interface | string): DerivedKeyPair {
    return getKeyPairFromEc(
      ExceptionMessage.P2WSH_IN_P2SH_PRIVATE_KEY_GENERATION_FAILED,
      this.keysConfig,
      source
    );
  }
}

export { P2wshInP2shKeyDerivation };
