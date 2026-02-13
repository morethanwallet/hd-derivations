import { PrivateKey } from "@stricahq/bip32ed25519";

import { getNode, getKeyPairFromNode, getRootKey } from "./libs/helpers/helpers.js";

import type {
  ImportByPrivateKeyParameters,
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { GetDerivationTypeUnion, KeyPair } from "@/libs/types/types.js";
import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import { convertBytesToHex, convertHexToBytes } from "@/libs/utils/utils.js";

class AdaCommonKeyDerivation implements AbstractKeyDerivation<
  GetDerivationTypeUnion<"adaEnterprise" | "adaReward">
> {
  private readonly mnemonic: Mnemonic;

  public constructor(mnemonic: Mnemonic) {
    this.mnemonic = mnemonic;
  }

  public async deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">>): Promise<
    KeyPair<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">>
  > {
    const rootKey = await getRootKey(this.mnemonic);

    const node = getNode(rootKey, derivationPath);
    const { privateKey, publicKey } = getKeyPairFromNode(node);

    return { privateKey, publicKey };
  }

  public importByPrivateKey({
    privateKey,
  }: ImportByPrivateKeyParameters<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">>):
    | KeyPair<GetDerivationTypeUnion<"adaEnterprise" | "adaReward">>
    | never {
    const privateKeyInstance = new PrivateKey(Buffer.from(convertHexToBytes(privateKey)));
    const publicKeyInstance = privateKeyInstance.toPublicKey();
    const publicKey = convertBytesToHex(publicKeyInstance.toBytes());

    return { privateKey, publicKey };
  }
}

export { AdaCommonKeyDerivation };
