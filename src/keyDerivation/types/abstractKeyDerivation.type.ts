import { type ImportByPrivateKey } from "./importByPrivateKey.type.js";
import { type DerivationTypeUnion } from "@/types/derivation/index.js";
import { type DeriveFromMnemonic } from "./deriveFromMnemonic.type.js";

type AbstractKeyDerivation<TDerivationType extends DerivationTypeUnion> = {
  deriveFromMnemonic: DeriveFromMnemonic<TDerivationType>;
  importByPrivateKey: ImportByPrivateKey<TDerivationType>;
};

export { type AbstractKeyDerivation };
