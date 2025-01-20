import { type DerivationTypeUnion, type DerivedItem } from "@/types/index.js";
import {
  type DeriveItemFromMnemonicParameters,
  type DeriveItemFromMnemonicInnerHandlerParameters,
} from "./deriveItemFromMnemonic.type.js";
import { type DerivationPath } from "@/types/derivation/index.js";

type LookupRangeParameters = {
  indexLookupFrom: number;
  indexLookupTo: number;
};

type HandlersCommonParameters = {
  derivationPathPrefix: DerivationPath["derivationPath"];
} & LookupRangeParameters;

type DeriveItemsBatchFromMnemonicInnerHandlerParameters<
  TDerivationType extends DerivationTypeUnion
> = Omit<DeriveItemFromMnemonicInnerHandlerParameters<TDerivationType>, "derivationPath"> &
  HandlersCommonParameters;

type DeriveItemsBatchFromMnemonicInnerHandler<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemsBatchFromMnemonicInnerHandlerParameters<TDerivationType>
) => DerivedItem<TDerivationType>[];

type DeriveItemsBatchFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> = Omit<
  DeriveItemFromMnemonicParameters<TDerivationType>,
  "derivationPath"
> &
  HandlersCommonParameters;

type DeriveItemsBatchFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemsBatchFromMnemonicParameters<TDerivationType>
) => DerivedItem<TDerivationType>[];

export {
  type DeriveItemsBatchFromMnemonic,
  type DeriveItemsBatchFromMnemonicParameters,
  type DeriveItemsBatchFromMnemonicInnerHandler,
  type DeriveItemsBatchFromMnemonicInnerHandlerParameters,
};
