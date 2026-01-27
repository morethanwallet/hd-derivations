import { getDotAddress } from "@/libs/modules/address/address.js";
import {
  doesPKBelongToMnemonic,
  deriveItemsBatchFromMnemonic,
  validateDerivationPath as commonValidateDerivationPath,
  doesPKExistInBatch,
} from "@/modules/network/libs/helpers/index.js";
import type {
  DerivedItem,
  GetDerivationHandlersParameters,
  GetDerivationHandlersReturnType,
} from "@/modules/network/libs/types/index.js";
import { validateDerivationPath } from "./validate-derivation-path.helper.js";
import { appendAddressToDerivationPath } from "./append-address-to-derivation-path.helper.js";

function getStandardHdDerivationHandlers({
  keysDerivationInstance,
  ss58Format,
}: GetDerivationHandlersParameters["dotStandardHd"]): GetDerivationHandlersReturnType<"dotStandardHd"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      commonValidateDerivationPath(derivationPath, true);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getDotAddress(keys.publicKey, ss58Format);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getDotAddress(keys.publicKey, ss58Format);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({ derivationPathPrefix, indexLookupFrom, indexLookupTo }) {
      return (deriveItemsBatchFromMnemonic<"dotStandardHd">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        true,
      );
    },
    doesPKBelongToMnemonic(parameters) {
      return (doesPKBelongToMnemonic<"dotStandardHd">).call(this, parameters, true);
    },
  };
}

function getBaseDerivationHandlers({
  keysDerivationInstance,
  scheme,
  ss58Format,
}: GetDerivationHandlersParameters["dotBase"]): GetDerivationHandlersReturnType<"dotBase"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      validateDerivationPath(derivationPath);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath, scheme });
      const address = getDotAddress(keys.publicKey, ss58Format);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: ({ privateKey }) => {
      const keys = keysDerivationInstance.importByPrivateKey({ privateKey, scheme });
      const address = getDotAddress(keys.publicKey, ss58Format);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({
      derivationPathPrefix,
      indexLookupFrom,
      indexLookupTo,
      shouldUseHardenedAddress = true,
      isSecondIteration,
    }) {
      const shouldHarden =
        scheme === "ed25519" || scheme === "secp256k1" || shouldUseHardenedAddress;

      validateDerivationPath(derivationPathPrefix);
      let batch: DerivedItem<"dotBase">[] = [];

      if (!derivationPathPrefix && !isSecondIteration) {
        batch.push(this.deriveItemFromMnemonic({ derivationPath: derivationPathPrefix }));
      }

      for (let i = indexLookupFrom; i < indexLookupTo; i++) {
        const derivationPathWithAddressIndex = appendAddressToDerivationPath({
          shouldHarden,
          derivationPath: derivationPathPrefix,
          addressIndex: i,
        });

        batch.push(this.deriveItemFromMnemonic({ derivationPath: derivationPathWithAddressIndex }));
      }

      return batch;
    },
    doesPKBelongToMnemonic(parameters) {
      const itemsBatch = this.deriveItemsBatchFromMnemonic(parameters);

      itemsBatch.push(
        ...this.deriveItemsBatchFromMnemonic({ ...parameters, shouldUseHardenedAddress: true }),
      );

      return doesPKExistInBatch(itemsBatch, parameters.privateKey);
    },
  };
}

function getLedgerDerivationHandlers({
  keysDerivationInstance,
  ss58Format,
}: GetDerivationHandlersParameters["dotLedger"]): GetDerivationHandlersReturnType<"dotLedger"> {
  return {
    deriveItemFromMnemonic: ({ derivationPath }) => {
      commonValidateDerivationPath(derivationPath, true);
      const keys = keysDerivationInstance.deriveFromMnemonic({ derivationPath });
      const address = getDotAddress(keys.publicKey, ss58Format);

      return { ...keys, address, derivationPath };
    },
    getCredentialFromPK: (parameters) => {
      const keys = keysDerivationInstance.importByPrivateKey(parameters);
      const address = getDotAddress(keys.publicKey, ss58Format);

      return { ...keys, address };
    },
    deriveItemsBatchFromMnemonic({ derivationPathPrefix, indexLookupFrom, indexLookupTo }) {
      return (deriveItemsBatchFromMnemonic<"dotLedger">).call(
        this,
        { indexLookupFrom, indexLookupTo },
        { derivationPath: derivationPathPrefix },
        true,
      );
    },
    doesPKBelongToMnemonic(parameters) {
      return (doesPKBelongToMnemonic<"dotLedger">).call(this, parameters, true);
    },
  };
}

export { getStandardHdDerivationHandlers, getBaseDerivationHandlers, getLedgerDerivationHandlers };
