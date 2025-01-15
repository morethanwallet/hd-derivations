import { type CommonDerivationTypeUnion } from "./commonDerivationTypeUnion.type.js";
import { type KeyPair } from "./keyPair.type.js";
import { type DerivationTypeUnion } from "@/types/index.js";

type DeriveFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> = {
  derivationPath: string;
} & (TDerivationType extends CommonDerivationTypeUnion
  ? { base58RootKey?: string }
  : Record<string, unknown>);

type DeriveFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveFromMnemonicParameters<TDerivationType>
) => KeyPair<TDerivationType>;

export { type DeriveFromMnemonic, type DeriveFromMnemonicParameters };
