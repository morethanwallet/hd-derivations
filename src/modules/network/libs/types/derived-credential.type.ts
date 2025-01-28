import { type Address } from "@/libs/modules/address/index.js";
import type { KeyPair, DerivationTypeUnion } from "@/libs/types/index.js";

type DerivedCredential<TDerivationType extends DerivationTypeUnion> = Address &
  KeyPair<TDerivationType>;

export { type DerivedCredential };
