import type {
  GetCredentialFromPK,
  DeriveItemsBatchFromMnemonic,
  DeriveItemFromMnemonic,
  DoesPKBelongToMnemonic,
} from "./handlers/types.js";

import { type DerivationTypeUnion } from "@/libs/types/types.js";

type AbstractNetwork<T extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonic<T>;
  getCredentialFromPK: GetCredentialFromPK<T>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<T>;
  doesPKBelongToMnemonic: DoesPKBelongToMnemonic<T>;
};

export { type AbstractNetwork };
