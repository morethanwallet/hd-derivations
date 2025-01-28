import {
  getLegacyAddress,
  getNativeSegWitAddress,
  getP2wshAddress,
  getP2wshInP2shAddress,
  getSegWitAddress,
  getTaprootAddress,
} from "@/libs/modules/address/index.js";
import {
  doesPKeyBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import { btcConfig } from "@/modules/network/libs/modules/config/index.js";
import {
  type GetDerivationHandlersParameters,
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type GetCredentialFromPKInnerHandlerParameters,
  type DoesPKBelongToMnemonicInnerHandlerParameters,
  type DerivedItem,
  type DerivedCredential,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getLegacyDerivationHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetDerivationHandlersParameters<"legacy">): GetDerivationHandlersReturnType<"legacy"> {
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
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"legacy">,
    doesPKeyBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKeyBelongToMnemonic<"legacy">).call(
        this,
        parameters,
        btcConfig[networkPurpose].legacy.derivationPathPrefix,
      );
    },
  };
}

function getSegWitDerivationHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetDerivationHandlersParameters<"segWit">): GetDerivationHandlersReturnType<"segWit"> {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"segWit">,
    ): DerivedItem<"segWit"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (
      parameters: GetCredentialFromPKInnerHandlerParameters<"segWit">,
    ): DerivedCredential<"segWit"> => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"segWit">,
    doesPKeyBelongToMnemonic(
      parameters: DoesPKBelongToMnemonicInnerHandlerParameters<"segWit">,
    ): boolean {
      // prettier-ignore
      return (doesPKeyBelongToMnemonic<"segWit">).call(
        this,
        parameters,
        btcConfig[networkPurpose].segWit.derivationPathPrefix,
      );
    },
  };
}

function getNativeSegWitDerivationHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetDerivationHandlersParameters<"nativeSegWit">): GetDerivationHandlersReturnType<"nativeSegWit"> {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"nativeSegWit">,
    ): DerivedItem<"nativeSegWit"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getNativeSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (
      parameters: GetCredentialFromPKInnerHandlerParameters<"nativeSegWit">,
    ): DerivedCredential<"nativeSegWit"> => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getNativeSegWitAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"nativeSegWit">,
    doesPKeyBelongToMnemonic(
      parameters: DoesPKBelongToMnemonicInnerHandlerParameters<"nativeSegWit">,
    ): boolean {
      // prettier-ignore
      return (doesPKeyBelongToMnemonic<"nativeSegWit">).call(
        this,
        parameters,
        btcConfig[networkPurpose].nativeSegWit.derivationPathPrefix,
      );
    },
  };
}

function getTaprootDerivationHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetDerivationHandlersParameters<"taproot">): GetDerivationHandlersReturnType<"taproot"> {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"taproot">,
    ): DerivedItem<"taproot"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getTaprootAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (
      parameters: GetCredentialFromPKInnerHandlerParameters<"taproot">,
    ): DerivedCredential<"taproot"> => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getTaprootAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"taproot">,
    doesPKeyBelongToMnemonic(
      parameters: DoesPKBelongToMnemonicInnerHandlerParameters<"taproot">,
    ): boolean {
      // prettier-ignore
      return (doesPKeyBelongToMnemonic<"taproot">).call(
        this,
        parameters,
        btcConfig[networkPurpose].taproot.derivationPathPrefix,
      );
    },
  };
}

function getP2wshDerivationHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetDerivationHandlersParameters<"p2wsh">): GetDerivationHandlersReturnType<"p2wsh"> {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"p2wsh">,
    ): DerivedItem<"p2wsh"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getP2wshAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (
      parameters: GetCredentialFromPKInnerHandlerParameters<"p2wsh">,
    ): DerivedCredential<"p2wsh"> => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getP2wshAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"p2wsh">,
    doesPKeyBelongToMnemonic(
      parameters: DoesPKBelongToMnemonicInnerHandlerParameters<"p2wsh">,
    ): boolean {
      // prettier-ignore
      return (doesPKeyBelongToMnemonic<"p2wsh">).call(
        this,
        parameters,
        btcConfig[networkPurpose].p2wsh.derivationPathPrefix,
      );
    },
  };
}

function getP2wshInP2shDerivationHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetDerivationHandlersParameters<"p2wshInP2sh">): GetDerivationHandlersReturnType<"p2wshInP2sh"> {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"p2wshInP2sh">,
    ): DerivedItem<"p2wshInP2sh"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getP2wshInP2shAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (
      parameters: GetCredentialFromPKInnerHandlerParameters<"p2wshInP2sh">,
    ): DerivedCredential<"p2wshInP2sh"> => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getP2wshInP2shAddress(keys.publicKey, keysDerivationInstance.prefixConfig);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"p2wshInP2sh">,
    doesPKeyBelongToMnemonic(
      parameters: DoesPKBelongToMnemonicInnerHandlerParameters<"p2wshInP2sh">,
    ): boolean {
      // prettier-ignore
      return (doesPKeyBelongToMnemonic<"p2wshInP2sh">).call(
        this,
        parameters,
        btcConfig[networkPurpose].p2wshInP2sh.derivationPathPrefix,
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
