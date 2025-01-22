import { type PrivateKey, type KeyPair } from "@/types/keys/index.js";
import { type DerivationTypeUnion } from "@/types/derivation/index.js";

type ImportByPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: PrivateKey<TDerivationType>
) => KeyPair<TDerivationType>;

export { type ImportByPrivateKey };
