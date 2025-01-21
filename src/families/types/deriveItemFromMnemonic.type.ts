import { type CommonInconsistentOuterHandlerDerivationParameters } from "./commonInconsistentOuterHandlerDerivationParameters.type.js";
import { type DerivationTypeUnion, type DerivationPath } from "@/types/derivation/index.js";
import { type DerivationHandlersCommonParameters } from "./derivationHandlersCommonParameters.type.js";
import { type DerivedItem } from "./derivedItem.type.js";

type HandlersCommonParameters<TDerivationType extends DerivationTypeUnion> = DerivationPath &
  DerivationHandlersCommonParameters<TDerivationType>;

type DeriveItemFromMnemonicInnerHandlerParameters<TDerivationType extends DerivationTypeUnion> =
  HandlersCommonParameters<TDerivationType>;

type DeriveItemFromMnemonicInnerHandler<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemFromMnemonicInnerHandlerParameters<TDerivationType>
) => DerivedItem<TDerivationType>;

type DeriveItemFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  CommonInconsistentOuterHandlerDerivationParameters<TDerivationType> &
    HandlersCommonParameters<TDerivationType>;

type DeriveItemFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemFromMnemonicParameters<TDerivationType>
) => DerivedItem<TDerivationType>;

export {
  type DeriveItemFromMnemonic,
  type DeriveItemFromMnemonicParameters,
  type DeriveItemFromMnemonicInnerHandler,
  type DeriveItemFromMnemonicInnerHandlerParameters,
};
