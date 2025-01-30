import { getTonAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
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
    deriveItemFromMnemonic: (parameters) => {
      const keys = keysDerivationInstance.deriveFromMnemonic(parameters);

      const address = getTonAddress({
        ...addressParameters,
        friendlyFormatArguments,
        publicKey: keys.publicKey,
      });

      return { ...keys, address, derivationPath: parameters.derivationPath };
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
    deriveItemsBatchFromMnemonic(parameters) {
      // prettier-ignore
      return (deriveItemsBatchFromMnemonic<"tonBase">).call(
        this,
        parameters,
       "ed25519"
      );
    },
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<"tonBase">).call(
        this,
        parameters,
        "ed25519"
      );
    },
  };
}

export { getTonDerivationHandlers };
