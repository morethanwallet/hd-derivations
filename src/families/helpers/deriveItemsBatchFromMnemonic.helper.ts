import { type DerivedItem, type DerivationTypeUnion } from "@/types/index.js";
import {
  type DeriveItemFromMnemonicInnerHandlerParameters,
  type DeriveItemsBatchFromMnemonicInnerHandlerParameters,
} from "../types/index.js";
import { appendAddressToDerivationPath } from "@/helpers/index.js";

function deriveItemsBatchFromMnemonic<C extends DerivationTypeUnion>(
  this: {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicInnerHandlerParameters<C>
    ) => DerivedItem<C>;
  },
  { ...parameters }: DeriveItemsBatchFromMnemonicInnerHandlerParameters<C>
) {
  let batch: DerivedItem<C>[] = [];

  for (let i = parameters.indexLookupFrom; i < parameters.indexLookupTo; i++) {
    const derivationPathWithAddressIndex = appendAddressToDerivationPath(
      parameters.derivationPath,
      i
    );

    batch.push(
      this.deriveItemFromMnemonic({ ...parameters, derivationPath: derivationPathWithAddressIndex })
    );
  }

  return batch;
}

export { deriveItemsBatchFromMnemonic };
