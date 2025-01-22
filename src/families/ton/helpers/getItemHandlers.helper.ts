import { getTonAddress } from "@/address/networks/index.js";
import { tonConfig } from "@/config/index.js";
import {
  checkIfPrivateKeyBelongsToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/families/helpers/index.js";
import {
  type GetItemHandlerParameters,
  type GetItemHandlerReturnType,
} from "@/families/types/index.js";

function getTonItemHandlers({
  keysDerivationInstance,
}: GetItemHandlerParameters<"tonBase">): GetItemHandlerReturnType<"tonBase"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getTonAddress({ publicKey: keys.publicKey, ...parameters });

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getTonAddress({ publicKey: keys.publicKey, ...parameters });

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic(parameters) {
      // prettier-ignore
      return (deriveItemsBatchFromMnemonic<"tonBase">).call(
        this,
        parameters,
       "ed25519"
      );
    },
    checkIfPrivateKeyBelongsToMnemonic(parameters) {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<"tonBase">).call(
        this,
        parameters,
        tonConfig.tonBase.derivationPathPrefix,
        "ed25519"
      );
    },
  };
}

export { getTonItemHandlers };
