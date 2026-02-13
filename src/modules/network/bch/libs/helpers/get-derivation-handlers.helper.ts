import { getCashAddrAddress, getBtcLegacyAddress } from "@/libs/modules/address/address.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/helpers.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getLegacyDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters["bchLegacy"]): GetDerivationHandlersReturnType<"bchLegacy"> {
  return {
    deriveItemFromMnemonic: async ({ derivationPath }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getBtcLegacyAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBtcLegacyAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    async deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
    }) {
      return await (deriveItemsBatchFromMnemonic<"bchLegacy">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"bchLegacy">,
  };
}

function getCashAddrDerivationHandlers({
  keysDerivationInstance,
  isRegtest,
}: GetDerivationHandlersParameters["bchCashAddr"]): GetDerivationHandlersReturnType<"bchCashAddr"> {
  return {
    deriveItemFromMnemonic: async ({ derivationPath }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getCashAddrAddress({
        publicKey: keys.publicKey,
        prefixConfig: keysDerivationInstance.prefixConfig,
        isRegtest,
      });

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getCashAddrAddress({
        publicKey: keys.publicKey,
        prefixConfig: keysDerivationInstance.prefixConfig,
        isRegtest,
      });

      return { ...keys, address };
    },
    async deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
    }) {
      return await (deriveItemsBatchFromMnemonic<"bchCashAddr">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"bchCashAddr">,
  };
}

export { getLegacyDerivationHandlers, getCashAddrDerivationHandlers };
