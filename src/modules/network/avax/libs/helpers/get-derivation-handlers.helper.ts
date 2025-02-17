import { getAvaxAddress } from "@/libs/modules/address/index.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath,
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
      return (deriveItemsBatchFromMnemonic<AvaxDerivationTypeUnion>).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        shouldUseHardenedAddress,
      );
    },
    doesPKBelongToMnemonic: doesPKBelongToMnemonic<AvaxDerivationTypeUnion>,
  };
}

export { getAvaxDerivationHandlers };
