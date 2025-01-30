import type { DerivationTypeUnion, SignatureSchemeUnion } from "@/libs/types/index.js";
import {
  type DerivedItem,
  type DeriveItemFromMnemonicParameters,
  type DeriveItemsBatchFromMnemonicParameters,
} from "../types/index.js";
import { appendAddressToDerivationPath } from "@/libs/helpers/index.js";

function deriveItemsBatchFromMnemonic<T extends DerivationTypeUnion>(
  this: {
    deriveItemFromMnemonic: (parameters: DeriveItemFromMnemonicParameters<T>) => DerivedItem<T>;
  },
  parameters: DeriveItemsBatchFromMnemonicParameters<T>,
  scheme?: SignatureSchemeUnion,
) {
  let batch: DerivedItem<T>[] = [];

  for (let i = parameters.indexLookupFrom; i < parameters.indexLookupTo; i++) {
    const derivationPathWithAddressIndex = appendAddressToDerivationPath({
      scheme,
      derivationPath: parameters.derivationPathPrefix,
      addressIndex: i,
    });

    batch.push(
      this.deriveItemFromMnemonic({
        ...parameters,
        derivationPath: derivationPathWithAddressIndex,
      }),
    );
  }

  return batch;
}

export { deriveItemsBatchFromMnemonic };
