import { getBnbAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getBnbDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"bnbBase">): GetDerivationHandlersReturnType<"bnbBase"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getBnbAddress(keys.publicKey);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });
      const address = getBnbAddress(keys.publicKey);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"bnbBase">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"bnbBase">).call(
        this,
        parameters,
      );
    },
  };
}

export { getBnbDerivationHandlers };
