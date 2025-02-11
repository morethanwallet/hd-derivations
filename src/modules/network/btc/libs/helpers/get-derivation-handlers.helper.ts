import {
  getBtcLegacyAddress,
  getBtcNativeSegWitAddress,
  getP2wshAddress,
  getP2wshInP2shAddress,
  getBtcSegWitAddress,
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
      const address = getBtcLegacyAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBtcLegacyAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

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
}: GetDerivationHandlersParameters<"btcSegWit">): GetDerivationHandlersReturnType<"btcSegWit"> {
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
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"btcSegWit">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"btcSegWit">).call(
        this,
        parameters,
      );
    },
  };
}

function getNativeSegWitDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"btcNativeSegWit">): GetDerivationHandlersReturnType<"btcNativeSegWit"> {
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
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"btcNativeSegWit">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"btcNativeSegWit">).call(
        this,
        parameters,
      );
    },
  };
}

function getTaprootDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"btcTaproot">): GetDerivationHandlersReturnType<"btcTaproot"> {
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
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"btcTaproot">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"btcTaproot">).call(
        this,
        parameters,
      );
    },
  };
}

function getP2wshDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"btcP2wsh">): GetDerivationHandlersReturnType<"btcP2wsh"> {
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
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"btcP2wsh">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"btcP2wsh">).call(
        this,
        parameters,
      );
    },
  };
}

function getP2wshInP2shDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"btcP2wshInP2sh">): GetDerivationHandlersReturnType<"btcP2wshInP2sh"> {
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
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"btcP2wshInP2sh">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"btcP2wshInP2sh">).call(
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
