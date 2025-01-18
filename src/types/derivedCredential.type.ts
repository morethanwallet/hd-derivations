import { type Address } from "@/address/types/index.js";
import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
import { type KeyPair } from "@/keyDerivation/types/index.js";

type DerivedCredential<TDerivationType extends DerivationTypeUnion> = Address &
  KeyPair<TDerivationType>;

export { type DerivedCredential };
