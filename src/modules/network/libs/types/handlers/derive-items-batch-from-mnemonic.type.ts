import { type DerivationTypeUnion } from "@/libs/types/index.js";
import { type DerivedItem } from "../derived-item.type.js";
import { type LookupHandlersCommonParameters } from "./lookup-handlers-common-parameters.type.js";
import type { DerivationPathPrefix } from "./derivation-path-prefix.type.js";

type DeriveItemsBatchFromMnemonicParameters<T extends DerivationTypeUnion> =
  LookupHandlersCommonParameters<T> & DerivationPathPrefix<T>;

type DeriveItemsBatchFromMnemonic<T extends DerivationTypeUnion> = (
  parameters: DeriveItemsBatchFromMnemonicParameters<T>,
) => DerivedItem<T>[];

export { type DeriveItemsBatchFromMnemonic, type DeriveItemsBatchFromMnemonicParameters };
