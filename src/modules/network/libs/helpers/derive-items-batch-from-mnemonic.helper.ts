import type { DerivationTypeMap, DerivationTypeUnion } from "@/libs/types/index.js";
import {
  type DerivedItem,
  type DeriveItemFromMnemonicParameters,
  type DeriveItemsBatchFromMnemonicParameters,
} from "../types/index.js";
import { appendAddressToDerivationPath } from "@/libs/helpers/index.js";

type SupportedDerivationTypes = Exclude<DerivationTypeUnion, DerivationTypeMap["adaBase"]>;

function deriveItemsBatchFromMnemonic<T extends SupportedDerivationTypes>(
  this: {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicParameters<SupportedDerivationTypes>,
    ) => DerivedItem<T>;
  },
  parameters: DeriveItemsBatchFromMnemonicParameters<T>,
  shouldHarden?: boolean,
) {
  let batch: DerivedItem<T>[] = [];

  for (let i = parameters.indexLookupFrom; i < parameters.indexLookupTo; i++) {
    const derivationPathWithAddressIndex = appendAddressToDerivationPath({
      shouldHarden,
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
