import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/index.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getSolDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"solBase">): GetDerivationHandlersReturnType<"solBase"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      validateDerivationPath(derivationPath, true);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });

      return { ...keys, address: keys.publicKey, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });

      return { ...keys, address: keys.publicKey };
    },
    deriveItemsBatchFromMnemonic(parameters) {
      return (deriveItemsBatchFromMnemonic<"solBase">).call(this, parameters, true);
    },
    doesPKBelongToMnemonic(parameters) {
      return (doesPKBelongToMnemonic<"solBase">).call(this, parameters, true);
    },
  };
}

export { getSolDerivationHandlers };
