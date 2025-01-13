import { payments } from "bitcoinjs-lib";
import { toCashAddress } from "bchaddrjs";
import { ExceptionMessage, AddressError } from "./exceptions/index.js";
import { assert, toUint8Array } from "@/helpers/index.js";
import { getKeyPairFromEc } from "./helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type BIP32Interface } from "bip32";
import { config } from "@/families/bitcoin-cash/index.js";
import {
  AbstractKeyDerivation,
  DerivedCredential,
  DerivedItem,
  DerivedKeyPair,
  DeriveFromMnemonicParameters,
  ImportByPrivateKeyParameters,
} from "./types/index.js";
import { DerivationType } from "./enums/index.js";
import { KeysConfig } from "@/keys/types/index.js";
import { Keys } from "@/keys/bip32/index.js";

const REGTEST_PREFIX = "bchreg";
const HRP_DELIMITER = ":";
const ADDRESS_INDEX = 1;

class CashAddrKeyDerivation
  extends Keys
  implements AbstractKeyDerivation<typeof DerivationType.BCH_CASH_ADDR>
{
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<typeof DerivationType.BCH_CASH_ADDR>): DerivedItem<
    typeof DerivationType.BCH_CASH_ADDR
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
    privateKey,
  }: ImportByPrivateKeyParameters<typeof DerivationType.BCH_CASH_ADDR>): DerivedCredential<
    typeof DerivationType.BCH_CASH_ADDR
  > {
    // const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    // for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
    //   const incrementedDerivationPath = appendAddressToDerivationPath(
    //     derivationPathWithoutAddress,
    //     i
    //   );

    //   const data = this.deriveFromMnemonic(incrementedDerivationPath);

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
    const { address } = payments.p2pkh({ network: this.keysConfig, pubkey: publicKey });
    assert(address, AddressError, ExceptionMessage.CASH_ADDR_ADDRESS_GENERATION_FAILED);

    const formattedAddress = toCashAddress(address);

    if (this.keysConfig.bech32 === config.regtest.cashAddr.keysConfig.bech32) {
      return REGTEST_PREFIX.concat(
        HRP_DELIMITER,
        String(formattedAddress.split(HRP_DELIMITER)[ADDRESS_INDEX])
      );
    }

    return formattedAddress;
  }

  private getKeyPair(source: BIP32Interface | string): DerivedKeyPair {
    return getKeyPairFromEc(
      ExceptionMessage.CASH_ADDR_PRIVATE_KEY_GENERATION_FAILED,
      this.keysConfig,
      source
    );
  }
}

export { CashAddrKeyDerivation };
