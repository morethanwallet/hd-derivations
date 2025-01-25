import { getTonAddress } from "@/modules/address/index.js";
import {
  checkIfPrivateKeyBelongsToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import { tonConfig } from "@/modules/network/libs/modules/config/index.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getTonDerivationHandlers({
  keysDerivationInstance,
}: GetDerivationHandlersParameters<"tonBase">): GetDerivationHandlersReturnType<"tonBase"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getTonAddress({
        publicKey: keys.publicKey,
        ...parameters,
      });

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPrivateKey: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getTonAddress({
        publicKey: keys.publicKey,
        ...parameters,
      });

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

export { getTonDerivationHandlers };
