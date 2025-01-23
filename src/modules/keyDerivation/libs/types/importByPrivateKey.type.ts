import type { PrivateKey, KeyPair, DerivationTypeUnion } from "@/libs/types/index.js";

type ImportByPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: PrivateKey<TDerivationType>
) => KeyPair<TDerivationType>;

export { type ImportByPrivateKey };
