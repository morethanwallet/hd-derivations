import { DerivationPathSymbol } from "@/libs/enums/enums.js";
import {
  appendAddressToDerivationPath,
  checkHardenedSuffixEnding,
} from "@/libs/helpers/helpers.js";
import {
  getAdaExodusAddress,
  getBaseAddress,
  getEnterpriseAddress,
  getRewardAddress,
} from "@/libs/modules/address/address.js";
import { MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY } from "@/modules/network/libs/constants/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  doesPKExistInBatch,
  increaseDerivationPathDepth,
  getDerivationPathDepth,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/helpers.js";
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
}: GetDerivationHandlersParameters["adaEnterprise"]): GetDerivationHandlersReturnType<"adaEnterprise"> {
  return {
    deriveItemFromMnemonic: async ({ derivationPath }) => {
      validateDerivationPath(derivationPath);
      const keys = await keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getEnterpriseAddress(keys.publicKey, networkId);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getEnterpriseAddress(keys.publicKey, networkId);

      return { ...keys, address };
    },
    async deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
    }) {
      return (deriveItemsBatchFromMnemonic<"adaEnterprise">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"adaEnterprise">,
  };
}

function getRewardDerivationHandlers({
  keysDerivationInstance,
  networkId,
}: GetDerivationHandlersParameters["adaReward"]): GetDerivationHandlersReturnType<"adaReward"> {
  return {
    deriveItemFromMnemonic: async ({ derivationPath }) => {
      const keys = await keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getRewardAddress(keys.publicKey, networkId);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getRewardAddress(keys.publicKey, networkId);

      return { ...keys, address };
    },
    async deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
    }) {
      return (deriveItemsBatchFromMnemonic<"adaReward">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        shouldUseHardenedAddress,
      );
    },
    async doesPKBelongToMnemonic(parameters) {
      const itemsBatch = await this.deriveItemsBatchFromMnemonic({
        ...parameters,
        derivationPathPrefix: DERIVATION_PATH_PATTERN.reward,
      });

      itemsBatch.push(...(await this.deriveItemsBatchFromMnemonic(parameters)));

      if (doesPKExistInBatch(itemsBatch, parameters.privateKey)) return true;

      return (doesPKBelongToMnemonic<"adaReward">).call(this, parameters);
    },
  };
}

function getExodusDerivationHandlers({
  keysDerivationInstance,
  networkId,
}: GetDerivationHandlersParameters["adaExodus"]): GetDerivationHandlersReturnType<"adaExodus"> {
  return {
    deriveItemFromMnemonic: async ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getAdaExodusAddress(keys.publicKey, networkId);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getAdaExodusAddress(keys.publicKey, networkId);

      return { ...keys, address };
    },
    async deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
    }) {
      return (deriveItemsBatchFromMnemonic<"adaExodus">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"adaExodus">,
  };
}

function getBaseDerivationHandlers({
  keysDerivationInstance,
  networkId,
}: GetDerivationHandlersParameters["adaBase"]): GetDerivationHandlersReturnType<"adaBase"> {
  return {
    deriveItemFromMnemonic: async (parameters) => {
      const keys = await keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

      return {
        ...keys,
        address,
        enterpriseDerivationPath: parameters.enterpriseDerivationPath,
        rewardDerivationPath: parameters.rewardDerivationPath,
      };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

      return { ...keys, address };
    },
    async deriveItemsBatchFromMnemonic(
      this: {
        deriveItemFromMnemonic: GetDerivationHandlersReturnType<"adaBase">["deriveItemFromMnemonic"];
      },
      {
        enterpriseDerivationPathPrefix,
        rewardDerivationPathPrefix,
        indexLookupFrom,
        indexLookupTo,
        shouldUseHardenedAddress,
      },
    ) {
      validateDerivationPath(enterpriseDerivationPathPrefix);
      validateDerivationPath(rewardDerivationPathPrefix);
      let itemsBatch: DerivedItem<"adaBase">[] = [];

      for (let i = indexLookupFrom; i < indexLookupTo; i++) {
        const enterpriseDerivationPathWithAddressIndex = appendAddressToDerivationPath({
          shouldHarden: shouldUseHardenedAddress,
          derivationPath: enterpriseDerivationPathPrefix,
          addressIndex: i,
        });

        const rewardDerivationPathWithAddressIndex = appendAddressToDerivationPath({
          shouldHarden: shouldUseHardenedAddress,
          derivationPath: rewardDerivationPathPrefix,
          addressIndex: i,
        });

        const derivedItem = await this.deriveItemFromMnemonic({
          enterpriseDerivationPath: enterpriseDerivationPathWithAddressIndex,
          rewardDerivationPath: rewardDerivationPathWithAddressIndex,
        });

        itemsBatch.push(derivedItem);
      }

      return itemsBatch;
    },
    async doesPKBelongToMnemonic(parameters) {
      validateDerivationPath(parameters.derivationPathPrefix);

      const itemsBatch = await this.deriveItemsBatchFromMnemonic({
        ...parameters,
        enterpriseDerivationPathPrefix: DERIVATION_PATH_PATTERN.enterprise,
        rewardDerivationPathPrefix: DERIVATION_PATH_PATTERN.reward,
      });

      itemsBatch.push(
        ...(await this.deriveItemsBatchFromMnemonic({
          ...parameters,
          enterpriseDerivationPathPrefix: DERIVATION_PATH_PATTERN.enterprise,
          rewardDerivationPathPrefix: DERIVATION_PATH_PATTERN.reward,
          shouldUseHardenedAddress: true,
        })),
      );

      if (doesPKExistInBatch(itemsBatch, parameters.privateKey)) {
        return true;
      }

      let updatedDerivationPath = parameters.derivationPathPrefix;
      let derivationPathDepth = getDerivationPathDepth(updatedDerivationPath);

      do {
        const itemsBatch = await this.deriveItemsBatchFromMnemonic({
          ...parameters,
          enterpriseDerivationPathPrefix: updatedDerivationPath,
          rewardDerivationPathPrefix: updatedDerivationPath,
        });

        itemsBatch.push(
          ...(await this.deriveItemsBatchFromMnemonic({
            ...parameters,
            enterpriseDerivationPathPrefix: updatedDerivationPath,
            rewardDerivationPathPrefix: updatedDerivationPath,
            shouldUseHardenedAddress: true,
          })),
        );

        if (doesPKExistInBatch(itemsBatch, parameters.privateKey)) {
          return true;
        }

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

function getLedgerDerivationHandlers({
  keysDerivationInstance,
  networkId,
}: GetDerivationHandlersParameters["adaLedger"]): GetDerivationHandlersReturnType<"adaLedger"> {
  return {
    deriveItemFromMnemonic: async (parameters) => {
      const keys = await keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

      return {
        ...keys,
        address,
        enterpriseDerivationPath: parameters.enterpriseDerivationPath,
        rewardDerivationPath: parameters.rewardDerivationPath,
      };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getBaseAddress(keys.enterprisePublicKey, keys.rewardPublicKey, networkId);

      return { ...keys, address };
    },
    async deriveItemsBatchFromMnemonic(
      this: {
        deriveItemFromMnemonic: GetDerivationHandlersReturnType<"adaLedger">["deriveItemFromMnemonic"];
      },
      {
        enterpriseDerivationPathPrefix,
        rewardDerivationPathPrefix,
        indexLookupFrom,
        indexLookupTo,
        shouldUseHardenedAddress,
      },
    ) {
      validateDerivationPath(enterpriseDerivationPathPrefix);
      validateDerivationPath(rewardDerivationPathPrefix);
      let itemsBatch: DerivedItem<"adaLedger">[] = [];

      for (let i = indexLookupFrom; i < indexLookupTo; i++) {
        const enterpriseDerivationPathWithAddressIndex = appendAddressToDerivationPath({
          shouldHarden: shouldUseHardenedAddress,
          derivationPath: enterpriseDerivationPathPrefix,
          addressIndex: i,
        });

        const rewardDerivationPathWithAddressIndex = appendAddressToDerivationPath({
          shouldHarden: shouldUseHardenedAddress,
          derivationPath: rewardDerivationPathPrefix,
          addressIndex: i,
        });

        const derivedItem = await this.deriveItemFromMnemonic({
          enterpriseDerivationPath: enterpriseDerivationPathWithAddressIndex,
          rewardDerivationPath: rewardDerivationPathWithAddressIndex,
        });

        itemsBatch.push(derivedItem);
      }

      return itemsBatch;
    },
    async doesPKBelongToMnemonic(parameters) {
      validateDerivationPath(parameters.derivationPathPrefix);

      const itemsBatch = await this.deriveItemsBatchFromMnemonic({
        ...parameters,
        enterpriseDerivationPathPrefix: DERIVATION_PATH_PATTERN.enterprise,
        rewardDerivationPathPrefix: DERIVATION_PATH_PATTERN.reward,
      });

      itemsBatch.push(
        ...(await this.deriveItemsBatchFromMnemonic({
          ...parameters,
          enterpriseDerivationPathPrefix: DERIVATION_PATH_PATTERN.enterprise,
          rewardDerivationPathPrefix: DERIVATION_PATH_PATTERN.reward,
          shouldUseHardenedAddress: true,
        })),
      );

      if (doesPKExistInBatch(itemsBatch, parameters.privateKey)) {
        return true;
      }

      let updatedDerivationPath = parameters.derivationPathPrefix;
      let derivationPathDepth = getDerivationPathDepth(updatedDerivationPath);

      do {
        const itemsBatch = await this.deriveItemsBatchFromMnemonic({
          ...parameters,
          enterpriseDerivationPathPrefix: updatedDerivationPath,
          rewardDerivationPathPrefix: updatedDerivationPath,
        });

        itemsBatch.push(
          ...(await this.deriveItemsBatchFromMnemonic({
            ...parameters,
            enterpriseDerivationPathPrefix: updatedDerivationPath,
            rewardDerivationPathPrefix: updatedDerivationPath,
            shouldUseHardenedAddress: true,
          })),
        );

        if (doesPKExistInBatch(itemsBatch, parameters.privateKey)) {
          return true;
        }

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

export {
  getEnterpriseDerivationHandlers,
  getRewardDerivationHandlers,
  getExodusDerivationHandlers,
  getBaseDerivationHandlers,
  getLedgerDerivationHandlers,
};
