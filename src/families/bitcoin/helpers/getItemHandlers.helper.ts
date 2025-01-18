import {
  getLegacyAddress,
  getNativeSegWitAddress,
  getP2wshAddress,
  getP2wshInP2shAddress,
  getSegWitAddress,
  getTaprootAddress,
} from "@/address/networks/index.js";
import {
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
} from "@/families/types/index.js";
import { type TaprootKeyDerivation, type CommonBipKeyDerivation } from "@/keyDerivation/index.js";
import { type DerivedItem } from "@/types/index.js";

function getLegacyItemHandlers(
  keysDerivationInstance: InstanceType<typeof CommonBipKeyDerivation>
) {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"legacy">
    ): DerivedItem<"legacy"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getLegacyAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"legacy">
    ) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getLegacyAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address };
    },
  };
}

function getSegWitItemHandlers(
  keysDerivationInstance: InstanceType<typeof CommonBipKeyDerivation>
) {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"segWit">
    ): DerivedItem<"segWit"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getSegWitAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"segWit">
    ) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getSegWitAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address };
    },
  };
}

function getNativeSegWitItemHandlers(
  keysDerivationInstance: InstanceType<typeof CommonBipKeyDerivation>
) {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"nativeSegWit">
    ): DerivedItem<"nativeSegWit"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getNativeSegWitAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"nativeSegWit">
    ) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getNativeSegWitAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address };
    },
  };
}

function getTaprootItemHandlers(keysDerivationInstance: InstanceType<typeof TaprootKeyDerivation>) {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"taproot">
    ): DerivedItem<"taproot"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getTaprootAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"taproot">
    ) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getTaprootAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address };
    },
  };
}

function getP2wshItemHandlers(keysDerivationInstance: InstanceType<typeof CommonBipKeyDerivation>) {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"p2wsh">
    ): DerivedItem<"p2wsh"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getP2wshAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"p2wsh">
    ) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getP2wshAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address };
    },
  };
}

function getP2wshInP2shItemHandlers(
  keysDerivationInstance: InstanceType<typeof CommonBipKeyDerivation>
) {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"p2wshInP2sh">
    ): DerivedItem<"p2wshInP2sh"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getP2wshInP2shAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"p2wshInP2sh">
    ) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getP2wshInP2shAddress(keys.publicKey, keysDerivationInstance.keysConfig);

      return { ...keys, address };
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
