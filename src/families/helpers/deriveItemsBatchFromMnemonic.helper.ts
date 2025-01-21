import { type DerivationTypeUnion } from "@/types/derivation/index.js";
import {
  type DerivedItem,
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type DeriveItemsBatchFromMnemonicInnerHandlerParameters,
} from "../types/index.js";
import { appendAddressToDerivationPath } from "@/helpers/index.js";

function deriveItemsBatchFromMnemonic<T extends DerivationTypeUnion>(
  this: {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<T>
    ) => DerivedItem<T>;
  },
  parameters: DeriveItemsBatchFromMnemonicInnerHandlerParameters<T>
) {
  let batch: DerivedItem<T>[] = [];

  for (let i = parameters.indexLookupFrom; i < parameters.indexLookupTo; i++) {
    const derivationPathWithAddressIndex = appendAddressToDerivationPath(
      parameters.derivationPathPrefix,
      i
    );

    batch.push(
      this.deriveItemFromMnemonic({ ...parameters, derivationPath: derivationPathWithAddressIndex })
    );
  }

  return batch;
}

export { deriveItemsBatchFromMnemonic };
