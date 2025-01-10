import { type DerivationTypeUnion } from "./index.js";
import { type DerivedBaseItem as CardanoDerivedBaseItem } from "../cardano/types/index.js";
import { type DerivationType } from "../enums/index.js";

type DerivedItem<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends typeof DerivationType.ADA_BASE
    ? CardanoDerivedBaseItem
    : { derivationPath: string } & Credential;

export { type DerivedItem };
