import type { CommonBipDerivationTypeUnion } from "./bip44DerivationTypeUnion.type.js";
import type {
  DerivationPath,
  DerivationTypeUnion,
  KeyPair,
} from "@/libs/types/index.js";
import type { CommonHandlersParameters } from "./commonHandlersParameters.type.js";

type DeriveFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> =
  DerivationPath &
    (TDerivationType extends CommonBipDerivationTypeUnion
      ? { base58RootKey?: string }
      : CommonHandlersParameters<TDerivationType>);

type DeriveFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveFromMnemonicParameters<TDerivationType>,
) => KeyPair<TDerivationType>;

export { type DeriveFromMnemonic, type DeriveFromMnemonicParameters };
