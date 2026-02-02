import { DEFAULT_SOL_BASE_ADDRESS_POSITION } from "../constants/index.js";

import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/helpers.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getSolBaseDerivationHandlers({
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
      addressPosition = DEFAULT_SOL_BASE_ADDRESS_POSITION,
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

function getSolExodusDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters["solExodus"]): GetDerivationHandlersReturnType<"solExodus"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });

      return { ...keys, address: keys.publicKey, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });

      return { ...keys, address: keys.publicKey };
    },
    deriveItemsBatchFromMnemonic({ derivationPathPrefix, indexLookupFrom, indexLookupTo }) {
      return (deriveItemsBatchFromMnemonic<"solExodus">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
      );
    },
    doesPKBelongToMnemonic(parameters) {
      return (doesPKBelongToMnemonic<"solExodus">).call(this, parameters);
    },
  };
}

export { getSolBaseDerivationHandlers, getSolExodusDerivationHandlers };
