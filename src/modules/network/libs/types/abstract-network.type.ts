import { type DerivationTypeUnion } from "@/libs/types/types.js";
import type {
  GetCredentialFromPK,
  DeriveItemsBatchFromMnemonic,
  DeriveItemFromMnemonic,
  DoesPKBelongToMnemonic,
} from "./handlers/index.js";

type AbstractNetwork<T extends DerivationTypeUnion> = {
  deriveItemFromMnemonic: DeriveItemFromMnemonic<T>;
  getCredentialFromPK: GetCredentialFromPK<T>;
  deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<T>;
  doesPKBelongToMnemonic: DoesPKBelongToMnemonic<T>;
};

export { type AbstractNetwork };
