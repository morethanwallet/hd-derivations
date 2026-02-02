import { hdLedger } from "@polkadot/util-crypto";

import { convertBytesKeyPairToHex } from "./libs/helpers/convert-bytes-key-pair-to-hex.helper.js";
import { importByPrivateKey } from "./libs/helpers/helpers.js";

import type {
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
  ImportByPrivateKeyParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { CommonKeyPair } from "@/libs/types/types.js";
import { type DotMnemonic } from "@/libs/modules/mnemonic/index.js";
import { Curve } from "@/libs/enums/curve.type.js";

class DotLedgerKeyDerivation implements AbstractKeyDerivation<"dotLedger"> {
  private mnemonic: DotMnemonic;

  public constructor(mnemonic: DotMnemonic) {
    this.mnemonic = mnemonic;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"dotLedger">): CommonKeyPair {
    const mnemonic = this.mnemonic.getMnemonic();
    const { publicKey, secretKey } = hdLedger(mnemonic, derivationPath);

    return convertBytesKeyPairToHex(publicKey, secretKey);
  }

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<"dotLedger">): CommonKeyPair {
    return importByPrivateKey(privateKey, Curve.ED25519);
  }
}

export { DotLedgerKeyDerivation };
