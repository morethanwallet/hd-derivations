import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { getNode } from "./libs/helpers/index.js";
import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { AdaBaseKeyPair, DerivationTypeMap, KeyPair } from "@/libs/types/index.js";
import { AdaKeys } from "@/libs/modules/keys/index.js";

class AdaBaseKeyDerivation
  extends AdaKeys
  implements AbstractKeyDerivation<DerivationTypeMap["adaBase"]>
{
  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);
  }

  public deriveFromMnemonic(
    parameters: DeriveFromMnemonicParameters<DerivationTypeMap["adaBase"]>,
  ): AdaBaseKeyPair {
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
    parameters: ImportByPrivateKeyParameters<DerivationTypeMap["adaBase"]>,
  ): KeyPair<DerivationTypeMap["adaBase"]> {
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

type AdaCommonDerivationTypeUnion =
  | DerivationTypeMap["adaEnterprise"]
  | DerivationTypeMap["adaReward"];

class AdaCommonKeyDerivation
  extends AdaKeys
  implements AbstractKeyDerivation<AdaCommonDerivationTypeUnion>
{
  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);
  }

  public deriveFromMnemonic(
    parameters: DeriveFromMnemonicParameters<AdaCommonDerivationTypeUnion>,
  ): KeyPair<AdaCommonDerivationTypeUnion> {
    const rootKey = this.getRootKey();

    const node = getNode(rootKey, parameters.derivationPath);
    const { privateKey, publicKey } = this.getRawKeys(node);

    return {
      privateKey: privateKey.to_hex(),
      publicKey: publicKey.to_hex(),
    };
  }

  public importByPrivateKey(
    parameters: ImportByPrivateKeyParameters<AdaCommonDerivationTypeUnion>,
  ): KeyPair<AdaCommonDerivationTypeUnion> | never {
    const rawPublicKey = PrivateKey.from_hex(parameters.privateKey).to_public();

    return {
      privateKey: parameters.privateKey,
      publicKey: rawPublicKey.to_hex(),
    };
  }
}

export { AdaBaseKeyDerivation, AdaCommonKeyDerivation };
