import type { CommonBipDerivationTypeUnion } from "./common-bip-derivation-type-union.type.js";
import type { DerivationPath, DerivationTypeUnion, KeyPair } from "@/libs/types/index.js";
import type { HandlersCommonParameters } from "./handlers-common-parameters.type.js";

type DeriveFromMnemonicParameters<T extends DerivationTypeUnion> = DerivationPath &
  (T extends CommonBipDerivationTypeUnion
    ? { base58RootKey?: string }
    : HandlersCommonParameters<T>);

type DeriveFromMnemonic<T extends DerivationTypeUnion> = (
  parameters: DeriveFromMnemonicParameters<T>,
) => KeyPair<T>;

export { type DeriveFromMnemonic, type DeriveFromMnemonicParameters };
