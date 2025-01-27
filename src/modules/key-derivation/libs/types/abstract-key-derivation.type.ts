import { type ImportByPrivateKey } from "./import-by-private-key.type.js";
import { type DerivationTypeUnion } from "@/libs/types/index.js";
import { type DeriveFromMnemonic } from "./derive-from-mnemonic.type.js";

type AbstractKeyDerivation<TDerivationType extends DerivationTypeUnion> = {
  deriveFromMnemonic: DeriveFromMnemonic<TDerivationType>;
  importByPrivateKey: ImportByPrivateKey<TDerivationType>;
};

export { type AbstractKeyDerivation };
