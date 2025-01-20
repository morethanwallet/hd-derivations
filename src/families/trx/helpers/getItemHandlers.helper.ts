import { getTrxAddress } from "@/address/networks/index.js";
import { trxConfig } from "@/config/index.js";
import { checkIfPrivateKeyBelongsToMnemonic } from "@/families/helpers/index.js";
import { deriveItemsBatchFromMnemonic } from "@/families/helpers/index.js";
import {
  type GetItemHandlerParameters,
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
  type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters,
} from "@/families/types/index.js";
import { type DerivedCredential, type DerivedItem } from "@/types/index.js";

function getTrxItemHandlers({ keysDerivationInstance }: GetItemHandlerParameters<"trxBase">) {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"trxBase">
    ): DerivedItem<"trxBase"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getTrxAddress(keys.publicKey, keysDerivationInstance.keysConfig.pubKeyHash);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"trxBase">
    ): DerivedCredential<"trxBase"> => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getTrxAddress(keys.publicKey, keysDerivationInstance.keysConfig.pubKeyHash);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"trxBase">,
    checkIfPrivateKeyBelongsToMnemonic(
      parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<"trxBase">
    ): boolean {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"trxBase">).call(
        this,
        trxConfig.trxBase.derivationPathPrefix,
        parameters
      );
    },
  };
}

export { getTrxItemHandlers };
