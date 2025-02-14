import { getCashAddrAddress, getBtcLegacyAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/index.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getLegacyDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"bchLegacy">): GetDerivationHandlersReturnType<"bchLegacy"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
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
    deriveItemsBatchFromMnemonic({ derivationPathPrefix, indexLookupFrom, indexLookupTo }) {
      return (deriveItemsBatchFromMnemonic<"bchLegacy">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"bchLegacy">,
  };
}

function getCashAddrDerivationHandlers({
  keysDerivationInstance,
  isRegtest,
}: GetDerivationHandlersParameters<"bchCashAddr">): GetDerivationHandlersReturnType<"bchCashAddr"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
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
    deriveItemsBatchFromMnemonic({ derivationPathPrefix, indexLookupFrom, indexLookupTo }) {
      return (deriveItemsBatchFromMnemonic<"bchCashAddr">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"bchCashAddr">,
  };
}

export { getLegacyDerivationHandlers, getCashAddrDerivationHandlers };
