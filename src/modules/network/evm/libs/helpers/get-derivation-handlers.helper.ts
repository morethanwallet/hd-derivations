import { getEvmAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import type {
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getEvmDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"evmBase">): GetDerivationHandlersReturnType<"evmBase"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getEvmAddress(keys.publicKey);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });
      const address = getEvmAddress(keys.publicKey);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<"evmBase">,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"evmBase">).call(
        this,
        parameters,
      );
    },
  };
}

export { getEvmDerivationHandlers };
