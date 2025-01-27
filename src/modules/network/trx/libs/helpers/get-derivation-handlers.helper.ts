import { getTrxAddress } from "@/modules/address/index.js";
import {
  checkIfPrivateKeyBelongsToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import { trxConfig } from "@/modules/network/libs/modules/config/index.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getTrxDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"trxBase">): GetDerivationHandlersReturnType<"trxBase"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getTrxAddress(keys.publicKey, keysDerivationInstance.prefixConfig.pubKeyHash);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getTrxAddress(keys.publicKey, keysDerivationInstance.prefixConfig.pubKeyHash);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"trxBase">,
    checkIfPrivateKeyBelongsToMnemonic(parameters) {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"trxBase">).call(
        this,
        parameters,
        trxConfig.trxBase.derivationPathPrefix,
      );
    },
  };
}

export { getTrxDerivationHandlers };
