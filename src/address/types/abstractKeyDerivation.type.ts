import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
import { type DeriveFromMnemonic } from "./deriveFromMnemonic.type.js";
import { type ImportByPrivateKey } from "./importByPrivateKey.type.js";

type AbstractKeyDerivation<TDerivationType extends DerivationTypeUnion> = {
  deriveFromMnemonic: DeriveFromMnemonic<TDerivationType>;
  importByPrivateKey: ImportByPrivateKey<TDerivationType>;
};

export { type AbstractKeyDerivation };
