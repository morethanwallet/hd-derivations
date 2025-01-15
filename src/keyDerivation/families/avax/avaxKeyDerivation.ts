import { toUint8Array } from "@/helpers/index.js";
import { type Mnemonic } from "@/mnemonic/index.js";
import { type KeysConfig } from "@/keys/types/index.js";
import { CommonKeyDerivation } from "@/keyDerivation/families/common/index.js";
import {
  type CommonKeyPair,
  type ImportByPrivateKeyParameters,
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/keyDerivation/types/index.js";
import { type AvaxDerivationTypeUnion } from "@/types/index.js";

class AvaxKeyDerivation implements AbstractKeyDerivation<AvaxDerivationTypeUnion> {
  commonKeyDerivation: CommonKeyDerivation;

  public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
    this.commonKeyDerivation = new CommonKeyDerivation(keysConfig, mnemonic);
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<AvaxDerivationTypeUnion>): CommonKeyPair {
    return this.commonKeyDerivation.deriveFromMnemonic({ derivationPath });
  }

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<AvaxDerivationTypeUnion>): CommonKeyPair {
    const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
    const { publicKey } = this.commonKeyDerivation.getKeyPair(rawPrivateKey);

    return {
      privateKey,
      publicKey,
    };
  }
}

export { AvaxKeyDerivation };
