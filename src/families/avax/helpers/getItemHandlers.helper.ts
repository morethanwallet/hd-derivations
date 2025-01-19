import { getAvaxAddress } from "@/address/networks/index.js";
import { deriveItemsBatchFromMnemonic } from "@/families/helpers/index.js";
import {
  type GetItemHandlerParameters,
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
} from "@/families/types/index.js";
import { type AvaxDerivationTypeUnion, type DerivedItem } from "@/types/index.js";

function getAvaxItemHandlers({
  derivationType,
  isMainnet,
  keysDerivationInstance,
}: GetItemHandlerParameters<AvaxDerivationTypeUnion>) {
  return {
    deriveItemFromMnemonic: ({
      derivationPath,
    }: DeriveItemFromMnemonicInnerHandlerParameters<AvaxDerivationTypeUnion>): DerivedItem<AvaxDerivationTypeUnion> => {
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getAvaxAddress(keys.publicKey, derivationType, isMainnet);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPrivateKey: ({
      privateKey,
    }: GetCredentialFromPrivateKeyInnerHandlerParameters<AvaxDerivationTypeUnion>) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });
      const address = getAvaxAddress(keys.publicKey, derivationType, isMainnet);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<AvaxDerivationTypeUnion>,
  };
}

export { getAvaxItemHandlers };
