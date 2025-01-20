import {
  getBaseAddress,
  getEnterpriseAddress,
  getRewardAddress,
} from "@/address/networks/index.js";
import { adaConfig } from "@/config/index.js";
import {
  checkIfPrivateKeyBelongsToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/families/helpers/index.js";
import {
  type GetItemHandlerParameters,
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
  CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters,
} from "@/families/types/index.js";
import { type DerivedItem } from "@/types/index.js";

function getEnterpriseItemHandlers({
  keysDerivationInstance,
  networkId,
  networkPurpose,
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
    checkIfPrivateKeyBelongsToMnemonic(
      parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<"enterprise">
    ): boolean {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"enterprise">).call(
        this,
        adaConfig[networkPurpose].enterprise.derivationPathPrefix,
        parameters
      );
    },
  };
}

function getRewardItemHandlers({
  keysDerivationInstance,
  networkId,
  networkPurpose,
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
    checkIfPrivateKeyBelongsToMnemonic(
      parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<"reward">
    ): boolean {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"reward">).call(
        this,
        adaConfig[networkPurpose].reward.derivationPathPrefix,
        parameters
      );
    },
  };
}

function getBaseItemHandlers({
  keysDerivationInstance,
  networkId,
  networkPurpose,
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
    checkIfPrivateKeyBelongsToMnemonic(
      parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<"adaBase">
    ): boolean {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"adaBase">).call(
        this,
        adaConfig[networkPurpose].adaBase.derivationPathPrefix,
        parameters
      );
    },
  };
}

export { getEnterpriseItemHandlers, getRewardItemHandlers, getBaseItemHandlers };
