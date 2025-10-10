import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";
import { getNode, getNodeRawKeys, getRootKey } from "./libs/helpers/helpers.js";
import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { GetDerivationTypeUnion, KeyPair } from "@/libs/types/types.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";

class AdaCommonKeyDerivation
  implements AbstractKeyDerivation<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">>
{
  private readonly mnemonic: Mnemonic;

  public constructor(mnemonic: Mnemonic) {
    this.mnemonic = mnemonic;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">>): KeyPair<
    GetDerivationTypeUnion<"adaEnterprise" | "adaReward">
  > {
    const entropy = this.mnemonic.getEntropy();
    const rootKey = getRootKey(entropy);

    const node = getNode(rootKey, derivationPath);
    const { privateKey, publicKey } = getNodeRawKeys(node);

    return {
      privateKey: privateKey.to_hex(),
      publicKey: publicKey.to_hex(),
    };
  }

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">>):
    | KeyPair<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">>
    | never {
    const rawPublicKey = PrivateKey.from_hex(privateKey).to_public();

    return {
      privateKey,
      publicKey: rawPublicKey.to_hex(),
    };
  }
}

export { AdaCommonKeyDerivation };
