import { type DerivedBaseKeyPair } from "../cardano/types/index.js";
import { type DerivationType } from "../enums/index.js";
import { type DerivedKeyPair } from "./derivedKeyPair.type.js";
import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
import { type DerivedItemAddress } from "./derivedItemAddress.type.js";

type DerivedCredential<TDerivationType extends DerivationTypeUnion> = DerivedItemAddress &
  (TDerivationType extends typeof DerivationType.ADA_BASE ? DerivedBaseKeyPair : DerivedKeyPair);

export { type DerivedCredential };
