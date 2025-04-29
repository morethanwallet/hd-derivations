import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/index.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";
import { DEFAULT_ADDRESS_POSITION } from "../constants";

function getSolDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters["solBase"]): GetDerivationHandlersReturnType<"solBase"> {
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
    deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      addressPosition = DEFAULT_ADDRESS_POSITION,
    }) {
      return (deriveItemsBatchFromMnemonic<"solBase">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        true,
        addressPosition,
      );
    },
    doesPKBelongToMnemonic(parameters) {
      return (doesPKBelongToMnemonic<"solBase">).call(this, parameters, true);
    },
  };
}

export { getSolDerivationHandlers };
