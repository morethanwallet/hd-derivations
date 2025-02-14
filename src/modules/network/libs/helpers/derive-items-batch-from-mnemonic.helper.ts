import type { DerivationTypeMap, DerivationTypeUnion } from "@/libs/types/index.js";
import type {
  DeriveItemFromMnemonic,
  DerivedItem,
  DeriveItemFromMnemonicParameters,
  DeriveItemsBatchFromMnemonicParameters as OuterDeriveItemsBatchFromMnemonicParameters,
} from "../types/index.js";
import { appendAddressToDerivationPath } from "@/libs/helpers/index.js";
import { validateDerivationPath } from "./validate-derivation-path/index.js";

type SupportedDerivationTypes = Exclude<
  DerivationTypeUnion,
  DerivationTypeMap["adaBase"] | DerivationTypeMap["dotBase"]
>;

type DeriveItemsBatchFromMnemonicParameters<T extends SupportedDerivationTypes> = Omit<
  OuterDeriveItemsBatchFromMnemonicParameters<T>,
  keyof DeriveItemFromMnemonicParameters<SupportedDerivationTypes> | "derivationPathPrefix"
>;

function deriveItemsBatchFromMnemonic<T extends SupportedDerivationTypes>(
  this: { deriveItemFromMnemonic: DeriveItemFromMnemonic<T> },
  parameters: DeriveItemsBatchFromMnemonicParameters<T>,
  deriveItemFromMnemonicParameters: DeriveItemFromMnemonicParameters<T>,
  isStrictHardened?: boolean,
) {
  const { derivationPath } = deriveItemFromMnemonicParameters;
  const { indexLookupFrom, indexLookupTo } = parameters;
  validateDerivationPath(derivationPath, isStrictHardened);
  let batch: DerivedItem<T>[] = [];

  for (let i = indexLookupFrom; i < indexLookupTo; i++) {
    const derivationPathWithAddressIndex = appendAddressToDerivationPath({
      derivationPath,
      shouldHarden: isStrictHardened,
      addressIndex: i,
    });

    batch.push(
      this.deriveItemFromMnemonic({
        ...deriveItemFromMnemonicParameters,
        derivationPath: derivationPathWithAddressIndex,
      }),
    );
  }

  return batch;
}

export { deriveItemsBatchFromMnemonic };
