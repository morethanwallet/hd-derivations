import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { getNode } from "./libs/helpers/index.js";
import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { KeyPair } from "@/libs/types/index.js";
import { AdaKeys } from "@/libs/modules/keys/index.js";

class AdaBaseKeyDerivation extends AdaKeys implements AbstractKeyDerivation<"adaBase"> {
  public deriveFromMnemonic(
    parameters: DeriveFromMnemonicParameters<"adaBase">,
  ): KeyPair<"adaBase"> {
    const rootKey = this.getRootKey();

    const enterpriseNode = getNode(rootKey, parameters.enterpriseDerivationPath);
    const rewardNode = getNode(rootKey, parameters.rewardDerivationPath);

    const { privateKey: enterprisePrivateKey, publicKey: enterprisePublicKey } =
      this.getRawKeys(enterpriseNode);

    const { privateKey: rewardPrivateKey, publicKey: rewardPublicKey } =
      this.getRawKeys(rewardNode);

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
