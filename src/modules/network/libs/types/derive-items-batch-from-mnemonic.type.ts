import { type DerivationTypeUnion } from "@/libs/types/index.js";
import { type DerivedItem } from "./derived-item.type.js";
import { type LookupHandlersCommonParameters } from "./lookup-handlers-common-parameters.type.js";

type DeriveItemsBatchFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  LookupHandlersCommonParameters<TDerivationType>;

type DeriveItemsBatchFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemsBatchFromMnemonicParameters<TDerivationType>,
) => DerivedItem<TDerivationType>[];

export { type DeriveItemsBatchFromMnemonic, type DeriveItemsBatchFromMnemonicParameters };
