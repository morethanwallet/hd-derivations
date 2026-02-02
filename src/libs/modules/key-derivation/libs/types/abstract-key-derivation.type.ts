import { type ImportByPrivateKey } from "./import-by-private-key.type.js";
import { type DeriveFromMnemonic } from "./derive-from-mnemonic.type.js";

import { type DerivationTypeUnion } from "@/libs/types/types.js";

type AbstractKeyDerivation<T extends DerivationTypeUnion> = {
  deriveFromMnemonic: DeriveFromMnemonic<T>;
  importByPrivateKey: ImportByPrivateKey<T>;
};

export { type AbstractKeyDerivation };
