import { type Address } from "@/address/types/index.js";
import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
import { type DerivationTypeMap } from "./derivationTypeMap.type.js";
import { type CardanoBaseKeyPair, type CommonKeyPair } from "@/keyDerivation/types/index.js";

type KeyPair<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["adaBase"] ? CardanoBaseKeyPair : CommonKeyPair;

type DerivedCredential<TDerivationType extends DerivationTypeUnion> = Address &
  KeyPair<TDerivationType>;

export { type DerivedCredential };
