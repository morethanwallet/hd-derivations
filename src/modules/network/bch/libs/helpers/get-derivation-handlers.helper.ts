import { getCashAddrAddress, getLegacyAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getLegacyDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"bchLegacy">): GetDerivationHandlersReturnType<"bchLegacy"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getLegacyAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getLegacyAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"bchLegacy">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"bchLegacy">).call(
        this,
        parameters,
      );
    },
  };
}

function getCashAddrDerivationHandlers({
  keysDerivationInstance,
  isRegtest,
}: GetDerivationHandlersParameters<"bchCashAddr">): GetDerivationHandlersReturnType<"bchCashAddr"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getCashAddrAddress({
        publicKey: keys.publicKey,
        prefixConfig: keysDerivationInstance.prefixConfig,
        isRegtest,
      });

      return { ...keys, address, derivationPath: parameters.derivationPath };
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
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"bchCashAddr">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"bchCashAddr">).call(
        this,
        parameters,
      );
    },
  };
}

export { getLegacyDerivationHandlers, getCashAddrDerivationHandlers };
