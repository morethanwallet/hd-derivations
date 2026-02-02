import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

import { getNode, getNodeRawKeys, getRootKey } from "./libs/helpers/helpers.js";

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

  public deriveFromMnemonic(
    parameters: DeriveFromMnemonicParameters<"adaBase">,
  ): KeyPair<"adaBase"> {
    const entropy = this.mnemonic.getEntropy();
    const rootKey = getRootKey(entropy);

    const enterpriseNode = getNode(rootKey, parameters.enterpriseDerivationPath);
    const rewardNode = getNode(rootKey, parameters.rewardDerivationPath);

    const { privateKey: enterprisePrivateKey, publicKey: enterprisePublicKey } =
      getNodeRawKeys(enterpriseNode);

    const { privateKey: rewardPrivateKey, publicKey: rewardPublicKey } = getNodeRawKeys(rewardNode);

    return {
      enterprisePrivateKey: enterprisePrivateKey.to_hex(),
      enterprisePublicKey: enterprisePublicKey.to_hex(),
      rewardPrivateKey: rewardPrivateKey.to_hex(),
      rewardPublicKey: rewardPublicKey.to_hex(),
    };
  }

  public importByPrivateKey(
    parameters: ImportByPrivateKeyParameters<"adaBase">,
  ): KeyPair<"adaBase"> {
    const rawEnterprisePublicKey = PrivateKey.from_hex(parameters.enterprisePrivateKey).to_public();

    const rawRewardPublicKey = PrivateKey.from_hex(parameters.rewardPrivateKey).to_public();

    return {
      enterprisePrivateKey: parameters.enterprisePrivateKey,
      enterprisePublicKey: rawEnterprisePublicKey.to_hex(),
      rewardPrivateKey: parameters.rewardPrivateKey,
      rewardPublicKey: rawRewardPublicKey.to_hex(),
    };
  }
}

export { AdaBaseKeyDerivation };
