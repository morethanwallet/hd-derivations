import { getAvaxAddress } from "@/address/networks/index.js";
import {
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
} from "@/families/types/index.js";
import { type CommonBipKeyDerivation } from "@/keyDerivation/index.js";
import { type AvaxDerivationTypeUnion, type DerivedItem } from "@/types/index.js";

function getAvaxItemHandlers(
  keysDerivationInstance: InstanceType<typeof CommonBipKeyDerivation>,
  derivationType: AvaxDerivationTypeUnion
) {
  return {
    deriveItemFromMnemonic: ({
      derivationPath,
      isMainnet,
    }: DeriveItemFromMnemonicInnerHandlerParameters<AvaxDerivationTypeUnion>): DerivedItem<AvaxDerivationTypeUnion> => {
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getAvaxAddress(keys.publicKey, derivationType, isMainnet);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPrivateKey: ({
      isMainnet,
      privateKey,
    }: GetCredentialFromPrivateKeyInnerHandlerParameters<AvaxDerivationTypeUnion>) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });
      const address = getAvaxAddress(keys.publicKey, derivationType, isMainnet);

      return { ...keys, address };
    },
  };
}

export { getAvaxItemHandlers };
