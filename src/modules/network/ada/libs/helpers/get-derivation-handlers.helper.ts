import { DerivationPathSymbol } from "@/libs/enums/index.js";
import { NetworkError } from "@/modules/network/libs/exceptions/index.js";
import { appendAddressToDerivationPath, checkHardenedSuffixEnding } from "@/libs/helpers/index.js";
import {
  getBaseAddress,
  getEnterpriseAddress,
  getRewardAddress,
} from "@/libs/modules/address/index.js";
import { MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY } from "@/modules/network/libs/constants";
import { ExceptionMessage } from "@/modules/network/libs/enums";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  doesPKExistInBatch,
  increaseDerivationPathDepth,
  getDerivationPathDepth,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/index.js";
import type {
  DerivedItem,
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

const DERIVATION_PATH_PATTERN = {
  enterprise: "m/1852'/1815'/0'/0",
  reward: "m/1852'/1815'/0'/2",
};

function getEnterpriseDerivationHandlers({
  keysDerivationInstance,
  networkId,
}: GetDerivationHandlersParameters<"adaEnterprise">): GetDerivationHandlersReturnType<"adaEnterprise"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });

      if ("publicKey" in keys) {
        const address = getEnterpriseAddress(keys.publicKey, networkId);

        return { ...keys, address, derivationPath };
      }

      throw new NetworkError(ExceptionMessage.ITEM_GENERATION_FAILED);
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);

      if ("publicKey" in keys) {
        const address = getEnterpriseAddress(keys.publicKey, networkId);

        return { ...keys, address };
      }

      throw new NetworkError(ExceptionMessage.CREDENTIAL_GENERATION_FAILED);
    },
    deriveItemsBatchFromMnemonic({ derivationPathPrefix, indexLookupFrom, indexLookupTo }) {
      return (deriveItemsBatchFromMnemonic<"adaEnterprise">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"adaEnterprise">,
  };
}

function getRewardDerivationHandlers({
  keysDerivationInstance,
  networkId,
}: GetDerivationHandlersParameters<"adaReward">): GetDerivationHandlersReturnType<"adaReward"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });

      if ("publicKey" in keys) {
        const address = getRewardAddress(keys.publicKey, networkId);

        return { ...keys, address, derivationPath };
      }

      throw new NetworkError(ExceptionMessage.ITEM_GENERATION_FAILED);
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);

      if ("publicKey" in keys) {
        const address = getRewardAddress(keys.publicKey, networkId);

        return { ...keys, address };
      }

      throw new NetworkError(ExceptionMessage.CREDENTIAL_GENERATION_FAILED);
    },
    deriveItemsBatchFromMnemonic({ derivationPathPrefix, indexLookupFrom, indexLookupTo }) {
      return (deriveItemsBatchFromMnemonic<"adaReward">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
      );
    },
    doesPKBelongToMnemonic(parameters) {
      const itemsBatch = this.deriveItemsBatchFromMnemonic({
        ...parameters,
        derivationPathPrefix: DERIVATION_PATH_PATTERN.reward,
      });

      if (doesPKExistInBatch(itemsBatch, parameters.privateKey)) return true;

      return (doesPKBelongToMnemonic<"adaReward">).call(this, parameters);
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

      if ("enterprisePublicKey" in keys) {
        const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

        return {
          ...keys,
          address,
          enterpriseDerivationPath: parameters.enterpriseDerivationPath,
          rewardDerivationPath: parameters.rewardDerivationPath,
        };
      }

      throw new NetworkError(ExceptionMessage.ITEM_GENERATION_FAILED);
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);

      if ("enterprisePublicKey" in keys) {
        const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

        return { ...keys, address };
      }

      throw new NetworkError(ExceptionMessage.CREDENTIAL_GENERATION_FAILED);
    },
    deriveItemsBatchFromMnemonic(
      this: {
        deriveItemFromMnemonic: GetDerivationHandlersReturnType<"adaBase">["deriveItemFromMnemonic"];
      },
      parameters,
    ) {
      validateDerivationPath(parameters.enterpriseDerivationPathPrefix);
      validateDerivationPath(parameters.rewardDerivationPathPrefix);
      let batch: DerivedItem<"adaBase">[] = [];

      for (let i = parameters.indexLookupFrom; i < parameters.indexLookupTo; i++) {
        const enterpriseDerivationPathWithAddressIndex = appendAddressToDerivationPath({
          shouldHarden: false,
          derivationPath: parameters.enterpriseDerivationPathPrefix,
          addressIndex: i,
        });

        const rewardDerivationPathWithAddressIndex = appendAddressToDerivationPath({
          shouldHarden: false,
          derivationPath: parameters.rewardDerivationPathPrefix,
          addressIndex: i,
        });

        batch.push(
          this.deriveItemFromMnemonic({
            ...parameters,
            enterpriseDerivationPath: enterpriseDerivationPathWithAddressIndex,
            rewardDerivationPath: rewardDerivationPathWithAddressIndex,
          }),
        );
      }

      return batch;
    },
    doesPKBelongToMnemonic(parameters) {
      validateDerivationPath(parameters.derivationPathPrefix);
      const itemsBatch = this.deriveItemsBatchFromMnemonic({
        ...parameters,
        enterpriseDerivationPathPrefix: DERIVATION_PATH_PATTERN.enterprise,
        rewardDerivationPathPrefix: DERIVATION_PATH_PATTERN.reward,
      });

      if (doesPKExistInBatch(itemsBatch, parameters.privateKey)) return true;

      let updatedDerivationPath = parameters.derivationPathPrefix;
      let derivationPathDepth = getDerivationPathDepth(updatedDerivationPath);

      do {
        const itemsBatch = this.deriveItemsBatchFromMnemonic({
          ...parameters,
          enterpriseDerivationPathPrefix: updatedDerivationPath,
          rewardDerivationPathPrefix: updatedDerivationPath,
        });

        const { privateKey } = parameters;

        if (doesPKExistInBatch(itemsBatch, privateKey)) return true;

        if (derivationPathDepth < MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY) {
          updatedDerivationPath = increaseDerivationPathDepth({
            derivationPath: updatedDerivationPath,
          });

          derivationPathDepth++;
          continue;
        }

        if (derivationPathDepth === MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY) {
          const derivationPathHardenedPart = updatedDerivationPath
            .split(DerivationPathSymbol.DELIMITER)
            .filter(
              (part) =>
                part.includes(DerivationPathSymbol.HARDENED_SUFFIX) ||
                part === DerivationPathSymbol.MASTER_KEY,
            )
            .join(DerivationPathSymbol.DELIMITER);

          updatedDerivationPath = increaseDerivationPathDepth({
            shouldHarden: true,
            derivationPath: derivationPathHardenedPart,
          });

          derivationPathDepth = getDerivationPathDepth(updatedDerivationPath);
        }

        if (
          derivationPathDepth > MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY &&
          checkHardenedSuffixEnding(updatedDerivationPath)
        ) {
          break;
        }
      } while (true);

      return false;
    },
  };
}

export { getEnterpriseDerivationHandlers, getRewardDerivationHandlers, getBaseDerivationHandlers };
