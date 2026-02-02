import { type DerivedCredential } from "./derived-credential.type.js";

import { type DerivationPath, type DerivationTypeUnion } from "@/libs/types/types.js";

type DerivedItem<T extends DerivationTypeUnion> = DerivationPath<T> & DerivedCredential<T>;

export { type DerivedItem };
