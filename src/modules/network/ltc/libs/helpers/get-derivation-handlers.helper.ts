import {
  getBtcLegacyAddress,
  getBtcNativeSegWitAddress,
  getBtcSegWitAddress,
} from "@/libs/modules/address/index.js";
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
}: GetDerivationHandlersParameters<"ltcLegacy">): GetDerivationHandlersReturnType<"ltcLegacy"> {
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
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"ltcLegacy">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"ltcLegacy">).call(
        this,
        parameters,
      );
    },
  };
}

function getSegWitDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"ltcSegWit">): GetDerivationHandlersReturnType<"ltcSegWit"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getBtcSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBtcSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"ltcSegWit">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"ltcSegWit">).call(
        this,
        parameters,
      );
    },
  };
}

function getNativeSegWitDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"ltcNativeSegWit">): GetDerivationHandlersReturnType<"ltcNativeSegWit"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getBtcNativeSegWitAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBtcNativeSegWitAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"ltcNativeSegWit">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"ltcNativeSegWit">).call(
        this,
        parameters,
      );
    },
  };
}

export {
  getLegacyDerivationHandlers,
  getSegWitDerivationHandlers,
  getNativeSegWitDerivationHandlers,
};
