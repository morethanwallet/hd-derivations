import {
  getLegacyAddress,
  getNativeSegWitAddress,
  getP2wshAddress,
  getP2wshInP2shAddress,
  getSegWitAddress,
  getTaprootAddress,
} from "@/modules/address/index.js";
import {
  checkIfPrivateKeyBelongsToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import { btcConfig } from "@/modules/network/libs/modules/config/index.js";
import {
  type GetItemHandlerParameters,
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
  type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters,
  type DerivedItem,
  type DerivedCredential,
  type GetItemHandlerReturnType,
} from "@/modules/network/libs/types/index.js";

function getLegacyItemHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetItemHandlerParameters<"legacy">): GetItemHandlerReturnType<"legacy"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getLegacyAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getLegacyAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"legacy">,
    checkIfPrivateKeyBelongsToMnemonic(parameters) {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"legacy">).call(
        this,
        parameters,
        btcConfig[networkPurpose].legacy.derivationPathPrefix,
      );
    },
  };
}

function getSegWitItemHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetItemHandlerParameters<"segWit">): GetItemHandlerReturnType<"segWit"> {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"segWit">,
    ): DerivedItem<"segWit"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getSegWitAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"segWit">,
    ): DerivedCredential<"segWit"> => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getSegWitAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"segWit">,
    checkIfPrivateKeyBelongsToMnemonic(
      parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<"segWit">,
    ): boolean {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"segWit">).call(
        this,
        parameters,
        btcConfig[networkPurpose].segWit.derivationPathPrefix,
      );
    },
  };
}

function getNativeSegWitItemHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetItemHandlerParameters<"nativeSegWit">): GetItemHandlerReturnType<"nativeSegWit"> {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"nativeSegWit">,
    ): DerivedItem<"nativeSegWit"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getNativeSegWitAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"nativeSegWit">,
    ): DerivedCredential<"nativeSegWit"> => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getNativeSegWitAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"nativeSegWit">,
    checkIfPrivateKeyBelongsToMnemonic(
      parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<"nativeSegWit">,
    ): boolean {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"nativeSegWit">).call(
        this,
        parameters,
        btcConfig[networkPurpose].nativeSegWit.derivationPathPrefix,
      );
    },
  };
}

function getTaprootItemHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetItemHandlerParameters<"taproot">): GetItemHandlerReturnType<"taproot"> {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"taproot">,
    ): DerivedItem<"taproot"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getTaprootAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"taproot">,
    ): DerivedCredential<"taproot"> => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getTaprootAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"taproot">,
    checkIfPrivateKeyBelongsToMnemonic(
      parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<"taproot">,
    ): boolean {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"taproot">).call(
        this,
        parameters,
        btcConfig[networkPurpose].taproot.derivationPathPrefix,
      );
    },
  };
}

function getP2wshItemHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetItemHandlerParameters<"p2wsh">): GetItemHandlerReturnType<"p2wsh"> {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"p2wsh">,
    ): DerivedItem<"p2wsh"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getP2wshAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"p2wsh">,
    ): DerivedCredential<"p2wsh"> => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getP2wshAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"p2wsh">,
    checkIfPrivateKeyBelongsToMnemonic(
      parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<"p2wsh">,
    ): boolean {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"p2wsh">).call(
        this,
        parameters,
        btcConfig[networkPurpose].p2wsh.derivationPathPrefix,
      );
    },
  };
}

function getP2wshInP2shItemHandlers({
  keysDerivationInstance,
  networkPurpose,
}: GetItemHandlerParameters<"p2wshInP2sh">): GetItemHandlerReturnType<"p2wshInP2sh"> {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"p2wshInP2sh">,
    ): DerivedItem<"p2wshInP2sh"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getP2wshInP2shAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"p2wshInP2sh">,
    ): DerivedCredential<"p2wshInP2sh"> => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getP2wshInP2shAddress(
        keys.publicKey,
        keysDerivationInstance.prefixConfig,
      );

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"p2wshInP2sh">,
    checkIfPrivateKeyBelongsToMnemonic(
      parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<"p2wshInP2sh">,
    ): boolean {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"p2wshInP2sh">).call(
        this,
        parameters,
        btcConfig[networkPurpose].p2wshInP2sh.derivationPathPrefix,
      );
    },
  };
}

export {
  getLegacyItemHandlers,
  getSegWitItemHandlers,
  getNativeSegWitItemHandlers,
  getTaprootItemHandlers,
  getP2wshItemHandlers,
  getP2wshInP2shItemHandlers,
};
