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

function getFormattedFriendlyFormatArguments({
  friendlyFormatArguments,
  networkPurpose,
}: Pick<GetDerivationHandlersParameters["tonBase"], "friendlyFormatArguments" | "networkPurpose">) {
  return {
    ...friendlyFormatArguments,
    testOnly: networkPurpose === "testnet",
  };
}

function getTonBaseDerivationHandlers({
  keysDerivationInstance,
  networkPurpose,
  ...addressParameters
}: GetDerivationHandlersParameters["tonBase"]): GetDerivationHandlersReturnType<"tonBase"> {
  const friendlyFormatArguments = getFormattedFriendlyFormatArguments({
    friendlyFormatArguments: addressParameters.friendlyFormatArguments,
    networkPurpose,
  });

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

function getTonExodusDerivationHandlers({
  keysDerivationInstance,
  networkPurpose,
  ...addressParameters
}: GetDerivationHandlersParameters["tonExodus"]): GetDerivationHandlersReturnType<"tonExodus"> {
  const friendlyFormatArguments = getFormattedFriendlyFormatArguments({
    friendlyFormatArguments: addressParameters.friendlyFormatArguments,
    networkPurpose,
  });

  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });

      const address = getTonAddress({
        ...addressParameters,
        friendlyFormatArguments,
        publicKey: keys.publicKey,
      });

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });

      const address = getTonAddress({
        ...addressParameters,
        friendlyFormatArguments,
        publicKey: keys.publicKey,
      });

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({ derivationPathPrefix, indexLookupFrom, indexLookupTo }) {
      return (deriveItemsBatchFromMnemonic<"tonExodus">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
      );
    },
    doesPKBelongToMnemonic(parameters) {
      return (doesPKBelongToMnemonic<"tonExodus">).call(this, parameters);
    },
  };
}

export { getTonBaseDerivationHandlers, getTonExodusDerivationHandlers };
