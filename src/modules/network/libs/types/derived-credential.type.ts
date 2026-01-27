import { type Address } from "@/libs/modules/address/address.js";
import type { KeyPair, DerivationTypeUnion } from "@/libs/types/types.js";

type DerivedCredential<TDerivationType extends DerivationTypeUnion> = Address &
  KeyPair<TDerivationType>;

export { type DerivedCredential };
