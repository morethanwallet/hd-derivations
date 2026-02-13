import {
  getNode,
  getKeyPairFromNode,
  getRootKey,
  importAdaBaseKeyPairByPrivateKey,
} from "./libs/helpers/helpers.js";

import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { KeyPair } from "@/libs/types/types.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/mnemonic.js";

class AdaBaseKeyDerivation implements AbstractKeyDerivation<"adaBase"> {
  private readonly mnemonic: Mnemonic;

  public constructor(mnemonic: Mnemonic) {
    this.mnemonic = mnemonic;
  }

  public async deriveFromMnemonic(
    parameters: DeriveFromMnemonicParameters<"adaBase">,
  ): Promise<KeyPair<"adaBase">> {
    const rootKey = await getRootKey(this.mnemonic);

    const enterpriseNode = getNode(rootKey, parameters.enterpriseDerivationPath);
    const rewardNode = getNode(rootKey, parameters.rewardDerivationPath);

    const { privateKey: enterprisePrivateKey, publicKey: enterprisePublicKey } =
      getKeyPairFromNode(enterpriseNode);

    const { privateKey: rewardPrivateKey, publicKey: rewardPublicKey } =
      getKeyPairFromNode(rewardNode);

    return { enterprisePrivateKey, enterprisePublicKey, rewardPrivateKey, rewardPublicKey };
  }

  public importByPrivateKey(
    parameters: ImportByPrivateKeyParameters<"adaBase">,
  ): KeyPair<"adaBase"> {
    return importAdaBaseKeyPairByPrivateKey(
      parameters.enterprisePrivateKey,
      parameters.rewardPrivateKey,
    );
  }
}

export { AdaBaseKeyDerivation };
