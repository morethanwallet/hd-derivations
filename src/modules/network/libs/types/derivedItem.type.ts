import {
  type DerivationPath,
  type DerivationTypeUnion,
} from "@/libs/types/index.js";
import { type DerivedCredential } from "./derivedCredential.type.js";

type DerivedItem<TDerivationType extends DerivationTypeUnion> = DerivationPath &
  DerivedCredential<TDerivationType>;

export { type DerivedItem };
