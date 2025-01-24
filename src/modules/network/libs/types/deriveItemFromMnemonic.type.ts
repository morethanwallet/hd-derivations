import { type DerivationTypeParameter } from "./derivationTypeParameter.type.js";
import { type DerivationTypeUnion, type DerivationPath } from "@/libs/types/index.js";
import { type CommonHandlersParameters } from "./commonHandlersParameters.type.js";
import { type DerivedItem } from "./derivedItem.type.js";

type HandlersCommonParameters<TDerivationType extends DerivationTypeUnion> = DerivationPath &
  CommonHandlersParameters<TDerivationType>;

type DeriveItemFromMnemonicInnerHandlerParameters<TDerivationType extends DerivationTypeUnion> =
  HandlersCommonParameters<TDerivationType>;

type DeriveItemFromMnemonicInnerHandler<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemFromMnemonicInnerHandlerParameters<TDerivationType>
) => DerivedItem<TDerivationType>;

type DeriveItemFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  DerivationTypeParameter<TDerivationType> & HandlersCommonParameters<TDerivationType>;

type DeriveItemFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemFromMnemonicParameters<TDerivationType>
) => DerivedItem<TDerivationType>;

export {
  type DeriveItemFromMnemonic,
  type DeriveItemFromMnemonicParameters,
  type DeriveItemFromMnemonicInnerHandler,
  type DeriveItemFromMnemonicInnerHandlerParameters,
};
