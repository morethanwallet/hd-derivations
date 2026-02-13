import { getXrpAddress } from "@/libs/modules/address/address.js";
import type { DerivationTypeUnionByNetwork } from "@/libs/types/types.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/helpers.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getXrpDerivationHandlers({
  keysDerivationInstance,
  ...parameters
}: GetDerivationHandlersParameters[DerivationTypeUnionByNetwork["xrp"]]): GetDerivationHandlersReturnType<
  DerivationTypeUnionByNetwork["xrp"]
> {
  return {
    deriveItemFromMnemonic: async ({ derivationPath }) => {
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
    async deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
    }) {
      return await (deriveItemsBatchFromMnemonic<DerivationTypeUnionByNetwork["xrp"]>).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<DerivationTypeUnionByNetwork["xrp"]>,
  };
}

export { getXrpDerivationHandlers };
