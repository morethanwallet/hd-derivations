import { type DerivationPath, type DerivationTypeUnion } from "@/libs/types/types.js";
import { type DerivedCredential } from "./derived-credential.type.js";

type DerivedItem<T extends DerivationTypeUnion> = DerivationPath<T> & DerivedCredential<T>;

export { type DerivedItem };
