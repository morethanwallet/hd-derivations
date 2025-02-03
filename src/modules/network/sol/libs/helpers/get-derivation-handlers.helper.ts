import { getBnbAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getSolDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"solBase">): GetDerivationHandlersReturnType<"solBase"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });

      return { ...keys, address: keys.publicKey, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });

      return { ...keys, address: keys.publicKey };
    },
    deriveItemsBatchFromMnemonic(parameters) {
      // prettier-ignore
      return (deriveItemsBatchFromMnemonic<"solBase">).call(
        this,
        parameters,
       "ed25519"
      );
    },
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"solBase">).call(
        this,
        parameters,
        "ed25519"
      );
    },
  };
}

export { getSolDerivationHandlers };
