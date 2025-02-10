import { type DerivationTypeUnion, type DerivationPath } from "@/libs/types/index.js";
import { type HandlersCommonParameters } from "./handlers-common-parameters.type.js";
import { type DerivedItem } from "../derived-item.type.js";

type DeriveItemFromMnemonicParameters<T extends DerivationTypeUnion> = DerivationPath<T> &
  HandlersCommonParameters<T>;

type DeriveItemFromMnemonic<T extends DerivationTypeUnion> = (
  parameters: DeriveItemFromMnemonicParameters<T>,
) => DerivedItem<T>;

export { type DeriveItemFromMnemonic, type DeriveItemFromMnemonicParameters };
