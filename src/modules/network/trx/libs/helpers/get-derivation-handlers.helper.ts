import { getTrxAddress } from "@/libs/modules/address/address.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/helpers.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getTrxDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters["trxBase"]): GetDerivationHandlersReturnType<"trxBase"> {
  return {
    deriveItemFromMnemonic: async ({ derivationPath }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getTrxAddress(keys.publicKey, keysDerivationInstance.prefixConfig.pubKeyHash);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getTrxAddress(keys.publicKey, keysDerivationInstance.prefixConfig.pubKeyHash);

      return { ...keys, address };
    },
    async deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
    }) {
      return await (deriveItemsBatchFromMnemonic<"trxBase">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<"trxBase">,
  };
}

export { getTrxDerivationHandlers };
