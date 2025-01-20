import { getAvaxAddress } from "@/address/networks/index.js";
import { avaxConfig } from "@/config/index.js";
import {
  checkIfPrivateKeyBelongsToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/families/helpers/index.js";
import {
  type GetItemHandlerParameters,
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type GetCredentialFromPrivateKeyInnerHandlerParameters,
  type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters,
} from "@/families/types/index.js";
import { type AvaxDerivationTypeUnion, type DerivedItem } from "@/types/index.js";

function getAvaxItemHandlers({
  derivationType,
  networkPurpose,
  keysDerivationInstance,
}: GetItemHandlerParameters<AvaxDerivationTypeUnion>) {
  const bech32Prefix = keysDerivationInstance.keysConfig.bech32;

  return {
    deriveItemFromMnemonic: ({
      derivationPath,
    }: DeriveItemFromMnemonicInnerHandlerParameters<AvaxDerivationTypeUnion>): DerivedItem<AvaxDerivationTypeUnion> => {
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getAvaxAddress(keys.publicKey, derivationType, bech32Prefix);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPrivateKey: ({
      privateKey,
    }: GetCredentialFromPrivateKeyInnerHandlerParameters<AvaxDerivationTypeUnion>) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });
      const address = getAvaxAddress(keys.publicKey, derivationType, bech32Prefix);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<AvaxDerivationTypeUnion>,
    checkIfPrivateKeyBelongsToMnemonic(
      parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<AvaxDerivationTypeUnion>
    ): boolean {
      // prettier-ignore
      return (checkIfPrivateKeyBelongsToMnemonic<AvaxDerivationTypeUnion>).call(
        this,
        avaxConfig[networkPurpose].avax.derivationPathPrefix,
        parameters
      );
    },
  };
}

export { getAvaxItemHandlers };
