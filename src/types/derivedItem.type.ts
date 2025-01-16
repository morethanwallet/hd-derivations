import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
import { type DerivedCredential } from "./derivedCredential.type.js";

type DerivedItem<TDerivationType extends DerivationTypeUnion> = {
  derivationPath: string;
} & DerivedCredential<TDerivationType>;

export { type DerivedItem };
