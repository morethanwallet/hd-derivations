import { type CommonBipDerivationTypeUnion } from "./bip44DerivationTypeUnion.type.js";
import type { DerivationTypeUnion, KeyPair } from "@/libs/types/index.js";

type DeriveFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> = {
  derivationPath: string;
} & (TDerivationType extends CommonBipDerivationTypeUnion
  ? { base58RootKey?: string }
  : Record<string, unknown>);

type DeriveFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveFromMnemonicParameters<TDerivationType>
) => KeyPair<TDerivationType>;

export { type DeriveFromMnemonic, type DeriveFromMnemonicParameters };
