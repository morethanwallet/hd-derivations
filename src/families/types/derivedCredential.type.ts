import { type Address } from "@/address/types/index.js";
import { type KeyPair } from "@/types/keys/index.js";
import { type DerivationTypeUnion } from "@/types/derivation/index.js";

type DerivedCredential<TDerivationType extends DerivationTypeUnion> = Address &
  KeyPair<TDerivationType>;

export { type DerivedCredential };
