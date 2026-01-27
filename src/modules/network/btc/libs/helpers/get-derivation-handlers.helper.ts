import {
  getBtcLegacyAddress,
  getBtcNativeSegWitAddress,
  getP2wshAddress,
  getP2wshInP2shAddress,
  getBtcSegWitAddress,
  getTaprootAddress,
} from "@/libs/modules/address/address.js";
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
}: GetDerivationHandlersParameters["btcLegacy"]): GetDerivationHandlersReturnType<"btcLegacy"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath, base58RootKey }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath, base58RootKey });
      const address = getBtcLegacyAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBtcLegacyAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
      base58RootKey,
    }) {
      return (deriveItemsBatchFromMnemonic<"btcLegacy">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix, base58RootKey },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"btcLegacy">,
  };
}

function getSegWitDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters["btcSegWit"]): GetDerivationHandlersReturnType<"btcSegWit"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath, base58RootKey }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath, base58RootKey });
      const address = getBtcSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBtcSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
      base58RootKey,
    }) {
      return (deriveItemsBatchFromMnemonic<"btcSegWit">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix, base58RootKey },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"btcSegWit">,
  };
}

function getNativeSegWitDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters["btcNativeSegWit"]): GetDerivationHandlersReturnType<"btcNativeSegWit"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath, base58RootKey }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath, base58RootKey });
      const address = getBtcNativeSegWitAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBtcNativeSegWitAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
      base58RootKey,
    }) {
      return (deriveItemsBatchFromMnemonic<"btcNativeSegWit">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix, base58RootKey },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"btcNativeSegWit">,
  };
}

function getTaprootDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters["btcTaproot"]): GetDerivationHandlersReturnType<"btcTaproot"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath, base58RootKey }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath, base58RootKey });
      const address = getTaprootAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getTaprootAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
      base58RootKey,
    }) {
      return (deriveItemsBatchFromMnemonic<"btcTaproot">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix, base58RootKey },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"btcTaproot">,
  };
}

function getP2wshDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters["btcP2wsh"]): GetDerivationHandlersReturnType<"btcP2wsh"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath, base58RootKey }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath, base58RootKey });
      const address = getP2wshAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getP2wshAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
      base58RootKey,
    }) {
      return (deriveItemsBatchFromMnemonic<"btcP2wsh">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix, base58RootKey },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"btcP2wsh">,
  };
}

function getP2wshInP2shDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters["btcP2wshInP2sh"]): GetDerivationHandlersReturnType<"btcP2wshInP2sh"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath, base58RootKey }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath, base58RootKey });
      const address = getP2wshInP2shAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getP2wshInP2shAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
      base58RootKey,
    }) {
      return (deriveItemsBatchFromMnemonic<"btcP2wshInP2sh">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix, base58RootKey },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"btcP2wshInP2sh">,
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
