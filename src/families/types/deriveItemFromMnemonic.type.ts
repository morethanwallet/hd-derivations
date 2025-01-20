import {
  type BtcDerivationTypeUnion,
  type DerivationTypeUnion,
  type DerivedItem,
} from "@/types/index.js";
import { type CommonInconsistentOuterHandlerDerivationParameters } from "./commonInconsistentOuterHandlerDerivationParameters.type.js";
import { type DerivationPath } from "@/types/derivation/index.js";

type HandlersCommonParameters<TDerivationType extends DerivationTypeUnion> = DerivationPath &
  (TDerivationType extends BtcDerivationTypeUnion
    ? { base58RootKey?: string }
    : Record<string, unknown>);

type DeriveItemFromMnemonicInnerHandlerParameters<TDerivationType extends DerivationTypeUnion> =
  HandlersCommonParameters<TDerivationType>;

type DeriveItemFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  CommonInconsistentOuterHandlerDerivationParameters<TDerivationType> &
    HandlersCommonParameters<TDerivationType>;

type DeriveItemFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemFromMnemonicParameters<TDerivationType>
) => DerivedItem<TDerivationType>;

export {
  type DeriveItemFromMnemonic,
  type DeriveItemFromMnemonicParameters,
  type DeriveItemFromMnemonicInnerHandlerParameters,
};
