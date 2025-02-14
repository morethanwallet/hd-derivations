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
  scheme,
  isMultiSig,
  isLegacy,
}: GetDerivationHandlersParameters<AptDerivationTypeUnion>): GetDerivationHandlersReturnType<AptDerivationTypeUnion> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({
        derivationPath,
        scheme,
        isMultiSig,
        isLegacy,
      });

      const address = getAptAddress(keys.publicKey, isLegacy, scheme, isMultiSig);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey, scheme, isLegacy });
      const address = getAptAddress(keys.publicKey, isLegacy, scheme);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({ derivationPathPrefix, indexLookupFrom, indexLookupTo }) {
      return (deriveItemsBatchFromMnemonic<AptDerivationTypeUnion>).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        scheme === "ed25519",
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
