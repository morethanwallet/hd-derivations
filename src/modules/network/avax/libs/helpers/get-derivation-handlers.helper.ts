import { getAvaxAddress } from "@/libs/modules/address/address.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
} from "@/modules/network/libs/helpers/index.js";
import {
  type GetDerivationHandlersParameters,
  type GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";
import { type DerivationTypeUnionByNetwork } from "@/libs/types/types.js";

function getAvaxDerivationHandlers({
  prefix,
  keysDerivationInstance,
}: GetDerivationHandlersParameters[DerivationTypeUnionByNetwork["avax"]]): GetDerivationHandlersReturnType<
  DerivationTypeUnionByNetwork["avax"]
> {
  const bech32Prefix = keysDerivationInstance.prefixConfig.bech32;

  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      validateDerivationPath(derivationPath);
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
    deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress,
    }) {
      return (deriveItemsBatchFromMnemonic<DerivationTypeUnionByNetwork["avax"]>).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<DerivationTypeUnionByNetwork["avax"]>,
  };
}

export { getAvaxDerivationHandlers };
