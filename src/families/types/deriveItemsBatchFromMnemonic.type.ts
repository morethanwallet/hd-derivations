import { type DerivationTypeUnion, type DerivedItem } from "@/types/index.js";
import {
  type DeriveItemFromMnemonicParameters,
  type DeriveItemFromMnemonicInnerHandlerParameters,
} from "./deriveItemFromMnemonic.type.js";

type LookupRangeParameters = {
  indexLookupFrom: number;
  indexLookupTo: number;
};

type DeriveItemsBatchFromMnemonicInnerHandlerParameters<
  TDerivationType extends DerivationTypeUnion
> = DeriveItemFromMnemonicInnerHandlerParameters<TDerivationType> & LookupRangeParameters;

type DeriveItemsBatchFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  DeriveItemFromMnemonicParameters<TDerivationType> & LookupRangeParameters;

type DeriveItemsBatchFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemsBatchFromMnemonicParameters<TDerivationType>
) => DerivedItem<TDerivationType>[];

export {
  type DeriveItemsBatchFromMnemonic,
  type DeriveItemsBatchFromMnemonicParameters,
  type DeriveItemsBatchFromMnemonicInnerHandlerParameters,
};
