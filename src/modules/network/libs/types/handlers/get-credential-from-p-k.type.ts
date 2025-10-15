import type { PrivateKey, DerivationTypeUnion } from "@/libs/types/types.js";
import { type DerivedCredential } from "../derived-credential.type.js";

type GetCredentialFromPKParameters<T extends DerivationTypeUnion> = PrivateKey<T>;

type GetCredentialFromPK<T extends DerivationTypeUnion> = (
  parameters: GetCredentialFromPKParameters<T>,
) => DerivedCredential<T>;

export { type GetCredentialFromPK, type GetCredentialFromPKParameters };
