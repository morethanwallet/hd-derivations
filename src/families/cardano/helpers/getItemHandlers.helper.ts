import {
  getBaseAddress,
  getEnterpriseAddress,
  getRewardAddress,
} from "@/address/networks/index.js";
import { deriveItemsBatchFromMnemonic } from "@/families/helpers/index.js";
import {
  type GetItemHandlerParameters,
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
} from "@/families/types/index.js";
import { type DerivedItem } from "@/types/index.js";

function getEnterpriseItemHandlers({
  keysDerivationInstance,
  networkId,
}: GetItemHandlerParameters<"enterprise">) {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"enterprise">
    ): DerivedItem<"enterprise"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getEnterpriseAddress(keys.publicKey, networkId);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"enterprise">
    ) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getEnterpriseAddress(keys.publicKey, networkId);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"enterprise">,
  };
}

function getRewardItemHandlers({
  keysDerivationInstance,
  networkId,
}: GetItemHandlerParameters<"reward">) {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"reward">
    ): DerivedItem<"reward"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getRewardAddress(keys.publicKey, networkId);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"reward">
    ) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getRewardAddress(keys.publicKey, networkId);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"reward">,
  };
}

function getBaseItemHandlers({
  keysDerivationInstance,
  networkId,
}: GetItemHandlerParameters<"adaBase">) {
  return {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<"adaBase">
    ): DerivedItem<"adaBase"> => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (
      parameters: GetCredentialFromPrivateKeyInnerHandlerParameters<"adaBase">
    ) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"adaBase">,
  };
}

export { getEnterpriseItemHandlers, getRewardItemHandlers, getBaseItemHandlers };
