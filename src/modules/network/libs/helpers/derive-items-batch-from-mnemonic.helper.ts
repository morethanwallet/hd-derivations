import type { DerivationTypeMap, DerivationTypeUnion } from "@/libs/types/index.js";
import {
  type DerivedItem,
  type DeriveItemFromMnemonicParameters,
  type DeriveItemsBatchFromMnemonicParameters,
} from "../types/index.js";
import { appendAddressToDerivationPath } from "@/libs/helpers/index.js";
import { validateDerivationPath } from "./validate-derivation-path/index.js";

type SupportedDerivationTypes = Exclude<DerivationTypeUnion, DerivationTypeMap["adaBase"]>;

function deriveItemsBatchFromMnemonic<T extends SupportedDerivationTypes>(
  this: {
    deriveItemFromMnemonic: (
      parameters: DeriveItemFromMnemonicParameters<SupportedDerivationTypes>,
    ) => DerivedItem<T>;
  },
  parameters: DeriveItemsBatchFromMnemonicParameters<T>,
  isStrictHardened?: boolean,
) {
  validateDerivationPath(parameters.derivationPathPrefix, isStrictHardened);
  let batch: DerivedItem<T>[] = [];

  for (let i = parameters.indexLookupFrom; i < parameters.indexLookupTo; i++) {
    const derivationPathWithAddressIndex = appendAddressToDerivationPath({
      shouldHarden: isStrictHardened,
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
