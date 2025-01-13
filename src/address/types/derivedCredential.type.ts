import { type BaseDerivationKeyPair } from "../cardano/types/index.js";
import { type DerivationType } from "../enums/index.js";
import { type DerivationKeyPair } from "./derivationKeyPair.type.js";
import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
import { type DerivedItemAddress } from "./derivedItemAddress.type.js";

type DerivedCredential<TDerivationType extends DerivationTypeUnion> = DerivedItemAddress &
  (TDerivationType extends typeof DerivationType.ADA_BASE
    ? BaseDerivationKeyPair
    : DerivationKeyPair);

export { type DerivedCredential };
