import { toUint8Array } from "@/helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import {
  type AbstractKeyDerivation,
  type CommonKeyPair,
  type DeriveFromMnemonicParameters,
  type ImportByPrivateKeyParameters,
} from "@/keyDerivation/types/index.js";
import { type XrpDerivationTypeUnion } from "@/types/index.js";
import { CommonKeyDerivation } from "@/keyDerivation/families/common/index.js";

class XrpKeyDerivation implements AbstractKeyDerivation<XrpDerivationTypeUnion> {
  commonKeyDerivation: CommonKeyDerivation;

  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    this.commonKeyDerivation = new CommonKeyDerivation(keysConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<XrpDerivationTypeUnion>): CommonKeyPair {
    return this.commonKeyDerivation.deriveFromMnemonic({ derivationPath });
  }

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<XrpDerivationTypeUnion>): CommonKeyPair {
    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.commonKeyDerivation.getKeyPair(rawPrivateKey);

    return {
      privateKey,
      publicKey,
    };
  }
}

export { XrpKeyDerivation };
