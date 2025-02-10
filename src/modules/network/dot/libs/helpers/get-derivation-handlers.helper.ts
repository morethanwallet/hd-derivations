import { getDotAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getDotDerivationHandlers({
  keysDerivationInstance,
  ss58Format,
}: GetDerivationHandlersParameters<"dotBase">): GetDerivationHandlersReturnType<"dotBase"> {
  return {
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);
      const address = getDotAddress(keys.publicKey, ss58Format);

      return { ...keys, address, derivationPath: parameters.derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getDotAddress(keys.publicKey, ss58Format);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic(parameters) {
      // prettier-ignore
      return (deriveItemsBatchFromMnemonic<"dotBase">).call(
        this,
        parameters,
      true
      );
    },
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"dotBase">).call(
        this,
        parameters,
       true
      );
    },
  };
}

export { getDotDerivationHandlers };
