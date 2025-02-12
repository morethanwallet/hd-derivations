import { getDotAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
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
    deriveItemFromMnemonic: ({ derivationPath }) => {
      validateDerivationPath(derivationPath, true);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getDotAddress(keys.publicKey, ss58Format);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getDotAddress(keys.publicKey, ss58Format);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic(parameters) {
      return (deriveItemsBatchFromMnemonic<"dotBase">).call(this, parameters, true);
    },
    doesPKBelongToMnemonic(parameters) {
      return (doesPKBelongToMnemonic<"dotBase">).call(this, parameters, true);
    },
  };
}

export { getDotDerivationHandlers };
