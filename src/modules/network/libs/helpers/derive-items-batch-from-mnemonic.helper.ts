import type { GetDerivationTypeUnion, DerivationTypeUnion } from "@/libs/types/types.js";
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
  GetDerivationTypeUnion<"adaBase" | "dotBase">
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
  addressPosition?: number,
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
      addressPosition,
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
