import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { getNode } from "./libs/helpers/index.js";
import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { GetDerivationTypeUnion, KeyPair } from "@/libs/types/index.js";
import { AdaKeys } from "@/libs/modules/keys/index.js";

class AdaCommonKeyDerivation
  extends AdaKeys
  implements AbstractKeyDerivation<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">>
{
  public deriveFromMnemonic(
    parameters: DeriveFromMnemonicParameters<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">>,
  ): KeyPair<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">> {
    const rootKey = this.getRootKey();

    const node = getNode(rootKey, parameters.derivationPath);
    const { privateKey, publicKey } = this.getRawKeys(node);

    return {
      privateKey: privateKey.to_hex(),
      publicKey: publicKey.to_hex(),
    };
  }

  public importByPrivateKey(
    parameters: ImportByPrivateKeyParameters<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">>,
  ): KeyPair<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">> | never {
    const rawPublicKey = PrivateKey.from_hex(parameters.privateKey).to_public();

    return {
      privateKey: parameters.privateKey,
      publicKey: rawPublicKey.to_hex(),
    };
  }
}

export { AdaCommonKeyDerivation };
