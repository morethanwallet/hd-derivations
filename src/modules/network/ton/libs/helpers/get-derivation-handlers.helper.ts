import { getTonAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/index.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getTonDerivationHandlers({
  keysDerivationInstance,
  networkPurpose,
  ...addressParameters
}: GetDerivationHandlersParameters<"tonBase">): GetDerivationHandlersReturnType<"tonBase"> {
  const isTestOnly = networkPurpose === "testnet";

  const friendlyFormatArguments = {
    ...addressParameters.friendlyFormatArguments,
    testOnly: isTestOnly,
  };

  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      validateDerivationPath(derivationPath, true);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });

      const address = getTonAddress({
        ...addressParameters,
        friendlyFormatArguments,
        publicKey: keys.publicKey,
      });

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);

      const address = getTonAddress({
        ...addressParameters,
        friendlyFormatArguments,
        publicKey: keys.publicKey,
      });

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({ derivationPathPrefix, indexLookupFrom, indexLookupTo }) {
      return (deriveItemsBatchFromMnemonic<"tonBase">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        true,
      );
    },
    doesPKBelongToMnemonic(parameters) {
      return (doesPKBelongToMnemonic<"tonBase">).call(this, parameters, true);
    },
  };
}

export { getTonDerivationHandlers };
