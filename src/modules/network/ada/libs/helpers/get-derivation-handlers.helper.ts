import {
  getBaseAddress,
  getEnterpriseAddress,
  getRewardAddress,
} from "@/libs/modules/address/index.js";
import {
  doesPKeyBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import { adaConfig } from "@/modules/network/libs/modules/config/index.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getEnterpriseDerivationHandlers({
  keysDerivationInstance,
  networkId,
  networkPurpose,
}: GetDerivationHandlersParameters<"adaEnterprise">): GetDerivationHandlersReturnType<"adaEnterprise"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getEnterpriseAddress(keys.publicKey, networkId);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getEnterpriseAddress(keys.publicKey, networkId);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"adaEnterprise">,
    doesPKeyBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKeyBelongToMnemonic<"adaEnterprise">).call(
        this,
        parameters,
        adaConfig[networkPurpose].adaEnterprise.derivationPathPrefix,
      );
    },
  };
}

function getRewardDerivationHandlers({
  keysDerivationInstance,
  networkId,
  networkPurpose,
}: GetDerivationHandlersParameters<"adaReward">): GetDerivationHandlersReturnType<"adaReward"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getRewardAddress(keys.publicKey, networkId);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getRewardAddress(keys.publicKey, networkId);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"adaReward">,
    doesPKeyBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKeyBelongToMnemonic<"adaReward">).call(
        this,
        parameters,
        adaConfig[networkPurpose].adaReward.derivationPathPrefix,
      );
    },
  };
}

function getBaseDerivationHandlers({
  keysDerivationInstance,
  networkId,
  networkPurpose,
}: GetDerivationHandlersParameters<"adaBase">): GetDerivationHandlersReturnType<"adaBase"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"adaBase">,
    doesPKeyBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKeyBelongToMnemonic<"adaBase">).call(
        this,
        parameters,
        adaConfig[networkPurpose].adaBase.derivationPathPrefix,
      );
    },
  };
}

export { getEnterpriseDerivationHandlers, getRewardDerivationHandlers, getBaseDerivationHandlers };
