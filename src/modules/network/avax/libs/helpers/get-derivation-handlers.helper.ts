import { getAvaxAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
} from "@/modules/network/libs/helpers/index.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";
import { type AvaxDerivationTypeUnion } from "@/libs/types/index.js";

function getAvaxDerivationHandlers({
  prefix,
  keysDerivationInstance,
}: GetDerivationHandlersParameters<AvaxDerivationTypeUnion>): GetDerivationHandlersReturnType<AvaxDerivationTypeUnion> {
  const bech32Prefix = keysDerivationInstance.prefixConfig.bech32;

  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      const keys = keysDerivationInstance.deriveFromMnemonic({
        derivationPath,
      });
      const address = getAvaxAddress({
        prefix,
        publicKey: keys.publicKey,
        hrp: bech32Prefix,
      });

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey });
      const address = getAvaxAddress({ prefix, publicKey: keys.publicKey, hrp: bech32Prefix });

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic: deriveItemsBatchFromMnemonic<AvaxDerivationTypeUnion>,
    doesPKBelongToMnemonic(parameters) {
      // prettier-ignore
      return (doesPKBelongToMnemonic<AvaxDerivationTypeUnion>).call(
        this,
        parameters,
      );
    },
  };
}

export { getAvaxDerivationHandlers };
