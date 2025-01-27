import { type DerivationTypeUnion } from "@/libs/types/index.js";
import { type DerivationTypeParameter } from "./derivation-type-parameter.type.js";
import { type DerivedItem } from "./derived-item.type.js";
import { type LookupHandlersCommonParameters } from "./lookup-handlers-common-parameters.type.js";

type DeriveItemsBatchFromMnemonicInnerHandlerParameters<
  TDerivationType extends DerivationTypeUnion,
> = LookupHandlersCommonParameters<TDerivationType>;

type DeriveItemsBatchFromMnemonicInnerHandler<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemsBatchFromMnemonicInnerHandlerParameters<TDerivationType>,
) => DerivedItem<TDerivationType>[];

type DeriveItemsBatchFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  LookupHandlersCommonParameters<TDerivationType> & DerivationTypeParameter<TDerivationType>;

type DeriveItemsBatchFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemsBatchFromMnemonicParameters<TDerivationType>,
) => DerivedItem<TDerivationType>[];

export {
  type DeriveItemsBatchFromMnemonic,
  type DeriveItemsBatchFromMnemonicParameters,
  type DeriveItemsBatchFromMnemonicInnerHandler,
  type DeriveItemsBatchFromMnemonicInnerHandlerParameters,
};
