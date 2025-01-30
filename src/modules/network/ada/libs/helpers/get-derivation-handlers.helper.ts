import {
  getBaseAddress,
  getEnterpriseAddress,
  getRewardAddress,
} from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getEnterpriseDerivationHandlers({
  keysDerivationInstance,
  networkId,
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
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"adaEnterprise">).call(
        this,
        parameters,
      );
    },
  };
}

function getRewardDerivationHandlers({
  keysDerivationInstance,
  networkId,
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
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"adaReward">).call(
        this,
        parameters,
      );
    },
  };
}

function getBaseDerivationHandlers({
  keysDerivationInstance,
  networkId,
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
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"adaBase">).call(
        this,
        parameters,
      );
    },
  };
}

export { getEnterpriseDerivationHandlers, getRewardDerivationHandlers, getBaseDerivationHandlers };
