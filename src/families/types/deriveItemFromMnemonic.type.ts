import { type DerivationTypeUnion, type DerivedItem } from "@/types/index.js";
import { type CommonInconsistentDerivationParameters } from "./commonInconsistentDerivationParameters.type.js";
import { type CommonInconsistentParametersDerivationType } from "./commonInconsistentParametersDerivationType.type.js";

type DeriveItemFromMnemonicInnerHandlerParameters<TDerivationType extends DerivationTypeUnion> = {
  derivationPath: string;
} & CommonInconsistentDerivationParameters<TDerivationType>;

type DeriveItemFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  DeriveItemFromMnemonicInnerHandlerParameters<TDerivationType> &
    CommonInconsistentDerivationParameters<TDerivationType> &
    CommonInconsistentParametersDerivationType<TDerivationType>;

type DeriveItemFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemFromMnemonicParameters<TDerivationType>
) => DerivedItem<TDerivationType>;

export {
  type DeriveItemFromMnemonic,
  type DeriveItemFromMnemonicParameters,
  type DeriveItemFromMnemonicInnerHandlerParameters,
};
