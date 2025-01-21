import { getTrxAddress } from "@/address/networks/index.js";
import { trxConfig } from "@/config/index.js";
import {
  checkIfPrivateKeyBelongsToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/families/helpers/index.js";
import {
  type GetItemHandlerParameters,
  type GetItemHandlerReturnType,
} from "@/families/types/index.js";

function getTrxItemHandlers({
  keysDerivationInstance,
}: GetItemHandlerParameters<"trxBase">): GetItemHandlerReturnType<"trxBase"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getTrxAddress(keys.publicKey, keysDerivationInstance.keysConfig.pubKeyHash);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getTrxAddress(keys.publicKey, keysDerivationInstance.keysConfig.pubKeyHash);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"trxBase">,
    checkIfPrivateKeyBelongsToMnemonic(parameters) {
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
