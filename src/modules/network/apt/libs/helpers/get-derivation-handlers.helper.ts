import { getAptAddress } from "@/libs/modules/address/index.js";
import type { AptDerivationTypeUnion } from "@/libs/types/index.js";
import {
  deriveItemsBatchFromMnemonic,
  doesPKExistInBatch,
} from "@/modules/network/libs/helpers/index.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getAptDerivationHandlers({
  keysDerivationInstance,
  algorithm,
  isMultiSig,
  isLegacy,
}: GetDerivationHandlersParameters<AptDerivationTypeUnion>): GetDerivationHandlersReturnType<AptDerivationTypeUnion> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({
        derivationPath,
        algorithm,
        isMultiSig,
        isLegacy,
      });

      const address = getAptAddress(keys.publicKey, isLegacy, algorithm, isMultiSig);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey, algorithm, isLegacy });
      const address = getAptAddress(keys.publicKey, isLegacy, algorithm);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic(parameters) {
      return (deriveItemsBatchFromMnemonic<AptDerivationTypeUnion>).call(
        this,
        parameters,
        algorithm === "ed25519",
      );
    },
    doesPKBelongToMnemonic(parameters) {
      const itemsBatch = this.deriveItemsBatchFromMnemonic(parameters);
      const { privateKey } = parameters;

      return doesPKExistInBatch(itemsBatch, privateKey);
    },
  };
}

export { getAptDerivationHandlers };
