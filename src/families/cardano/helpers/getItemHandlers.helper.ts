import {
  getBaseAddress,
  getEnterpriseAddress,
  getRewardAddress,
} from "@/address/networks/index.js";
import {
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
} from "@/families/types/index.js";
import {
  type RewardKeyDerivation,
  type BaseKeyDerivation,
  type EnterpriseKeyDerivation,
} from "@/keyDerivation/index.js";
import { type DerivedItem } from "@/types/index.js";

function getEnterpriseItemHandlers(
  keysDerivationInstance: InstanceType<typeof EnterpriseKeyDerivation>,
  networkId: number
) {
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
  };
}

function getRewardItemHandlers(
  keysDerivationInstance: InstanceType<typeof RewardKeyDerivation>,
  networkId: number
) {
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
  };
}

function getBaseItemHandlers(
  keysDerivationInstance: InstanceType<typeof BaseKeyDerivation>,
  networkId: number
) {
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
  };
}

export { getEnterpriseItemHandlers, getRewardItemHandlers, getBaseItemHandlers };
