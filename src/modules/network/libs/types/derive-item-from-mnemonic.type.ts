import { type DerivationTypeUnion, type DerivationPath } from "@/libs/types/index.js";
import { type CommonHandlersParameters } from "./common-handlers-parameters.type.js";
import { type DerivedItem } from "./derived-item.type.js";

type DeriveItemFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  DerivationPath & CommonHandlersParameters<TDerivationType>;

type DeriveItemFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveItemFromMnemonicParameters<TDerivationType>,
) => DerivedItem<TDerivationType>;

export { type DeriveItemFromMnemonic, type DeriveItemFromMnemonicParameters };
