import { getTonAddress } from "@/libs/modules/address/index.js";
import {
  doesPKeyBelongToMnemonic,
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
    getCredentialFromPK: (parameters) => {
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
    doesPKeyBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKeyBelongToMnemonic<"tonBase">).call(
        this,
        parameters,
        tonConfig.tonBase.derivationPathPrefix,
        "ed25519"
      );
    },
  };
}

export { getTonDerivationHandlers };
