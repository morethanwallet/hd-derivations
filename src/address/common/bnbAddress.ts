import { ecPair, type ECPairInterface } from "@/ecc/index.js";
import {
  getPublicKeyFromPrivateKey,
  getAddressFromPrivateKey,
} from "@binance-chain/javascript-sdk/lib/crypto";
import { assert, toHexFromBytes, toUint8Array } from "@/helpers/index.js";
import { ExceptionMessage, AddressError } from "../exceptions/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { Keys } from "@/keys/bip32/index.js";
import {
  AbstractKeyDerivation,
  DerivedCredential,
  DerivedItem,
  DerivedKeyPair,
  DeriveFromMnemonicParameters,
  ImportByPrivateKeyParameters,
} from "../types/index.js";
import { DerivationType } from "../enums/derivationType.enum.js";
import { KeysConfig } from "@/keys/types/index.js";

const HRP = "bnb";

class BnbAddress extends Keys implements AbstractKeyDerivation<typeof DerivationType.BNB> {
  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    super(keysConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<typeof DerivationType.BNB>): DerivedItem<
    typeof DerivationType.BNB
  > {
    const node = this.rootKey.derivePath(derivationPath);
    const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
    const address = this.getAddress(privateKey);

    return {
      privateKey,
      publicKey,
      address,
      derivationPath,
    };
  }

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<typeof DerivationType.BNB>): DerivedCredential<
    typeof DerivationType.BNB
  > {
    // const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

    // for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
    //   const incrementedDerivationPath = appendAddressToDerivationPath(
    //     derivationPathWithoutAddress,
    //     i
    //   );

    //   const data = this.derive({ derivationPath: incrementedDerivationPath });

    //   if (data.privateKey === privateKey) return data;
    // }

    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.getKeyPair(rawPrivateKey);
    const address = this.getAddress(privateKey);

    return {
      privateKey,
      publicKey,
      address,
    };
  }

  private getAddress(privateKey: DerivedKeyPair["privateKey"]): string {
    return getAddressFromPrivateKey(privateKey, HRP);
  }

  private getKeyPair(rawPrivateKey?: Uint8Array): DerivedKeyPair {
    assert(rawPrivateKey, AddressError, ExceptionMessage.BNB_PRIVATE_KEY_GENERATION_FAILED);
    const keyPair: ECPairInterface = ecPair.fromPrivateKey(rawPrivateKey);
    const privateKey = toHexFromBytes(keyPair.privateKey);
    const publicKey = getPublicKeyFromPrivateKey(privateKey);

    return { privateKey, publicKey };
  }
}

export { BnbAddress };
