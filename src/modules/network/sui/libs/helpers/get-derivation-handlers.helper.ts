import { getSuiAddress } from "@/libs/modules/address/index.js";
import {
  deriveItemsBatchFromMnemonic,
  doesPKExistInBatch,
} from "@/modules/network/libs/helpers/index.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getSuiDerivationHandlers({
  keysDerivationInstance,
  scheme,
}: GetDerivationHandlersParameters<"suiBase">): GetDerivationHandlersReturnType<"suiBase"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({
        derivationPath,
        scheme,
      });
      const address = getSuiAddress(keys.publicKey, scheme);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({
        privateKey,
        scheme,
      });
      const address = getSuiAddress(keys.publicKey, scheme);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic(parameters) {
      // prettier-ignore
      return (deriveItemsBatchFromMnemonic<"suiBase">).call(
        this,
        parameters,
       scheme
      );
    },
    doesPKBelongToMnemonic(parameters) {
      const itemsBatch = this.deriveItemsBatchFromMnemonic(parameters);
      const { privateKey } = parameters;

      if (doesPKExistInBatch(itemsBatch, privateKey)) return true;

      return false;
    },
  };
}

export { getSuiDerivationHandlers };
