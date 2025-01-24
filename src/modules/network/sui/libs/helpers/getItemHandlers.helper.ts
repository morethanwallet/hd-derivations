import { getSuiAddress } from "@/modules/address/index.js";
import {
  checkIfPrivateKeyBelongsToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import { suiConfig } from "@/modules/network/libs/modules/config/index.js";
import {
  type GetItemHandlerParameters,
  type GetItemHandlerReturnType,
} from "@/modules/network/libs/types/index.js";

function getSuiItemHandlers({
  keysDerivationInstance,
  scheme,
}: GetItemHandlerParameters<"suiBase">): GetItemHandlerReturnType<"suiBase"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath, scheme });
      const address = getSuiAddress(keys.publicKey, scheme);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPrivateKey: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey, scheme });
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
    checkIfPrivateKeyBelongsToMnemonic(parameters) {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"suiBase">).call(
        this,
        parameters,
        suiConfig.suiBase[scheme].derivationPathPrefix,
        scheme
      );
    },
  };
}

export { getSuiItemHandlers };
