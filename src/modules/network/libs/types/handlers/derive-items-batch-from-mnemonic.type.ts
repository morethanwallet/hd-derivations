import { GetDerivationTypeUnion, type DerivationTypeUnion } from "@/libs/types/types.js";
import { type DerivedItem } from "../derived-item.type.js";
import { type LookupHandlersCommonParameters } from "./lookup-handlers-common-parameters.type.js";
import type { DerivationPathPrefix } from "./derivation-path-prefix.type.js";

type DeriveItemsBatchFromMnemonicParameters<T extends DerivationTypeUnion> =
  LookupHandlersCommonParameters<T> &
    DerivationPathPrefix<T> & {
      shouldUseHardenedAddress?: boolean;
      addressPosition?: number;
    } & (T extends GetDerivationTypeUnion<"dotBase"> ? { isSecondIteration?: boolean } : {});

type DeriveItemsBatchFromMnemonic<T extends DerivationTypeUnion> = (
  parameters: DeriveItemsBatchFromMnemonicParameters<T>,
) => DerivedItem<T>[];

export { type DeriveItemsBatchFromMnemonic, type DeriveItemsBatchFromMnemonicParameters };
