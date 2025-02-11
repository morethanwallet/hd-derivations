import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { getNode } from "./libs/helpers/index.js";
import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { AdaDerivationTypeUnion, KeyPair } from "@/libs/types/index.js";
import { AdaKeys } from "@/libs/modules/keys/index.js";
import { KeyDerivationError } from "../../libs/exceptions/index.js";
import { ExceptionMessage as CommonExceptionMessage } from "@/libs/enums/index.js";
import { ExceptionMessage } from "../../libs/enums/index.js";

class AdaKeyDerivation extends AdaKeys implements AbstractKeyDerivation<AdaDerivationTypeUnion> {
  public constructor(mnemonic: Mnemonic) {
    super(mnemonic);
  }

  public deriveFromMnemonic(
    parameters: DeriveFromMnemonicParameters<AdaDerivationTypeUnion>,
  ): KeyPair<AdaDerivationTypeUnion> | never {
    const rootKey = this.getRootKey();

    if ("derivationPath" in parameters) {
      const node = getNode(rootKey, parameters.derivationPath);
      const { privateKey, publicKey } = this.getRawKeys(node);

      return {
        privateKey: privateKey.to_hex(),
        publicKey: publicKey.to_hex(),
      };
    }

    if ("enterpriseDerivationPath" in parameters && "rewardDerivationPath" in parameters) {
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

    throw new KeyDerivationError(CommonExceptionMessage.INVALID_DERIVATION_PATH);
  }

  public importByPrivateKey(
    parameters: ImportByPrivateKeyParameters<AdaDerivationTypeUnion>,
  ): KeyPair<AdaDerivationTypeUnion> | never {
    if ("privateKey" in parameters) {
      const rawPublicKey = PrivateKey.from_hex(parameters.privateKey).to_public();

      return {
        privateKey: parameters.privateKey,
        publicKey: rawPublicKey.to_hex(),
      };
    }

    if ("enterprisePrivateKey" in parameters && "rewardPrivateKey" in parameters) {
      const rawEnterprisePublicKey = PrivateKey.from_hex(
        parameters.enterprisePrivateKey,
      ).to_public();

      const rawRewardPublicKey = PrivateKey.from_hex(parameters.rewardPrivateKey).to_public();

      return {
        enterprisePrivateKey: parameters.enterprisePrivateKey,
        enterprisePublicKey: rawEnterprisePublicKey.to_hex(),
        rewardPrivateKey: parameters.rewardPrivateKey,
        rewardPublicKey: rawRewardPublicKey.to_hex(),
      };
    }

    throw new KeyDerivationError(ExceptionMessage.INVALID_PRIVATE_KEY);
  }
}

export { AdaKeyDerivation };
