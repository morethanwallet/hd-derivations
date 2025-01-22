import { getAvaxAddress } from "@/address/networks/index.js";
import { avaxConfig } from "@/config/index.js";
import {
  checkIfPrivateKeyBelongsToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/families/helpers/index.js";
import {
  type GetItemHandlerParameters,
  type GetItemHandlerReturnType,
} from "@/families/types/index.js";
import { type AvaxDerivationTypeUnion } from "@/types/derivation/index.js";

function getAvaxItemHandlers({
  derivationType,
  networkPurpose,
  keysDerivationInstance,
}: GetItemHandlerParameters<AvaxDerivationTypeUnion>): GetItemHandlerReturnType<AvaxDerivationTypeUnion> {
  const bech32Prefix = keysDerivationInstance.keysConfig.bech32;

  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
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

export { getAvaxItemHandlers };
