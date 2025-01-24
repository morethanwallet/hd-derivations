import { getBaseAddress, getEnterpriseAddress, getRewardAddress } from "@/modules/address/index.js";
import {
  checkIfPrivateKeyBelongsToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import { adaConfig } from "@/modules/network/libs/modules/config/index.js";
import {
  type GetItemHandlerParameters,
  type GetItemHandlerReturnType,
} from "@/modules/network/libs/types/index.js";

function getEnterpriseItemHandlers({
  keysDerivationInstance,
  networkId,
  networkPurpose,
}: GetItemHandlerParameters<"enterprise">): GetItemHandlerReturnType<"enterprise"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getEnterpriseAddress(keys.publicKey, networkId);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getEnterpriseAddress(keys.publicKey, networkId);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"enterprise">,
    checkIfPrivateKeyBelongsToMnemonic(parameters) {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"enterprise">).call(
        this,
        parameters,
        adaConfig[networkPurpose].enterprise.derivationPathPrefix,
      );
    },
  };
}

function getRewardItemHandlers({
  keysDerivationInstance,
  networkId,
  networkPurpose,
}: GetItemHandlerParameters<"reward">): GetItemHandlerReturnType<"reward"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getRewardAddress(keys.publicKey, networkId);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getRewardAddress(keys.publicKey, networkId);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"reward">,
    checkIfPrivateKeyBelongsToMnemonic(parameters) {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"reward">).call(
        this,
        parameters,
        adaConfig[networkPurpose].reward.derivationPathPrefix,
      );
    },
  };
}

function getBaseItemHandlers({
  keysDerivationInstance,
  networkId,
  networkPurpose,
}: GetItemHandlerParameters<"adaBase">): GetItemHandlerReturnType<"adaBase"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"adaBase">,
    checkIfPrivateKeyBelongsToMnemonic(parameters) {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"adaBase">).call(
        this,
        parameters,
        adaConfig[networkPurpose].adaBase.derivationPathPrefix,
      );
    },
  };
}

export { getEnterpriseItemHandlers, getRewardItemHandlers, getBaseItemHandlers };
