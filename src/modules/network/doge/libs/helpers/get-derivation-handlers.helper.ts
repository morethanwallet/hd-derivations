import { getBtcLegacyAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

// TODO: Remove duplication of similar deriveItemFromMnemonic functions
function getLegacyDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"dogeLegacy">): GetDerivationHandlersReturnType<"dogeLegacy"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getBtcLegacyAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBtcLegacyAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"dogeLegacy">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"dogeLegacy">).call(
        this,
        parameters,
      );
    },
  };
}

export { getLegacyDerivationHandlers };
