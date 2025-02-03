import type { CommonBipDerivationTypeUnion } from "./common-bip-derivation-type-union.type.js";
import type { DerivationPath, DerivationTypeUnion, KeyPair } from "@/libs/types/index.js";
import type { CommonHandlersParameters } from "./common-handlers-parameters.type.js";

type DeriveFromMnemonicParameters<T extends DerivationTypeUnion> = DerivationPath<T> &
  (T extends CommonBipDerivationTypeUnion
    ? { base58RootKey?: string }
    : CommonHandlersParameters<T>);

type DeriveFromMnemonic<T extends DerivationTypeUnion> = (
  parameters: DeriveFromMnemonicParameters<T>,
) => KeyPair<T>;

export { type DeriveFromMnemonic, type DeriveFromMnemonicParameters };
