import { getSuiAddress } from "@/libs/modules/address/index.js";
import {
  deriveItemsBatchFromMnemonic,
  doesPKExistInBatch,
} from "@/modules/network/libs/helpers/index.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";

function getSuiDerivationHandlers({
  keysDerivationInstance,
  algorithm,
}: GetDerivationHandlersParameters<"suiBase">): GetDerivationHandlersReturnType<"suiBase"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({
        derivationPath,
        algorithm,
      });
      const address = getSuiAddress(keys.publicKey, algorithm);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({
        privateKey,
        algorithm,
      });
      const address = getSuiAddress(keys.publicKey, algorithm);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic(parameters) {
      return (deriveItemsBatchFromMnemonic<"suiBase">).call(
        this,
        parameters,
        algorithm === "ed25519",
      );
    },
    doesPKBelongToMnemonic(parameters) {
      const itemsBatch = this.deriveItemsBatchFromMnemonic(parameters);
      const { privateKey } = parameters;

      return doesPKExistInBatch(itemsBatch, privateKey);
    },
  };
}

export { getSuiDerivationHandlers };
