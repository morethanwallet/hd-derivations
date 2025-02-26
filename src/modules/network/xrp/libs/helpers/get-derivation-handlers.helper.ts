import { getXrpAddress } from "@/libs/modules/address/index.js";
import { XrpDerivationTypeUnion } from "@/libs/types/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/index.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function geXrpDerivationHandlers({
  keysDerivationInstance,
  ...parameters
}: GetDerivationHandlersParameters[XrpDerivationTypeUnion]): GetDerivationHandlersReturnType<XrpDerivationTypeUnion> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getXrpAddress({ ...keys, ...parameters });

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });
      const address = getXrpAddress({ ...keys, ...parameters });

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
    }) {
      return (deriveItemsBatchFromMnemonic<XrpDerivationTypeUnion>).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<XrpDerivationTypeUnion>,
  };
}

export { geXrpDerivationHandlers };
