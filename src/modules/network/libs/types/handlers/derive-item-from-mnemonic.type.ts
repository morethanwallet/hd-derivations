import { type HandlersCommonParameters } from "./handlers-common-parameters.type.js";
import { type DerivedItem } from "../derived-item.type.js";

import type { DerivationTypeUnion, DerivationPath } from "@/libs/types/types.js";

type DeriveItemFromMnemonicParameters<T extends DerivationTypeUnion> = DerivationPath<T> &
  HandlersCommonParameters<T>;

type DeriveItemFromMnemonic<T extends DerivationTypeUnion> = (
  parameters: DeriveItemFromMnemonicParameters<T>,
) => Promise<DerivedItem<T>>;

export { type DeriveItemFromMnemonic, type DeriveItemFromMnemonicParameters };
