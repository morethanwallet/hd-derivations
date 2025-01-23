import { type Address } from "@/modules/address/index.js";
import type { KeyPair, DerivationTypeUnion } from "@/libs/types/index.js";

type DerivedCredential<TDerivationType extends DerivationTypeUnion> = Address &
  KeyPair<TDerivationType>;

export { type DerivedCredential };
