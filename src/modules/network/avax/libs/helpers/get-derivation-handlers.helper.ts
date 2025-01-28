import { getAvaxAddress } from "@/libs/modules/address/index.js";
import {
  checkIfPrivateKeyBelongsToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";
import { type AvaxDerivationTypeUnion } from "@/libs/types/index.js";
import { avaxConfig } from "@/modules/network/libs/modules/config/index.js";

function getAvaxDerivationHandlers({
  derivationType,
  networkPurpose,
  keysDerivationInstance,
}: GetDerivationHandlersParameters<AvaxDerivationTypeUnion>): GetDerivationHandlersReturnType<AvaxDerivationTypeUnion> {
  const bech32Prefix = keysDerivationInstance.prefixConfig.bech32;

  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({
        derivationPath,
      });
      const address = getAvaxAddress(keys.publicKey, derivationType, bech32Prefix);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPrivateKey: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });
      const address = getAvaxAddress(keys.publicKey, derivationType, bech32Prefix);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<AvaxDerivationTypeUnion>,
    checkIfPrivateKeyBelongsToMnemonic(parameters) {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<AvaxDerivationTypeUnion>).call(
        this,
        parameters,
        avaxConfig[networkPurpose].avax.derivationPathPrefix,
      );
    },
  };
}

export { getAvaxDerivationHandlers };
