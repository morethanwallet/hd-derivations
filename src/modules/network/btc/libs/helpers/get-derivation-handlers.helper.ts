import {
  getLegacyAddress,
  getNativeSegWitAddress,
  getP2wshAddress,
  getP2wshInP2shAddress,
  getSegWitAddress,
  getTaprootAddress,
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
}: GetDerivationHandlersParameters<"btcLegacy">): GetDerivationHandlersReturnType<"btcLegacy"> {
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
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"btcLegacy">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"btcLegacy">).call(
        this,
        parameters,
      );
    },
  };
}

function getSegWitDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"segWit">): GetDerivationHandlersReturnType<"segWit"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"segWit">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"segWit">).call(
        this,
        parameters,
      );
    },
  };
}

function getNativeSegWitDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"nativeSegWit">): GetDerivationHandlersReturnType<"nativeSegWit"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getNativeSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getNativeSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"nativeSegWit">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"nativeSegWit">).call(
        this,
        parameters,
      );
    },
  };
}

function getTaprootDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"taproot">): GetDerivationHandlersReturnType<"taproot"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getTaprootAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getTaprootAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"taproot">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"taproot">).call(
        this,
        parameters,
      );
    },
  };
}

function getP2wshDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"p2wsh">): GetDerivationHandlersReturnType<"p2wsh"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getP2wshAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getP2wshAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"p2wsh">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"p2wsh">).call(
        this,
        parameters,
      );
    },
  };
}

function getP2wshInP2shDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"p2wshInP2sh">): GetDerivationHandlersReturnType<"p2wshInP2sh"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getP2wshInP2shAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getP2wshInP2shAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"p2wshInP2sh">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"p2wshInP2sh">).call(
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
  getTaprootDerivationHandlers,
  getP2wshDerivationHandlers,
  getP2wshInP2shDerivationHandlers,
};
