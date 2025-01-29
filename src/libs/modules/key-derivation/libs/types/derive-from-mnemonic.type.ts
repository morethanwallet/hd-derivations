import type { CommonBipDerivationTypeUnion } from "./common-bip-derivation-type-union.type.js";
import type { DerivationPath, DerivationTypeUnion, KeyPair } from "@/libs/types/index.js";
import type { CommonHandlersParameters } from "./common-handlers-parameters.type.js";

type DeriveFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> = DerivationPath &
  (TDerivationType extends CommonBipDerivationTypeUnion
    ? { base58RootKey?: string }
    : CommonHandlersParameters<TDerivationType>);

type DeriveFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveFromMnemonicParameters<TDerivationType>,
) => KeyPair<TDerivationType>;

export { type DeriveFromMnemonic, type DeriveFromMnemonicParameters };
