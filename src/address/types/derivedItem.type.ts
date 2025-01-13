import { type DerivedBaseItem as CardanoDerivedBaseItem } from "../cardano/types/index.js";
import { type DerivationType } from "../enums/index.js";
import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
import { type DerivedCredential } from "./derivedCredential.type.js";

type DerivedItem<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends typeof DerivationType.ADA_BASE
    ? CardanoDerivedBaseItem
    : { derivationPath: string } & DerivedCredential<TDerivationType>;

export { type DerivedItem };
